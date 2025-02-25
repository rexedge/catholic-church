import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "@/lib/prisma";
import { Users, Church, FileText, BarChart3 } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  // Fetch admin dashboard stats
  const [
    usersCount,
    parishesCount,
    massesCount,
    intentionsCount,
    thanksgivingsCount,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.parish.count(),
    prisma.mass.count(),
    prisma.intention.count(),
    prisma.thanksgiving.count(),
  ]);

  // Get counts by role
  const [priestsCount, parishionersCount] = await Promise.all([
    prisma.user.count({ where: { role: "PRIEST" } }),
    prisma.user.count({ where: { role: "PARISHIONER" } }),
  ]);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Admin Dashboard"
        description="Manage your parish system and monitor activity"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersCount}</div>
            <p className="text-xs text-muted-foreground">
              {priestsCount} priests, {parishionersCount} parishioners
            </p>
            <Button asChild variant="outline" size="sm" className="mt-4">
              <Link href="/admin/users">Manage Users</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Parishes</CardTitle>
            <Church className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{parishesCount}</div>
            <p className="text-xs text-muted-foreground">
              Active parishes in the system
            </p>
            <Button asChild variant="outline" size="sm" className="mt-4">
              <Link href="/admin/parishes">Manage Parishes</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Masses</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{massesCount}</div>
            <p className="text-xs text-muted-foreground">Scheduled masses</p>
            <Button asChild variant="outline" size="sm" className="mt-4">
              <Link href="/admin/masses">View Masses</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Intentions & Thanksgivings
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {intentionsCount + thanksgivingsCount}
            </div>
            <p className="text-xs text-muted-foreground">
              {intentionsCount} intentions, {thanksgivingsCount} thanksgivings
            </p>
            <Button asChild variant="outline" size="sm" className="mt-4">
              <Link href="/admin/intentions">View All</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="parishes">Parishes</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage users, verify priests, and handle user accounts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Button
                    asChild
                    variant="outline"
                    className="h-20 justify-start"
                  >
                    <Link
                      href="/admin/users"
                      className="flex flex-col items-start"
                    >
                      <span className="text-lg font-medium">All Users</span>
                      <span className="text-sm text-muted-foreground">
                        View and manage all users
                      </span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-20 justify-start"
                  >
                    <Link
                      href="/admin/users/priests"
                      className="flex flex-col items-start"
                    >
                      <span className="text-lg font-medium">Priests</span>
                      <span className="text-sm text-muted-foreground">
                        Verify and manage priests
                      </span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-20 justify-start"
                  >
                    <Link
                      href="/admin/users/parishioners"
                      className="flex flex-col items-start"
                    >
                      <span className="text-lg font-medium">Parishioners</span>
                      <span className="text-sm text-muted-foreground">
                        Manage parishioner accounts
                      </span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="parishes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Parish Management</CardTitle>
                <CardDescription>
                  Manage parishes, assign priests, and monitor parish activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Button
                    asChild
                    variant="outline"
                    className="h-20 justify-start"
                  >
                    <Link
                      href="/admin/parishes"
                      className="flex flex-col items-start"
                    >
                      <span className="text-lg font-medium">All Parishes</span>
                      <span className="text-sm text-muted-foreground">
                        View and manage parishes
                      </span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-20 justify-start"
                  >
                    <Link
                      href="/admin/parishes/create"
                      className="flex flex-col items-start"
                    >
                      <span className="text-lg font-medium">Add Parish</span>
                      <span className="text-sm text-muted-foreground">
                        Create a new parish
                      </span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-20 justify-start"
                  >
                    <Link
                      href="/admin/parishes/assignments"
                      className="flex flex-col items-start"
                    >
                      <span className="text-lg font-medium">
                        Priest Assignments
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Manage parish assignments
                      </span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure system settings and manage application preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Button
                    asChild
                    variant="outline"
                    className="h-20 justify-start"
                  >
                    <Link
                      href="/admin/settings"
                      className="flex flex-col items-start"
                    >
                      <span className="text-lg font-medium">
                        General Settings
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Configure application settings
                      </span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-20 justify-start"
                  >
                    <Link
                      href="/admin/settings/email"
                      className="flex flex-col items-start"
                    >
                      <span className="text-lg font-medium">
                        Email Settings
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Configure email templates
                      </span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-20 justify-start"
                  >
                    <Link
                      href="/admin/settings/backup"
                      className="flex flex-col items-start"
                    >
                      <span className="text-lg font-medium">
                        Backup & Restore
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Manage system backups
                      </span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}
