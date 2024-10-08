"use server";

import User from "@/models/User";
import { revalidatePath } from "next/cache";
import { connectDB } from "../lib/mongodb";

export const fetchProfile = async (email: string) => {
  await connectDB();

  const user = await User.findOne({ email });
  return [
    user.name,
    user.favMovie,
    user.favTVShow,
    user.currTVShow,
    user.cineImgSrc,
    user.username,
    user.bio,
    user.favMovieSrc,
    user.favTVShowSrc,
    user.currTVShowBackdropSrc,
    user.followers,
    user.following,
    user.favMovies,
    user.favTVShows,
    user.recommended,
    user._id,
    user.activity,
    user.tags,
    user.avatar,
  ];
};

export const editFavMovie = async (
  email: string,
  favMovie: string,
  favMovieSrc: string
) => {
  const user = await User.findOne({ email });
  if (user) {
    user.favMovie = favMovie;
    user.favMovieSrc = favMovieSrc;
    await user.save();
  }
};

export const editFavTVShow = async (
  email: string,
  favTVShow: string,
  favTVShowSrc: string
) => {
  const user = await User.findOne({ email });
  if (user) {
    user.favTVShow = favTVShow;
    user.favTVShowSrc = favTVShowSrc;
    await user.save();
  }
};

export const editCurrTVShow = async (
  email: string,
  currTVShow: string,
  cineImgSrc: string,
  currTVShowBackdropSrc: string
) => {
  const user = await User.findOne({ email });
  if (user) {
    user.currTVShow = currTVShow;
    user.cineImgSrc = cineImgSrc;
    user.currTVShowBackdropSrc = currTVShowBackdropSrc;
    await user.save();
  }
};

export const editUsername = async (email: string, username: string) => {
  const user = await User.findOne({ email });
  if (user) {
    user.username = username;
    await user.save();
  }
};

export const editBio = async (email: string, bio: string) => {
  const user = await User.findOne({ email });
  if (user) {
    user.bio = bio;
    await user.save();
  }
};

export const getUser = async (userEmail: string) => {
  const user = await User.findOne({ email: userEmail });
  return JSON.parse(JSON.stringify(user));
};

export const addFavMovies = async (userID: string, movieSrc: string) => {
  await User.findByIdAndUpdate(userID, { $addToSet: { favMovies: movieSrc } });
};

export const addFavTVShows = async (userID: string, movieSrc: string) => {
  await User.findByIdAndUpdate(userID, { $addToSet: { favTVShows: movieSrc } });
};

export const editActivity = async (userID: string, activity: boolean[]) => {
  const user = await User.findOne({ _id: userID });
  user.activity = activity;
  await user.save();
};

export const addTagToUser = async (userID: string, tag: string) => {
  await User.findByIdAndUpdate(userID, { $addToSet: { tags: tag } });
};
