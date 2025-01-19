import Link from "next/link";

export default function ProtectedFooter() {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto py-6 text-center">
        <p>&copy; 2023 St. Mary's Catholic Church. All rights reserved.</p>
        <p className="text-sm text-muted-foreground mt-2">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          {" | "}
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  );
}
