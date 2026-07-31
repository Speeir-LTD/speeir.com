import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminShell } from "./AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return <AdminShell email={session.user.email ?? "Admin"}>{children}</AdminShell>;
}
