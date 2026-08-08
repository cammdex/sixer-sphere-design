import { createFileRoute } from "@tanstack/react-router";
import { MobileLayout } from "@/components/mobile-layout";

export const Route = createFileRoute("/help")({
  component: HelpPage,
});

function HelpPage() {
  return (
    <MobileLayout title="Help & FAQs">
      <div className="space-y-5">

        <div>
          <h2
            className="text-3xl font-black"
            style={{ color: "#4c3624" }}
          >
            Help & FAQs
          </h2>

          <p
            className="mt-2"
            style={{ color: "#7a5b3d" }}
          >
            Find answers to the most frequently asked questions about UBC,
            UBL and the Business Directory.
          </p>
        </div>

        <FAQ
          q="How can I register my business?"
          a='Navigate to the "Register Your Business" button in the Business Directory or contact the UBC team directly.'
        />

        <FAQ
          q="How can I sponsor UBL?"
          a="Please contact us through our support email or support phone number to discuss sponsorship opportunities."
        />

        <FAQ
          q="How can I contact a listed business?"
          a="Every business listing includes a contact number below the business details for your convenience."
        />

        <FAQ
          q="How can I register a team?"
          a="Please contact the UBC team through the support phone number available on the Support page."
        />

        <FAQ
          q="How can I contact UBC?"
          a="Send us an email at udaipurbohraclub@gmail.com and our team will get back to you within 24–48 hours."
        />

        <FAQ
          q="How do I report incorrect information or a problem?"
          a="Open the Report Issue page, describe the issue, and our team will review it as soon as possible."
        />

      </div>
    </MobileLayout>
  );
}

function FAQ({
  q,
  a,
}: {
  q: string;
  a: string;
}) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        background: "#fffaf2",
        borderColor: "#e2cfad",
      }}
    >
      <h3
        className="text-lg font-bold"
        style={{
          color: "#4c3624",
        }}
      >
        {q}
      </h3>

      <p
        className="mt-3 leading-7"
        style={{
          color: "#7a5b3d",
        }}
      >
        {a}
      </p>
    </div>
  );
}