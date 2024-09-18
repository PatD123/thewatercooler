"use server";

import User from "@/models/User";

export const recommend = async (toID: string, cine: string) => {
  await User.findByIdAndUpdate(toID, { $addToSet: { recommended: cine } });
};

export const unrecommend = async (toID: string, cine: string) => {
  await User.findByIdAndUpdate(toID, { $pull: { recommended: cine } });
};
