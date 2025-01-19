import Link from "next/link";
import { Button } from "./ui/button";
import { Bell, User } from "lucide-react";

export default function ProtectedHeader() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          St. Mary's{" "}
          <span className="hidden md:inline-block">Catholic Church</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </Button>
          <Button variant="ghost" size="sm">
            <User className="h-5 w-5 mr-2" />
            Profile
          </Button>
        </nav>
      </div>
    </header>
  );
}
