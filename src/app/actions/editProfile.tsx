"use server";

import User from "@/models/User";

export const fetchProfile = async (email: string) => {
  const user = await User.findOne({ email });
  return [
    user.name,
    user.favMovie,
    user.favTVShow,
    user.currTVShow,
    user.cineImgSrc,
    user.username,
    user.bio,
  ];
};

export const editFavMovie = async (email: string, favMovie: string) => {
  const user = await User.findOne({ email });
  if (user) {
    user.favMovie = favMovie;
    await user.save();
  }
};

export const editFavTVShow = async (email: string, favTVShow: string) => {
  const user = await User.findOne({ email });
  if (user) {
    user.favTVShow = favTVShow;
    await user.save();
  }
};

export const editCurrTVShow = async (
  email: string,
  currTVShow: string,
  cineImgSrc: string
) => {
  const user = await User.findOne({ email });
  if (user) {
    user.currTVShow = currTVShow;
    user.cineImgSrc = cineImgSrc;
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
