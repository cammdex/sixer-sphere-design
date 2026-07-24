import { createFileRoute } from "@tanstack/react-router";
import { DisplayScreen } from "@/components/display/DisplayScreen";

export const Route = createFileRoute("/display")({
  component: DisplayPage,
});

function DisplayPage() {
  return <DisplayScreen />;
}