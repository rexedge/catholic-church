import type React from "react";

export function DashboardShell({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="space-y-6" {...props}>
      {children}
    </div>
  );
}
