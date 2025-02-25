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
import { Calendar, Church, FileText, Gift, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function PriestDashboardPage() {
  const session = await auth();

  if (
    !session ||
    (session.user.role !== "PRIEST" && session.user.role !== "ADMIN")
  ) {
    redirect("/unauthorized");
  }

  // Fetch priest dashboard stats
  const priestId = session.user.id;

  const [
    massesCount,
    upcomingMassesCount,
    pendingIntentionsCount,
    pendingThanksgivingsCount,
  ] = await Promise.all([
    prisma.mass.count({ where: { priestId } }),
    prisma.mass.count({
      where: {
        priestId,
        date: { gte: new Date() },
      },
    }),
    prisma.intention.count({
      where: {
        mass: { priestId },
        status: "PENDING",
      },
    }),
    prisma.thanksgiving.count({
      where: {
        mass: { priestId },
        status: "PENDING",
      },
    }),
  ]);

  // Get upcoming masses
  const upcomingMasses = await prisma.mass.findMany({
    where: {
      priestId,
      date: { gte: new Date() },
    },
    include: {
      parish: true,
      _count: {
        select: {
          intentions: true,
          thanksgivings: true,
        },
      },
    },
    orderBy: { date: "asc" },
    take: 5,
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Priest Dashboard"
        description="Manage your masses, intentions, and thanksgivings"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Masses</CardTitle>
            <Church className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{massesCount}</div>
            <p className="text-xs text-muted-foreground">
              {upcomingMassesCount} upcoming
            </p>
            <Button asChild variant="outline" size="sm" className="mt-4">
              <Link href="/priest/masses">
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
            <div className="text-2xl font-bold">{pendingIntentionsCount}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting your approval
            </p>
            <Button asChild variant="outline" size="sm" className="mt-4">
              <Link href="/priest/intentions">
                Review Intentions
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Thanksgivings
            </CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pendingThanksgivingsCount}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting your approval
            </p>
            <Button asChild variant="outline" size="sm" className="mt-4">
              <Link href="/priest/thanksgivings">
                Review Thanksgivings
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Schedule</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingMassesCount}</div>
            <p className="text-xs text-muted-foreground">Upcoming masses</p>
            <Button asChild variant="outline" size="sm" className="mt-4">
              <Link href="/priest/schedule">
                View Schedule
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Masses</TabsTrigger>
            <TabsTrigger value="intentions">Pending Intentions</TabsTrigger>
            <TabsTrigger value="thanksgivings">
              Pending Thanksgivings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Masses</CardTitle>
                <CardDescription>
                  Your scheduled masses for the coming days
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingMasses.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingMasses.map((mass) => (
                      <div
                        key={mass.id}
                        className="flex items-center gap-4 rounded-md border p-4"
                      >
                        <Church className="h-6 w-6 text-primary" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {mass.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(mass.date).toLocaleDateString()} •{" "}
                            {new Date(mass.time).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            • {mass.parish.name}
                          </p>
                          <div className="flex gap-2 text-xs text-muted-foreground">
                            <span>{mass._count.intentions} intentions</span>
                            <span>•</span>
                            <span>
                              {mass._count.thanksgivings} thanksgivings
                            </span>
                          </div>
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/priest/masses/${mass.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                    <p className="text-sm text-muted-foreground">
                      No upcoming masses scheduled
                    </p>
                  </div>
                )}
                <div className="mt-4 text-right">
                  <Button asChild variant="outline">
                    <Link href="/priest/masses/create">Schedule New Mass</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="intentions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Intentions</CardTitle>
                <CardDescription>
                  Intentions awaiting your approval
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingIntentionsCount > 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      You have {pendingIntentionsCount} pending intentions to
                      review
                    </p>
                    <Button asChild>
                      <Link href="/priest/intentions">Review Intentions</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                    <p className="text-sm text-muted-foreground">
                      No pending intentions to review
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="thanksgivings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Thanksgivings</CardTitle>
                <CardDescription>
                  Thanksgiving offerings awaiting your approval
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingThanksgivingsCount > 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      You have {pendingThanksgivingsCount} pending thanksgivings
                      to review
                    </p>
                    <Button asChild>
                      <Link href="/priest/thanksgivings">
                        Review Thanksgivings
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                    <p className="text-sm text-muted-foreground">
                      No pending thanksgivings to review
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}
