import type { Metadata } from "next"
import { Calendar, DollarSign, Heart } from "lucide-react"

import AdminQuickLinkCard from "@/components/admin/admin-quick-link-card"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Parish admin dashboard for the Church Mass Management App",
}

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Parish Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AdminQuickLinkCard
          title="Manage Events"
          description="Add or edit church events"
          icon={<Calendar className="h-6 w-6" />}
          href="/admin/events"
        />
        <AdminQuickLinkCard
          title="Manage Intentions"
          description="Review and approve intentions"
          icon={<Heart className="h-6 w-6" />}
          href="/admin/intentions"
        />
        <AdminQuickLinkCard
          title="Manage Donations"
          description="Track and manage donations"
          icon={<DollarSign className="h-6 w-6" />}
          href="/admin/donations"
        />
      </div>
    </div>
  )
}

