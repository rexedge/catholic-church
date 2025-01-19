import MassIntentionsList from "@/components/mass-intention-list";
import NewIntentionModal from "@/components/new-intention-modal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mass Intentions | St. Mary's Catholic Church",
  description: "View and submit Mass intentions",
};

export default function MassIntentionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Mass Intentions</h1>
        <NewIntentionModal />
      </div>
      <MassIntentionsList />
    </div>
  );
}
