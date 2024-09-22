"use server";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
const { EMAIL_FROM, EMAIL_PASS } = process.env;

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

  const sendEmail = (emailTo: String, verifStr: String) => {
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
      html: `Press <a href=http://localhost:3000/verify/${verifStr}> here </a>
             to verify your email!`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
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
    console.log(name);

    sendEmail(email, uniqueStr);
  } catch (e) {
    console.log(e);
  }
};
