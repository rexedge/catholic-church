import type React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { UserAccountNav } from "@/components/dashboard/user-account-nav";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Parish App</h1>
          </div>
          <UserAccountNav user={session.user} />
        </div>
      </header>
      <div className="container mx-auto grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex lg:w-[240px]">
          <DashboardNav user={session.user} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
