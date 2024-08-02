"use server";

import { connectDB } from "@/app/lib/mongodb";
import User from "@/models/User";
import { FormEvent } from "react";
import { getServerSession } from "next-auth";

export const fetchProfile = async (email: string) => {
  const user = await User.findOne({ email });
  return [user.name, user.favMovie, user.favTVShow, user.currTVShow];
};

export const editProfile = async (userEmail: string, formData: FormData) => {
  const user = await User.findOne({ email: userEmail });
  if (user) {
    user.name = formData.get("name");
    user.favMovie = formData.get("favMovie");
    user.favTVShow = formData.get("favTVShow");
    user.currTVShow = formData.get("currTVShow");
    await user.save();
  }
};
