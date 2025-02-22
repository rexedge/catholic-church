import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

// Define type for an event
interface Event {
  id: number
  name: string
  date: string
  time: string
  type: string
}

// Define props for EventList component
interface EventListProps {
  events: Event[]
  onDeleteEvent: (id: number) => void
}

export default function EventList({ events, onDeleteEvent }: EventListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell>{event.name}</TableCell>
            <TableCell>{event.date}</TableCell>
            <TableCell>{event.time}</TableCell>
            <TableCell>{event.type}</TableCell>
            <TableCell>
              <Button variant="destructive" size="sm" onClick={() => onDeleteEvent(event.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
