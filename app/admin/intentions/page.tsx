"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import IntentionList from "@/components/admin/intention-list"

export default function IntentionsPage() {
  const [intentions, setIntentions] = useState([
    { id: 1, name: "John Doe", intention: "For the sick", date: "2023-07-09", status: "Pending" },
    { id: 2, name: "Jane Smith", intention: "In thanksgiving", date: "2023-07-10", status: "Approved" },
    { id: 3, name: "Mike Johnson", intention: "For the deceased", date: "2023-07-11", status: "Pending" },
    { id: 4, name: "John Cena", intention: "For job success", date: "2023-07-11", status: "Pending" },
    { id: 5, name: "David Malan", intention: "For the sickness", date: "2023-07-12", status: "Pending" },
    { id: 6, name: "Paul Oyeniran", intention: "For God's favour", date: "2023-07-14", status: "Pending" },
    { id: 7, name: "Ted Osiobe", intention: "For God's blessings", date: "2023-07-14", status: "Pending" },
    { id: 8, name: "Damian Preist", intention: "For the deceased", date: "2023-07-15", status: "Pending" },
  ])

  const updateIntentionStatus = (id: number, newStatus: any) => {
    setIntentions(
      intentions.map((intention) => (intention.id === id ? { ...intention, status: newStatus } : intention)),
    )
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Manage Intentions</h1>
      <Card>
        <CardHeader>
          <CardTitle>Mass Intentions</CardTitle>
          <CardDescription>Review and approve mass intentions</CardDescription>
        </CardHeader>
        <CardContent>
          <IntentionList intentions={intentions} onUpdateStatus={updateIntentionStatus} />
        </CardContent>
      </Card>
    </div>
  )
}

