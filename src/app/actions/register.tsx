"use server";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_K ?? "";
const AWS_PASSWORD = process.env.AWS_PASSWORD ?? "";
const BUCKET_NAME = process.env.BUCKET_NAME;
const BUCKET_REGION = process.env.BUCKET_REGION;

const s3 = new S3Client({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_PASSWORD,
  },
  region: BUCKET_REGION,
});
const { EMAIL_FROM, EMAIL_PASS } = process.env;

const getNewFilename = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export const handleSubmit = async (prevState: any, formData: FormData) => {
  const file: File = formData.get("file-upload") as File;
  const newFilename = getNewFilename() + file.name;

  const r = await register({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    bio: formData.get("bio"),
    avatar: "https://d1xfvzhogq09o0.cloudfront.net/" + newFilename,
  });

  if (r?.error) {
    return {
      message: r.error,
    };
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: newFilename,
    Body: Buffer.from(await file.arrayBuffer()),
    ContentType: file.type,
  };
  const cmd = new PutObjectCommand(params);
  // await s3.send(cmd);

  return {
    message: "good",
  };
};

export const register = async (values: any) => {
  const { username, email, password, name, bio, avatar } = values;

  const randString = () => {
    const len = 10;
    let randStr = "";
    for (let i = 0; i < len; i++) {
      const ch = Math.floor(Math.random() * 10 + 1);
      randStr += ch;
    }
    return randStr;
  };

  const sendEmail = async (emailTo: String, verifStr: String) => {
    // Create a transporter using SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      // DELETE THESE
      auth: {
        user: EMAIL_FROM,
        pass: EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Email data
    const mailOptions = {
      from: EMAIL_FROM,
      to: email,
      subject: "Node.js Email Tutorial",
      html: `Press <a href=https://thewatercooler.vercel.app/verify/${verifStr}> here </a>
             to verify your email!`,
    };

    console.log("Sending Email...");

    // Send the email
    await new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      });
    });
    console.log("Email sent!");
  };

  function daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  let date = new Date();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  try {
    await connectDB();
    const userFound = await User.findOne({ email });
    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const uniqueStr = randString();
    const user = new User({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
      avatar: avatar,
      isValid: false,
      verifStr: uniqueStr,
      favMovie: "",
      favTVShow: "",
      currTVShow: "",
      favMovieSrc: "",
      favTVShowSrc: "",
      cineImgSrc: "",
      bio: bio,
      activity: Array<boolean>(daysInMonth(month, year)).fill(false),
    });
    const savedUser = await user.save();

    sendEmail(email, uniqueStr);
  } catch (e) {
    console.log(e);
  }
};
