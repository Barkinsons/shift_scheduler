import Options from "../_components/OptionsPage";
import Link from "../_components/OptionsLink";
import { auth } from "@/lib/auth";

export default async function AdminDashboard() {
  const session = await auth();

  if (session?.user?.role !== "Manager") return null;

  return (
    <Options>
      <Link href="/admin/shifts" name="View or Modify Shifts" />
    </Options>
  );
}
