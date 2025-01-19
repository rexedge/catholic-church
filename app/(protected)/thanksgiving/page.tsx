import NewThanksgivingModal from "@/components/new-thanksgiving-modal";
import ThanksgivingDonationList from "@/components/thanksgiving-donation-list";
import ThanksgivingList from "@/components/thanksgiving-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thanksgiving | St. Mary's Catholic Church",
  description: "View and submit Thanksgiving offerings",
};

export default function ThanksgivingPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Thanksgiving Offerings</h1>
        <NewThanksgivingModal />
      </div>
      <ThanksgivingList />
      <ThanksgivingDonationList />
    </div>
  );
}
