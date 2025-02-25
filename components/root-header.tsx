import Link from "next/link";
import { AuthStatus } from "./auth-status";

export default function RootHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto container flex h-16 items-center justify-between">
        <div>
          <Link href="/" className="text-xl font-bold">
            Parish App
          </Link>
        </div>
        <AuthStatus />
      </div>
    </header>
  );
}
