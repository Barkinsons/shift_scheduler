import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();

  const id = request.nextUrl.searchParams.get("id");

  try {
    const pet = await User.findById(id);
    return Response.json({ success: true, data: pet }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false }, { status: 404 });
  }
}
