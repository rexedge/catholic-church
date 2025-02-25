import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { UsersTable } from "@/components/admin/users-table";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function UsersPage(props: {
  searchParams: Promise<{ page?: string; search?: string; role?: string }>;
}) {
  const session = await auth();
  const searchParams = await props.searchParams;

  if (!session || session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";
  const role = searchParams.role as
    | "PARISHIONER"
    | "PRIEST"
    | "ADMIN"
    | undefined;

  const users = await prisma.user.findMany({
    where: {
      OR: search
        ? [
            { firstName: { contains: search, mode: "insensitive" } },
            { lastName: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ]
        : undefined,
      role,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      role: true,
      createdAt: true,
      parish: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    skip: (page - 1) * 10,
    take: 10,
    orderBy: { createdAt: "desc" },
  });

  const totalUsers = await prisma.user.count({
    where: {
      OR: search
        ? [
            { firstName: { contains: search, mode: "insensitive" } },
            { lastName: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ]
        : undefined,
      role,
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader heading="Users" description="Manage user accounts">
        <Button asChild>
          <Link href="/admin/users/create">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Link>
        </Button>
      </DashboardHeader>
      <UsersTable
        users={users}
        pageCount={Math.ceil(totalUsers / 10)}
        currentPage={page}
      />
    </DashboardShell>
  );
}
