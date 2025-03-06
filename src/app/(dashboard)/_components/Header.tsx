import { auth, signIn } from "@/lib/auth";
import Link from "next/link";

const Header = async () => {
  const session = await auth();
  if (!session || !session.user) {
    await signIn();
  }

  return (
    <div className="h-14 flex border-b-2 items-center p-4">
      <Link href="./" className="font-bold text-xl">
        Dashboard
      </Link>
      <div className="grow"></div>
      <div>{session?.user?.name}</div>
    </div>
  );
};

export default Header;
