import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

// Define type for an intention
interface Intention {
  id: number
  name: string
  intention: string
  date: string
  status: string // Define the possible statuses
}

// Define props for IntentionList component
interface IntentionListProps {
  intentions: Intention[]
  onUpdateStatus: (id: number, status: string) => void
}

export default function IntentionList({ intentions, onUpdateStatus }: IntentionListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Intention</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {intentions.map((intention) => (
          <TableRow key={intention.id}>
            <TableCell>{intention.name}</TableCell>
            <TableCell>{intention.intention}</TableCell>
            <TableCell>{intention.date}</TableCell>
            <TableCell>{intention.status}</TableCell>
            <TableCell>
              {intention.status === "Pending" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => onUpdateStatus(intention.id, "Approved")}
                  >
                    Approve
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => onUpdateStatus(intention.id, "Rejected")}>
                    Reject
                  </Button>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
