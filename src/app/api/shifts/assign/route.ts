import dbConnect from "@/lib/dbConnect";
import Shift, { Shifts } from "@/models/Shift";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  await dbConnect();

  try {
    const searchParams = request.nextUrl.searchParams;
    const shiftId = searchParams.get("shiftid");
    const userId = searchParams.get("userid");

    if (!shiftId || !userId) {
      return Response.json(
        { success: false, message: "shiftId or userId is missing" },
        { status: 400 },
      );
    }

    const shift: Shifts | null = await Shift.findById(shiftId);
    if (!shift) {
      return Response.json(
        { success: false, message: "shift does not exist" },
        { status: 404 },
      );
    }

    shift.assignedEmployees = Array.from(
      new Set(shift.assignedEmployees).add(userId),
    );
    const newShift = await shift.save();
    if (!newShift) {
      return Response.json(
        { success: false, message: "failed to update shift" },
        { status: 400 },
      );
    }

    return Response.json({ success: true, data: newShift }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: "unknown error occurred" },
      { status: 400 },
    );
  }
}
