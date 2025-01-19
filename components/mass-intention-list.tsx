import { CalendarIcon, ClockIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// This would typically come from an API or database
const intentions = [
  {
    id: 1,
    date: "2023-07-15",
    time: "09:00 AM",
    intention: "For the repose of the soul of John Doe",
  },
  {
    id: 2,
    date: "2023-07-16",
    time: "11:00 AM",
    intention: "For the health of Jane Smith",
  },
  {
    id: 3,
    date: "2023-07-17",
    time: "07:00 PM",
    intention: "In thanksgiving for blessings received",
  },
];

export default function MassIntentionsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Mass Intentions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Intention</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {intentions.map((intention) => (
              <TableRow key={intention.id}>
                <TableCell className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  {intention.date}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <ClockIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    {intention.time}
                  </div>
                </TableCell>
                <TableCell>{intention.intention}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
