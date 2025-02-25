import RootHeader from "@/components/root-header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <RootHeader />
      {children}
    </div>
  );
}
