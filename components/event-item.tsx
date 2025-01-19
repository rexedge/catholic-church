import { Clock } from "lucide-react";

export default function EventItem({
  title,
  description,
  date,
  time,
}: {
  title: string;
  description: string;
  date: string;
  time: string;
}) {
  return (
    <li className="flex justify-between items-start">
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="text-right">
        <p className="text-sm">{date}</p>
        <p className="text-sm text-muted-foreground flex items-center justify-end">
          <Clock className="h-3 w-3 mr-1" />
          {time}
        </p>
      </div>
    </li>
  );
}
