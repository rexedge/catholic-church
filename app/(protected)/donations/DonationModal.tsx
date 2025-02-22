"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Define TypeScript interface for props
interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  onAddDonation: (donation: { amount: number; purpose: string; date: string; recurring: boolean }) => void
}

export default function DonationModal({ isOpen, onClose, onAddDonation }: DonationModalProps) {
  const [amount, setAmount] = useState("")
  const [purpose, setPurpose] = useState("")
  const [date, setDate] = useState("")
  const [isRecurring, setIsRecurring] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newDonation = {
      amount: Number(amount),
      purpose,
      date,
      recurring: isRecurring,
    }
    onAddDonation(newDonation)
    onClose()
    // Reset form
    setAmount("")
    setPurpose("")
    setDate("")
    setIsRecurring(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Donation Pledge</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>
          <div>
            <Label htmlFor="purpose">Purpose</Label>
            <Select onValueChange={setPurpose} required>
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General Offering">General Offering</SelectItem>
                <SelectItem value="Building Fund">Building Fund</SelectItem>
                <SelectItem value="Charity">Charity</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="recurring" checked={isRecurring} onCheckedChange={setIsRecurring} />
            <Label htmlFor="recurring">Recurring Donation</Label>
          </div>
          <Button type="submit">Submit Pledge</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
