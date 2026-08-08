import { createFileRoute } from "@tanstack/react-router";
import { MobileLayout } from "@/components/mobile-layout";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <MobileLayout title="About UBC">
      <div className="space-y-8">

        <div className="text-center">
          <img
            src="/logos/ubl-logo.png"
            alt="UBC"
            className="mx-auto h-28 w-28 object-contain"
          />

          <h1
            className="mt-5 text-4xl font-black"
            style={{ color: "#4c3624" }}
          >
            Udaipur Bohra Club
          </h1>

          <p
            className="mt-2 text-lg"
            style={{ color: "#7a5b3d" }}
          >
            Established in 2025
          </p>
        </div>

        <Section
          title="Who We Are"
          content="UBC (Udaipur Bohra Club) is more than a sports organization—it’s a community-driven platform built to connect people, celebrate talent, and create opportunities that extend far beyond the playing field."
        />

        <Section
          title="Our Vision"
          content="Founded with the vision of bringing the Bohra community together, UBC serves as a central hub where sports, business, and community engagement come together under one roof. Whether you're an athlete striving to showcase your skills, a business looking to expand its reach, or a community member eager to participate in meaningful events, UBC is designed to help you connect, grow, and thrive."
        />

        <Section
          title="UBL"
          content="Our flagship initiative, UBL (Udaipur Bohra League), represents this vision in action. What began as a professionally organized cricket league is evolving into a premium digital sporting experience featuring live auctions, team management, player profiles, statistics, fixtures, and season-long engagement. UBL is only the beginning of a much larger journey."
        />

        <Section
          title="Beyond Sports"
          content="As UBC continues to grow, the platform is designed to support multiple sports, tournaments, and community events while creating opportunities for athletes to gain recognition and compete in a professional environment."
        />

        <Section
          title="Supporting Businesses"
          content="Beyond sports, UBC empowers entrepreneurs and local businesses by providing a dedicated space to showcase their brands, connect with the community, and support events through partnerships and sponsorships."
        />

        <Section
          title="Our Mission"
          content="To unite our community, celebrate talent, empower businesses, and build a platform where every passion has the opportunity to flourish."
        />

        <div
          className="rounded-3xl border p-6"
          style={{
            background: "#fffaf2",
            borderColor: "#e5d1ad",
          }}
        >
          <h2
            className="text-2xl font-bold"
            style={{ color: "#4c3624" }}
          >
            Contact
          </h2>

          <p
            className="mt-4 leading-7"
            style={{ color: "#7a5b3d" }}
          >
            4, Near Galaxy Apartment,
            <br />
            Adinath Colony,
            <br />
            Pulla Bhuwana,
            <br />
            Fatehpura,
            <br />
            Udaipur, Rajasthan – 313001
          </p>

          <p
            className="mt-5"
            style={{ color: "#7a5b3d" }}
          >
            Email
            <br />
            <strong>udaipurbohraclub@gmail.com</strong>
          </p>
        </div>

        <div
          className="rounded-3xl border p-6"
          style={{
            background: "#fffaf2",
            borderColor: "#e5d1ad",
          }}
        >
          <h2
            className="text-2xl font-bold"
            style={{ color: "#4c3624" }}
          >
            Follow Us
          </h2>

          <div className="mt-5 space-y-4">

            <a
              href="https://www.instagram.com/udaipur_bohra_league?igsh=OW1i30eTJpMGtj"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border p-4 transition hover:bg-[#fff6e8]"
              style={{ borderColor: "#e5d1ad" }}
            >
              Instagram
            </a>

            <a
              href="https://youtube.com/@ubl-udaipurbohraleague?si=frYqFd7cmc9x77oH"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border p-4 transition hover:bg-[#fff6e8]"
              style={{ borderColor: "#e5d1ad" }}
            >
              YouTube
            </a>

          </div>
        </div>

        <div className="pb-6 text-center">
          <p
            className="text-sm"
            style={{ color: "#8b7253" }}
          >
            Version 2.0
          </p>

          <p
            className="mt-1 text-sm font-semibold"
            style={{ color: "#6d5135" }}
          >
            Developed by UBL Team
          </p>
        </div>

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
      <h2
        className="text-2xl font-bold"
        style={{ color: "#4c3624" }}
      >
        {title}
      </h2>

      <p
        className="mt-4 leading-8"
        style={{ color: "#7a5b3d" }}
      >
        {content}
      </p>
    </div>
  );
}