import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DonationList from "@/components/admin/donation-list"

export default function DonationsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Manage Donations</h1>
      <Card>
        <CardHeader>
          <CardTitle>Donations</CardTitle>
          <CardDescription>Track and manage parish donations</CardDescription>
        </CardHeader>
        <CardContent>
          <DonationList />
        </CardContent>
      </Card>
    </div>
  )
}

