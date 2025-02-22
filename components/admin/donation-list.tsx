import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const donations = [
  { id: 1, name: "John Doe", amount: 100, purpose: "General Offering", date: "2023-07-09", status: "Completed" },
  { id: 2, name: "Jane Smith", amount: 50, purpose: "Building Fund", date: "2023-07-10", status: "Pending" },
  { id: 3, name: "Mike Johnson", amount: 75, purpose: "Charity", date: "2023-07-11", status: "Completed" },
  { id: 4, name: "Ted Osiobe", amount: 100, purpose: "General Offering", date: "2023-07-12", status: "Completed" },
  { id: 5, name: "Paul Oyeniran", amount: 120, purpose: "Charity", date: "2023-07-13", status: "Completed" },
  { id: 6, name: "John Cena", amount: 500, purpose: "Building Fund", date: "2023-07-13", status: "Completed" },
  { id: 7, name: "Mike Tyson", amount: 750, purpose: "Building Fund", date: "2023-07-15", status: "Completed" },
]

export default function DonationList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Purpose</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {donations.map((donation) => (
          <TableRow key={donation.id}>
            <TableCell>{donation.name}</TableCell>
            <TableCell>${donation.amount}</TableCell>
            <TableCell>{donation.purpose}</TableCell>
            <TableCell>{donation.date}</TableCell>
            <TableCell>
              <Badge
                variant="default"
                className={donation.status === "Completed" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}
              >
                {donation.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
