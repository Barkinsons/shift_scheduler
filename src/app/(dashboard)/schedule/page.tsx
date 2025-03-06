import { auth } from "@/lib/auth";
import Schedule from "./_components/Schedule";

export default async function SchedulePage() {
  const session = await auth();

  const response = await fetch(
    `http://localhost:3000/api/shifts?id=${session?.user?.id}`,
  );
  const shifts = (await response.json()).data;

  return <Schedule shifts={shifts} />;
}
