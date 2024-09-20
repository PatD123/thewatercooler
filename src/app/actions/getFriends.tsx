"use server";

import User from "@/models/User";

export const getPossibleUsers = async (name: string) => {
  const users = await User.find({
    $or: [{ username: name.trim() }, { name: name.trim() }],
  });
  for (let i = 0; i < users.length; i++)
    users[i] = JSON.parse(JSON.stringify(users[i]));
  return users;
};

export const getShowingUser = async (showingUser: string) => {
  const user = await User.findOne({ email: showingUser });
  return JSON.parse(JSON.stringify(user));
};

export const getFriendCarousel = async (id: string) => {
  const user = await User.findOne({ _id: id });
  return JSON.parse(JSON.stringify(user));
};

export const followUser = async (fromID: string, toID: string) => {
  await User.findByIdAndUpdate(fromID, { $addToSet: { following: toID } });
  await User.findByIdAndUpdate(toID, {
    $addToSet: { pending: fromID, followers: fromID },
  });
};

export const followBack = async (fromID: string, toID: string) => {
  await User.findByIdAndUpdate(fromID, {
    $addToSet: { following: toID },
    $pull: { pending: toID },
  });
  await User.findByIdAndUpdate(toID, {
    $addToSet: { followers: fromID },
  });
};

export const getPendingFollowers = async (email: string) => {
  const user = await User.findOne({ email: email });
  return JSON.parse(JSON.stringify(user["pending"]));
};

export const getNameByID = async (id: string) => {
  const user = await User.findOne({ _id: id });
  return user["name"];
};
