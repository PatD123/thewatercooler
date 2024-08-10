import mongoose, { Schema, model } from "mongoose";

export interface UserDocument {
  _id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  isValid: boolean;
  verifStr: string;
  favMovie: string;
  favMovieSrc: string;
  favTVShow: string;
  favTVShowSrc: string;
  currTVShow: string;
  cineImgSrc: string;
  username: string;
  bio: string;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    username: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      required: true,
    },
    verifStr: {
      type: String,
      required: true,
    },
    favMovie: {
      type: String,
      required: true,
    },
    favMovieSrc: {
      type: String,
      required: false,
    },
    favTVShow: {
      type: String,
      required: true,
    },
    favTVShowSrc: {
      type: String,
      required: false,
    },
    currTVShow: {
      type: String,
      required: false,
    },
    cineImgSrc: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);
export default User;
