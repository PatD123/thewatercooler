import User from "@/models/User";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  console.log(slug);
  const user = await User.findOne({ verifStr: slug });
  if (user) {
    user.isValid = true;
    await user.save();
  } else {
    // Fill in here.
  }
}
