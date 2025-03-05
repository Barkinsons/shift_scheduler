import dbConnect from "@/lib/dbConnect";
import Shift from "@/models/Shift";

export async function GET() {
  await dbConnect();

  try {
    const shifts = await Shift.find({});
    if (!shifts) {
      return Response.json(
        { success: false, message: "shifts not found" },
        { status: 400 },
      );
    }

    return Response.json({ success: true, data: shifts }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: "Unknown error occurred" },
      { status: 400 },
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const shift = await request.json();
    const newShift = await Shift.create(shift);
    if (!newShift) {
      return Response.json({ success: false }, { status: 400 });
    }

    return Response.json({ success: true, data: newShift }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}
