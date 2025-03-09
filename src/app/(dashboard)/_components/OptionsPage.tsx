import { ReactNode } from "react";

export default function DashboardPage({ children }: { children: ReactNode }) {
  return <div className="flex p-4 gap-4">{children}</div>;
}
