"use server";

import User from "@/models/User";
import { redirect } from "next/navigation";
import { connectDB } from "@/app/lib/mongodb";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  await connectDB();
  const user = await User.findOne({ verifStr: slug });
  if (user) {
    user.isValid = true;
    await user.save();
    redirect("/login");
  } else {
    const myBlob = new Blob();
    const myOptions = {
      status: 401,
      statusText: "Invalid verification string.",
    };
    const myResponse = new Response(myBlob, myOptions);
    return myResponse;
  }
}
