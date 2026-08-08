import { createFileRoute } from "@tanstack/react-router";
import { MobileLayout } from "@/components/mobile-layout";

export const Route = createFileRoute("/support")({
  component: SupportPage,
});

function SupportPage() {
  return (
    <MobileLayout title="Support">
      <div className="space-y-6">

        <div>
          <h2
            className="text-3xl font-black"
            style={{ color: "#4c3624" }}
          >
            Contact Support
          </h2>

          <p
            className="mt-2"
            style={{ color: "#7a5b3d" }}
          >
            Need assistance? Our team is here to help with business
            registration, tournament information, technical issues, and
            general enquiries.
          </p>
        </div>

        <a
          href="tel:+917976875352"
          className="block rounded-2xl border p-5 transition hover:bg-[#fff8ec]"
          style={{
            borderColor: "#d9c3a0",
          }}
        >
          <h3
            className="text-lg font-bold"
            style={{ color: "#4c3624" }}
          >
            Call Support
          </h3>

          <p
            className="mt-1"
            style={{ color: "#7a5b3d" }}
          >
            +91 79768 75352
          </p>
        </a>

        <a
          href="https://wa.me/918302267652"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl border p-5 transition hover:bg-[#fff8ec]"
          style={{
            borderColor: "#d9c3a0",
          }}
        >
          <h3
            className="text-lg font-bold"
            style={{ color: "#4c3624" }}
          >
            WhatsApp Support
          </h3>

          <p
            className="mt-1"
            style={{ color: "#7a5b3d" }}
          >
            +91 83022 67652
          </p>
        </a>

        <a
          href="mailto:udaipurbohraclub@gmail.com"
          className="block rounded-2xl border p-5 transition hover:bg-[#fff8ec]"
          style={{
            borderColor: "#d9c3a0",
          }}
        >
          <h3
            className="text-lg font-bold"
            style={{ color: "#4c3624" }}
          >
            Email Support
          </h3>

          <p
            className="mt-1"
            style={{ color: "#7a5b3d" }}
          >
            udaipurbohraclub@gmail.com
          </p>
        </a>

        <div
          className="rounded-2xl border p-5"
          style={{
            background: "#fffaf2",
            borderColor: "#ead8b8",
          }}
        >
          <h3
            className="font-bold"
            style={{ color: "#4c3624" }}
          >
            Response Time
          </h3>

          <p
            className="mt-2"
            style={{ color: "#7a5b3d" }}
          >
            We usually respond to emails and support requests within
            24–48 hours.
          </p>
        </div>

      </div>
    </MobileLayout>
  );
}