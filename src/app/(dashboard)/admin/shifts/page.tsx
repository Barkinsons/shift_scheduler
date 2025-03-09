import { auth } from "@/lib/auth";
import { Shifts } from "@/models/Shift";
import ShiftsTable from "./_components/ShiftsTable";

export default async function AdminShiftViewPage() {
  const session = await auth();

  if (session?.user?.role !== "Manager") return null;

  const response = await fetch("http://localhost:3000/api/shifts", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const shifts: Shifts[] = (await response.json()).data;
  console.log(shifts[0]);

  return (
    <div className="flex justify-center pt-20">
      <ShiftsTable shifts={shifts} />
    </div>
  );
}
