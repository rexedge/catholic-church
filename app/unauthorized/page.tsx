import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <ShieldAlert className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground">
          You don&apos;t have permission to access this page. Please contact an
          administrator if you believe this is an error.
        </p>
        <div className="flex flex-col space-y-2">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Sign in with a different account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
