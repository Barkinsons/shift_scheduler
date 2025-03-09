import { Shifts } from "@/models/Shift";
import ShiftsModifier from "./_components/ShiftsModifier";

export default async function ModifyShiftView({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  if (!id) return null;

  const res1 = await fetch(`http://localhost:3000/api/shifts?shiftId=${id}`, {
    method: "GET",
  });
  if (!res1.ok) return null;

  const shift: Shifts = (await res1.json()).data;

  return <ShiftsModifier shift={shift} />;
}
