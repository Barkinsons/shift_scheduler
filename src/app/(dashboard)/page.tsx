import Link from "./_components/OptionsLink";
import Options from "./_components/OptionsPage";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <Options>
      <Link href="/schedule" name="Schedule" />
      <Link href="" name="filler" />
      <Link href="" name="filler" />
      {session?.user?.role === "Manager" && <Link href="/admin" name="Admin" />}
    </Options>
  );
}
