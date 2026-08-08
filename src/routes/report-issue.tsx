import { createFileRoute } from "@tanstack/react-router";
import { MobileLayout } from "@/components/mobile-layout";

export const Route = createFileRoute("/report-issue")({
  component: ReportIssuePage,
});

function ReportIssuePage() {
  return (
    <MobileLayout title="Report Issue">
      <div className="space-y-6">

        <div>
          <h2 className="text-3xl font-black text-[#4c3624]">
            Report an Issue
          </h2>

          <p className="mt-2 text-[#7a5b3d]">
            If you've found a bug, incorrect information, or any issue within
            the application, please describe it below and send it to our
            support team.
          </p>
        </div>

        <textarea
          rows={10}
          className="w-full rounded-2xl border border-[#d6c2a1] bg-white p-4 outline-none focus:border-[#b58335]"
          placeholder="Describe the issue in detail..."
        />

        <a
          href="mailto:udaipurbohraclub@gmail.com?subject=UBC App Issue Report"
          className="block w-full rounded-2xl bg-[#b58335] py-4 text-center font-semibold text-white transition hover:bg-[#9f722f]"
        >
          Email Report
        </a>

        <div className="rounded-2xl border border-[#ead8b8] bg-[#fffaf2] p-4">
          <h3 className="font-bold text-[#4c3624]">
            Support Email
          </h3>

          <p className="mt-2 text-[#7a5b3d]">
            udaipurbohraclub@gmail.com
          </p>

          <p className="mt-4 text-sm text-[#8a6b47]">
            We usually respond within 24–48 hours.
          </p>
        </div>

      </div>
    </MobileLayout>
  );
}