import dbConnect from "@/lib/dbConnect";
import Shift from "@/models/Shift";
import { NextRequest } from "next/server";

import { getShiftById, getShifts, getShiftsWithEmployee } from "@/lib/shifts";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const shiftId = searchParams.get("shiftId");

    if (shiftId) {
      const shift = await getShiftById(shiftId);
      if (!shift) throw new Error("failed to get shift by id");

      return Response.json({ success: true, data: shift }, { status: 200 });
    }

    if (id) {
      const userShifts = await getShiftsWithEmployee(id);
      if (!userShifts) throw new Error("failed to get shifts with employee");

      return Response.json(
        { success: true, data: userShifts },
        { status: 200 },
      );
    }

    const shifts = await getShifts();
    if (!shifts) throw new Error("failed to get all shifts");

    return Response.json({ success: true, data: shifts }, { status: 200 });
  } catch (error) {
    console.error("Error in shifts GET: ", error);
    return Response.json({ success: false }, { status: 400 });
  }
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const shift = await request.json();
    const newShift = await Shift.create(shift);
    if (!newShift) throw new Error("failed to create shift");

    return Response.json({ success: true, data: newShift }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, newShift } = await request.json();
    const curShift = await getShiftById(id);
    if (!curShift) throw new Error("failed to get shift");

    if (newShift.date) curShift.date = newShift.date;
    if (newShift.startTime) curShift.startTime = newShift.startTime;
    if (newShift.endTime) curShift.endTime = newShift.endTime;
    if (newShift.assignedEmployees)
      curShift.assignedEmployees = newShift.assignedEmployees;
    if (newShift.location) curShift.date = newShift.location;

    const savedShift = curShift.save();
    return Response.json({ success: true, data: savedShift }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 400 });
  }
}
