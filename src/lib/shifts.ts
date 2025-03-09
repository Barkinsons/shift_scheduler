import dbConnect from "./dbConnect";
import Shift, { Shifts } from "@/models/Shift";

export async function getShifts() {
  await dbConnect();

  const shifts: Shifts[] = await Shift.find({});
  return shifts;
}

export async function getShiftById(id: string) {
  await dbConnect();

  const shift: Shifts | null = await Shift.findById(id);
  return shift;
}

export async function getShiftsWithEmployee(employeeId: string) {
  await dbConnect();

  const shifts: Shifts[] = await Shift.find({ assignedEmployees: employeeId });
  return shifts;
}
