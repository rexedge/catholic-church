import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  ChevronRight,
  Church,
  FileText,
  Gift,
  Users,
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const { user } = session;

  // Fetch some basic stats based on user role
  const stats = {
    intentions: 0,
    thanksgivings: 0,
    masses: 0,
    parishes: 0,
    users: 0,
  };

  if (user.role === "PARISHIONER") {
    const [intentions, thanksgivings] = await Promise.all([
      prisma.intention.count({ where: { userId: user.id } }),
      prisma.thanksgiving.count({ where: { userId: user.id } }),
    ]);
    stats.intentions = intentions;
    stats.thanksgivings = thanksgivings;
  } else if (user.role === "PRIEST") {
    const [masses, intentions, thanksgivings] = await Promise.all([
      prisma.mass.count({ where: { priestId: user.id } }),
      prisma.intention.count({ where: { mass: { priestId: user.id } } }),
      prisma.thanksgiving.count({ where: { mass: { priestId: user.id } } }),
    ]);
    stats.masses = masses;
    stats.intentions = intentions;
    stats.thanksgivings = thanksgivings;
  } else if (user.role === "ADMIN") {
    const [users, parishes, masses] = await Promise.all([
      prisma.user.count(),
      prisma.parish.count(),
      prisma.mass.count(),
    ]);
    stats.users = users;
    stats.parishes = parishes;
    stats.masses = masses;
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Welcome, ${user.name}`}
        description="Manage your account and view your activity"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Cards for all users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Profile</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.name}</div>
            <p className="text-xs text-muted-foreground">
              {user.email} •{" "}
              {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
            </p>
            <Button asChild variant="outline" size="sm" className="mt-4">
              <Link href="/dashboard/profile">
                View Profile
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Parishioner-specific cards */}
        {user.role === "PARISHIONER" && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Your Intentions
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.intentions}</div>
                <p className="text-xs text-muted-foreground">
                  Mass intentions submitted
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link href="/dashboard/intentions">
                    View Intentions
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Your Thanksgivings
                </CardTitle>
                <Gift className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.thanksgivings}</div>
                <p className="text-xs text-muted-foreground">
                  Thanksgiving offerings made
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link href="/dashboard/thanksgivings">
                    View Thanksgivings
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {/* Priest-specific cards */}
        {(user.role === "PRIEST" || user.role === "ADMIN") && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Masses</CardTitle>
                <Church className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.masses}</div>
                <p className="text-xs text-muted-foreground">
                  {user.role === "PRIEST"
                    ? "Masses you're conducting"
                    : "Total masses scheduled"}
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link
                    href={
                      user.role === "PRIEST"
                        ? "/priest/masses"
                        : "/admin/masses"
                    }
                  >
                    View Masses
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Intentions
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.intentions}</div>
                <p className="text-xs text-muted-foreground">
                  {user.role === "PRIEST"
                    ? "Intentions for your masses"
                    : "Total intentions submitted"}
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link
                    href={
                      user.role === "PRIEST"
                        ? "/priest/intentions"
                        : "/admin/intentions"
                    }
                  >
                    Review Intentions
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {/* Admin-specific cards */}
        {user.role === "ADMIN" && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.users}</div>
                <p className="text-xs text-muted-foreground">
                  Total registered users
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link href="/admin/users">
                    Manage Users
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Parishes</CardTitle>
                <Church className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.parishes}</div>
                <p className="text-xs text-muted-foreground">
                  Parishes in the system
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link href="/admin/parishes">
                    Manage Parishes
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {/* Upcoming events card for all users */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              Your scheduled masses and events for the next 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-md border p-4">
                <CalendarDays className="h-6 w-6 text-primary" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Sunday Mass
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Sunday, 10:00 AM • St. Mary&apos;s Parish
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
              <div className="flex items-center gap-4 rounded-md border p-4">
                <CalendarDays className="h-6 w-6 text-primary" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Parish Meeting
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tuesday, 6:00 PM • Parish Hall
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
