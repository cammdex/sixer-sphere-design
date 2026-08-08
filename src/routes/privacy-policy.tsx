import { createFileRoute } from "@tanstack/react-router";
import { MobileLayout } from "@/components/mobile-layout";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <MobileLayout title="Privacy Policy">
      <div className="space-y-6">

        <Section
          title="Information We Collect"
          content="UBC collects only the information voluntarily submitted through our Business Registration Form. This may include the business name, business category, contact number, and any additional information required for listing the business in our public directory."
        />

        <Section
          title="How We Use Your Information"
          content="The information you submit is used to verify your registration, publish your business in the UBC Business Directory, communicate regarding your listing, and improve our services."
        />

        <Section
          title="Information We Do Not Collect"
          content="UBC does not collect banking information, payment details, government identification, passwords, or any confidential personal documents."
        />

        <Section
          title="Public Directory"
          content="Business information submitted for registration is intended to be publicly displayed inside the UBC Business Directory so community members can discover and contact your business."
        />

        <Section
          title="Data Security"
          content="We take reasonable measures to safeguard the information provided to us. While we strive to maintain secure systems, no online platform can guarantee absolute security."
        />

        <Section
          title="Policy Updates"
          content="This Privacy Policy may be updated from time to time. Continued use of the UBC platform constitutes acceptance of any revisions."
        />

        <Section
          title="Contact"
          content="Email: udaipurbohraclub@gmail.com"
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