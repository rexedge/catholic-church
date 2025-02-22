import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react" // Added import for React

interface AdminQuickLinkCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}

export default function AdminQuickLinkCard({ title, description, icon, href }: AdminQuickLinkCardProps) {
  return (
    <Card>
      <Link href={href}>
        <CardHeader>
          <CardTitle className="flex items-center">
            {icon}
            <span className="ml-2">{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
      </Link>
    </Card>
  )
}

