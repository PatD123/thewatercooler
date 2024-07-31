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
    const myBlob = new Blob();
    const myOptions = { status: 200, statusText: "SuperSmashingGreat!" };
    const myResponse = new Response(myBlob, myOptions);
    return myResponse;
  } else {
    // Fill in here.
  }
}
