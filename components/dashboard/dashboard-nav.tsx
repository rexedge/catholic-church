"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Calendar,
  Church,
  FileText,
  Gift,
  Home,
  Settings,
  User,
  Users,
} from "lucide-react";

interface DashboardNavProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  isAdmin?: boolean;
  isPriest?: boolean;
}

export function DashboardNav({ user, isAdmin, isPriest }: DashboardNavProps) {
  const pathname = usePathname();

  // Define navigation items based on role
  const navItems = [
    {
      title: "Dashboard",
      href: isAdmin ? "/admin" : isPriest ? "/priest" : "/dashboard",
      icon: Home,
      roles: ["ADMIN", "PRIEST", "PARISHIONER"],
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
      roles: ["ADMIN", "PRIEST", "PARISHIONER"],
    },
    // Admin specific
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
      roles: ["ADMIN"],
    },
    {
      title: "Parishes",
      href: "/admin/parishes",
      icon: Church,
      roles: ["ADMIN"],
    },
    {
      title: "Reports",
      href: "/admin/reports",
      icon: BarChart3,
      roles: ["ADMIN"],
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
      roles: ["ADMIN"],
    },
    // Priest specific
    {
      title: "Masses",
      href: "/priest/masses",
      icon: Church,
      roles: ["PRIEST"],
    },
    {
      title: "Schedule",
      href: "/priest/schedule",
      icon: Calendar,
      roles: ["PRIEST"],
    },
    {
      title: "Intentions",
      href: "/priest/intentions",
      icon: FileText,
      roles: ["PRIEST"],
    },
    {
      title: "Thanksgivings",
      href: "/priest/thanksgivings",
      icon: Gift,
      roles: ["PRIEST"],
    },
    // Parishioner specific
    {
      title: "My Intentions",
      href: "/dashboard/intentions",
      icon: FileText,
      roles: ["PARISHIONER"],
    },
    {
      title: "My Thanksgivings",
      href: "/dashboard/thanksgivings",
      icon: Gift,
      roles: ["PARISHIONER"],
    },
  ];

  // Filter items based on user role or specific panel
  const filteredItems = navItems.filter((item) => {
    if (isAdmin) {
      return item.roles.includes("ADMIN");
    }
    if (isPriest) {
      return item.roles.includes("PRIEST");
    }
    return item.roles.includes(user.role);
  });

  return (
    <nav className="grid items-start gap-2">
      {filteredItems.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? "secondary" : "ghost"}
          className={cn(
            "justify-start",
            pathname === item.href && "bg-muted font-medium"
          )}
          asChild
        >
          <Link href={item.href}>
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
