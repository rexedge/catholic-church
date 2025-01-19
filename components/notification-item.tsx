import { Bell } from "lucide-react";

export default function NotificationItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <li className="flex items-start space-x-4">
      <Bell className="h-5 w-5 mt-0.5 text-muted-foreground" />
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </li>
  );
}
