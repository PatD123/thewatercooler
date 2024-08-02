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
  favTVShow: string;
  currTVShow?: string;
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
    favTVShow: {
      type: String,
      required: true,
    },
    currTVShow: {
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
