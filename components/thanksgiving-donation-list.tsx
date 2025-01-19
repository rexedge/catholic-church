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
    thanksgiving: "Family Blessing",
    amount: 50,
    completed: true,
  },
  {
    id: 2,
    date: "2023-08-20",
    time: "03:00 PM",
    thanksgiving: "Friend's Birthday Gift",
    amount: 75,
    completed: true,
  },
  {
    id: 3,
    date: "2023-09-10",
    time: "01:30 PM",
    thanksgiving: "Charity Donation",
    amount: 100,
    completed: false,
  },
  {
    id: 4,
    date: "2023-10-05",
    time: "06:00 PM",
    thanksgiving: "Anniversary Celebration",
    amount: 200,
    completed: true,
  },
  {
    id: 5,
    date: "2023-11-25",
    time: "12:00 PM",
    thanksgiving: "Thanksgiving Dinner",
    amount: 150,
    completed: false,
  },
];

export default function ThanksgivingDonationList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Thanksgiving Donation History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Thanksgiving</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Completed</TableHead>
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
                <TableCell>{thanksgiving.thanksgiving}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                    {thanksgiving.amount.toFixed(2)}
                  </div>
                </TableCell>
                <TableCell>
                  {thanksgiving.completed ? (
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
