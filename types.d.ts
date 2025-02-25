type StatusI = "Pending" | "Approved" | "Rejected";
interface IntentionsI {
  id: number;
  name: string;
  intention: string;
  date: string;
  status: StatusI;
}