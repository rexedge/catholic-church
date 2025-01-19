import { DollarSign, Heart, PlayCircle, Bell } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QuickLinkCard from "@/components/quick-link-card";
import EventItem from "@/components/event-item";

export default function HomePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">
        Welcome to St. Mary's Catholic Church
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        Serving our community in faith, hope, and love
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <QuickLinkCard
          title="Mass Intentions"
          description="Submit your prayer intentions"
          icon={<Heart className="h-6 w-6" />}
          href="/mass-intentions"
        />
        <QuickLinkCard
          title="Thanksgiving Bookings"
          description="Book a slot for thanksgiving"
          icon={<Heart className="h-6 w-6" />}
          href="/thanksgiving"
        />
        <QuickLinkCard
          title="Livestreams"
          description="Watch live Mass streams"
          icon={<PlayCircle className="h-6 w-6" />}
          href="/livestreams"
        />
        <QuickLinkCard
          title="Offerings/Donations"
          description="Make offerings and support our parish and ministries"
          icon={<DollarSign className="h-6 w-6" />}
          href="/donations"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Mass Schedule</CardTitle>
            <CardDescription>
              Join us in the celebration of the Holy Eucharist
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <EventItem
                title="Sunday Mass"
                description="Holy Mass"
                date="Every Sunday"
                time="8:00 AM, 6:00 AM, 12:00 PM"
              />
              <EventItem
                title="Weekday Mass"
                description="Daily Mass"
                date="Monday to Friday"
                time="7:00 AM, 12:6 PM"
              />
              <EventItem
                title="Saturday Vigil Mass"
                description="Anticipatory Sunday Mass"
                date="Every Saturday"
                time="5:00 PM"
              />
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Parish Announcements</CardTitle>
            <CardDescription>Important updates from our parish</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <AnnouncementItem
                title="First Communion Classes"
                description="Preparation classes for First Holy Communion start next month. Register your child now."
              />
              <AnnouncementItem
                title="Parish Novena"
                description="Join us for our annual Novena to Our Lady of Perpetual Help, starting this Wednesday."
              />
              <AnnouncementItem
                title="Volunteer for St. Vincent de Paul Society"
                description="Help us serve the poor in our community. Orientation for new volunteers this Saturday."
              />
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>This Week's Readings</CardTitle>
            <CardDescription>
              Prepare for the upcoming Sunday Mass
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <span className="font-semibold">First Reading:</span> Acts
                2:1-11
              </li>
              <li>
                <span className="font-semibold">Responsorial Psalm:</span> Psalm
                64:1, 24, 29-30, 31, 34
              </li>
              <li>
                <span className="font-semibold">Second Reading:</span> 1
                Corinthians 12:3b-7, 12-13
              </li>
              <li>
                <span className="font-semibold">Gospel:</span> John 20:19-23
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saint of the Day</CardTitle>
            <CardDescription>
              Learn about the saints of the Catholic Church
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2">St. Anthony of Padua</h3>
            <p className="text-sm text-muted-foreground mb-4">
              St. Anthony was a powerful Franciscan preacher and teacher. He is
              typically portrayed holding the child Jesus—or a lily—or a book—or
              all three—in his arms.
            </p>
            <p className="text-sm">Feast Day: June 13</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Reflection</CardTitle>
          <CardDescription>
            Meditate on the words of Pope Francis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <blockquote className="italic border-l-4 border-muted-foreground pl-4 py-2 mb-4">
            "Let us ask the Lord for the grace not to hesitate when the Spirit
            calls us to take a step forward. Let us ask for the apostolic
            courage to share the Gospel with others and to stop trying to make
            our Christian life a museum of memories."
          </blockquote>
          <p className="text-sm text-muted-foreground">- Pope Francis</p>
        </CardContent>
      </Card>
    </div>
  );
}
function AnnouncementItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <li className="flex items-start space-x-2">
      <Bell className="h-5 w-5 mt-0.5 text-muted-foreground flex-shrink-0" />
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </li>
  );
}
