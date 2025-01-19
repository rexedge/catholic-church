import {
  CalendarIcon,
  ClockIcon,
  DollarSign,
  CheckCircle,
  XCircle,
} from "lucide-react";

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
const thanksgivings = [
  {
    id: 1,
    date: "2023-07-15",
    time: "09:00 AM",
    purpose: "Family Blessing",
    donation: 50,
    present: true,
  },
  {
    id: 2,
    date: "2023-07-16",
    time: "11:00 AM",
    purpose: "Recovery from Illness",
    donation: 0,
    present: false,
  },
  {
    id: 3,
    date: "2023-07-17",
    time: "07:00 PM",
    purpose: "Wedding Anniversary",
    donation: 100,
    present: true,
  },
];

export default function ThanksgivingList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Thanksgiving History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Donation</TableHead>
              <TableHead>Presence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {thanksgivings.map((thanksgiving) => (
              <TableRow key={thanksgiving.id}>
                <TableCell className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  {thanksgiving.date}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <ClockIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    {thanksgiving.time}
                  </div>
                </TableCell>
                <TableCell>{thanksgiving.purpose}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                    {thanksgiving.donation.toFixed(2)}
                  </div>
                </TableCell>
                <TableCell>
                  {thanksgiving.present ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
