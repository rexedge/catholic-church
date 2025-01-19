import ProtectedFooter from "@/components/protected-footer";
import ProtectedHeader from "@/components/protected-header";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <ProtectedHeader />
      <main className="flex-grow container mx-auto py-8">{children}</main>
      <ProtectedFooter />
    </div>
  );
}
