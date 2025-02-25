import { auth } from "@/auth";
import ProtectedFooter from "@/components/protected-footer";
import ProtectedHeader from "@/components/protected-header";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="min-h-screen flex flex-col">
      <ProtectedHeader />
      <main className="flex-grow container mx-auto py-8">{children}</main>
      <ProtectedFooter />
    </div>
  );
}
