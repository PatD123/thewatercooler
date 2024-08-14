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

export const followUser = async (fromID: string, toID: string) => {
  console.log(fromID);
  await User.findByIdAndUpdate(toID, { $addToSet: { followers: fromID } });
};
