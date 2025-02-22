"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock } from "lucide-react"
import DonationModal from "./DonationModal"

// Define TypeScript type for a donation
interface Donation {
  id: number
  amount: number
  purpose: string
  date: string
  status: "completed" | "pending"
  paymentStatus: "paid" | "unpaid" | "processing"
  recurring?: boolean
}

// Mock initial data for donations
const initialDonations: Donation[] = [
  { id: 1, amount: 50, purpose: "General Offering", date: "2023-05-15", status: "completed", paymentStatus: "paid" },
  { id: 2, amount: 100, purpose: "Building Fund", date: "2023-05-22", status: "completed", paymentStatus: "paid" },
  { id: 3, amount: 75, purpose: "Charity", date: "2023-06-20", status: "pending", paymentStatus: "unpaid" },
  {
    id: 4,
    amount: 50,
    purpose: "General Offering",
    date: "2023-06-27",
    status: "pending",
    paymentStatus: "unpaid",
    recurring: true,
  },
]

export default function Donations() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [donations, setDonations] = useState<Donation[]>(initialDonations)

  const addDonation = (newDonation: Omit<Donation, "id" | "status" | "paymentStatus">) => {
    setDonations((prevDonations) => [
      ...prevDonations,
      {
        ...newDonation,
        id: prevDonations.length + 1,
        status: "pending",
        paymentStatus: "unpaid",
      },
    ])
  }

  const processPayment = (donationId: number) => {
    setDonations((prevDonations) =>
      prevDonations.map((donation) =>
        donation.id === donationId ? { ...donation, paymentStatus: "paid", status: "completed" } : donation,
      ),
    )
  }

  const pastDonations = donations.filter((d) => d.status === "completed")
  const upcomingDonations = donations.filter((d) => d.status === "pending")

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Donations & Offerings</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add Donation Pledge</Button>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Unpaid Donations</TabsTrigger>
          <TabsTrigger value="past">Paid Donations</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <DonationTable donations={upcomingDonations} onProcessPayment={processPayment} />
        </TabsContent>
        <TabsContent value="past">
          <DonationTable donations={pastDonations} onProcessPayment={processPayment} />
        </TabsContent>
      </Tabs>

      <DonationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddDonation={addDonation} />
    </div>
  )
}

// Define props for the DonationTable component
interface DonationTableProps {
  donations: Donation[]
  onProcessPayment: (donationId: number) => void
}

function DonationTable({ donations, onProcessPayment }: DonationTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Purpose</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Recurring</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {donations.map((donation) => (
          <TableRow key={donation.id}>
            <TableCell>{donation.date}</TableCell>
            <TableCell>{donation.purpose}</TableCell>
            <TableCell>${donation.amount}</TableCell>
            <TableCell>{donation.recurring ? "Yes" : "No"}</TableCell>
            <TableCell>
              <PaymentStatusBadge status={donation.paymentStatus} />
            </TableCell>
            <TableCell>
              {donation.paymentStatus === "unpaid" && (
                <Button onClick={() => onProcessPayment(donation.id)}>Pay</Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

// Define type for PaymentStatusBadge props
interface PaymentStatusBadgeProps {
  status: "paid" | "unpaid" | "processing"
}

function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  switch (status) {
    case "paid":
      return (
        <Badge variant="default" className="flex items-center gap-1">
          <CheckCircle className="w-4 h-4" />
          Paid
        </Badge>
      )
    case "unpaid":
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="w-4 h-4" />
          Unpaid
        </Badge>
      )
    case "processing":
      return (
        <Badge variant="default" className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          Processing
        </Badge>
      )
    default:
      return null
  }
}
