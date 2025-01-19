import { Metadata } from "next";
import { Calendar, DollarSign, Heart, PlayCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NotificationItem from "@/components/notification-item";
import QuickLinkCard from "@/components/quick-link-card";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Parishioner dashboard for the Church Mass Management App",
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Welcome, Parishioner</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <QuickLinkCard
          title="Mass Intentions"
          description="Submit your prayer intentions"
          icon={<Heart className="h-6 w-6" />}
          href="/mass-intentions"
        />
        <QuickLinkCard
          title="Thanksgiving Bookings"
          description="Book a slot for thanksgiving"
          icon={<Calendar className="h-6 w-6" />}
          href="/thanksgiving-bookings"
        />
        <QuickLinkCard
          title="Livestreams"
          description="Watch live mass streams"
          icon={<PlayCircle className="h-6 w-6" />}
          href="/livestreams"
        />
        <QuickLinkCard
          title="Donations"
          description="Make an offering or donation"
          icon={<DollarSign className="h-6 w-6" />}
          href="/donations"
        />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>
              Your latest activity in the parish
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Mass Intention</TableCell>
                  <TableCell>2023-07-01</TableCell>
                  <TableCell>Pending</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Thanksgiving</TableCell>
                  <TableCell>2023-06-28</TableCell>
                  <TableCell>Approved</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Donation</TableCell>
                  <TableCell>2023-06-25</TableCell>
                  <TableCell>Completed</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Recent alerts and reminders</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <NotificationItem
                title="Upcoming Mass Intention"
                description="Your mass intention is scheduled for tomorrow at 9:00 AM."
              />
              <NotificationItem
                title="Thanksgiving Reminder"
                description="Don't forget your thanksgiving slot this Sunday at 11:00 AM."
              />
              <NotificationItem
                title="New Livestream Available"
                description="A new mass livestream has been added for this week."
              />
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
