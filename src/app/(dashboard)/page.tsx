import Link from "next/link";

export default async function DashboardPage() {
  return (
    <div className="flex flex-col">
      <div className="flex  p-4 gap-4">
        <MyLink href="/schedule" name="Schedule"></MyLink>
        <MyLink href="" name="filler"></MyLink>
        <MyLink href="" name="filler"></MyLink>
      </div>
    </div>
  );
}

const MyLink = ({ name, href }: { name: string; href: string }) => {
  return (
    <Link
      className="bg-stone-200 w-50 flex-wrap h-50 grid content-center text-center rounded-lg hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700"
      href={href}
    >
      {name}
    </Link>
  );
};
