import { HeroSection } from "@/components/home/HeroSection";

export function DisplayIdle() {
  return (
    <div className="flex h-full items-center justify-center">
  <div
    className="overflow-hidden rounded-[32px]"
    style={{
      width: "1500px",
      height: "860px",
    }}
  >
    <HeroSection />
  </div>
</div>
  );
}