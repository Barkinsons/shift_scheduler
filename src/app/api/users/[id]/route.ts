import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  const { id } = params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return Response.json({ success: false }, { status: 404 });
    }

    return Response.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}
