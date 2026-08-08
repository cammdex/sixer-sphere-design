import { createFileRoute } from "@tanstack/react-router";
import { MobileLayout } from "@/components/mobile-layout";

export const Route = createFileRoute("/terms-and-conditions")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <MobileLayout title="Terms & Conditions">
      <div className="space-y-6">

        <Section
          title="Business Registration"
          content="Any business may apply to be listed in the UBC Business Directory. Submission of a registration form does not guarantee approval."
        />

        <Section
          title="Approval & Listings"
          content="UBC reserves the right to approve, reject, modify, update, or remove any listing if required to maintain the quality and integrity of the directory."
        />

        <Section
          title="Accuracy of Information"
          content="Business owners are responsible for ensuring that the information they submit is complete and accurate."
        />

        <Section
          title="Transactions"
          content="UBC is not responsible for any transaction, agreement, purchase, or dispute between businesses and users. Any communication or transaction takes place directly between the parties involved."
        />

        <Section
          title="Intellectual Property"
          content="All UBC branding, UBL branding, logos, graphics, tournament information, schedules, statistics, player information, website design, and related content are the property of Udaipur Bohra Club unless otherwise stated."
        />

        <Section
          title="Changes to the Platform"
          content="UBC may update, improve, or modify the platform and these Terms & Conditions at any time without prior notice."
        />

        <Section
          title="Acceptance"
          content="By using the UBC platform, you agree to these Terms & Conditions."
        />

      </div>
    </MobileLayout>
  );
}

function Section({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div
      className="rounded-3xl border p-6"
      style={{
        background: "#fffaf2",
        borderColor: "#e5d1ad",
      }}
    >
      <h2 className="text-2xl font-bold text-[#4c3624]">
        {title}
      </h2>

      <p className="mt-4 leading-8 text-[#7a5b3d]">
        {content}
      </p>
    </div>
  );
}