"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import EventList from "@/components/admin/event-list"
import AddEventModal from "@/components/admin/add-event-modal"

// Define the type for events
interface Event {
  id: number
  name: string
  date: string
  time: string
  type: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([
    { id: 1, name: "Sunday Mass", date: "2023-07-09", time: "09:00 AM", type: "Mass" },
    { id: 2, name: "Youth Group Meeting", date: "2023-07-10", time: "06:00 PM", type: "Meeting" },
    { id: 3, name: "Choir Practice", date: "2023-07-11", time: "07:00 PM", type: "Practice" },
  ])

  // Fix: Ensure id is added here when a new event is created
  const addEvent = (newEvent: Omit<Event, "id">) => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }])
  }

  const deleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Manage Events</h1>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Church Events</CardTitle>
            <CardDescription>Add, edit, or remove church events</CardDescription>
          </div>
          <AddEventModal onAddEvent={addEvent}>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </AddEventModal>
        </CardHeader>
        <CardContent>
          <EventList events={events} onDeleteEvent={deleteEvent} />
        </CardContent>
      </Card>
    </div>
  )
}
