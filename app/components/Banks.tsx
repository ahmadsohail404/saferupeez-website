// app/components/Banks.tsx
"use client";

import { InfiniteMovingCards } from "@/app/components/ui/infinite-moving-cards";
import { logos } from "@/app/lib/bankLogo";

function Row({
  direction,
  rounded,
}: {
  direction: "left" | "right";
  rounded: "top" | "bottom" | "none";
}) {
  return (
    <div
      className={[
        "relative h-32 md:h-36 overflow-hidden",
        rounded === "top"
          ? "rounded-t-xl"
          : rounded === "bottom"
          ? "rounded-b-xl"
          : "rounded-none",
        "bg-white",
      ].join(" ")}
    >
      <InfiniteMovingCards
        items={logos}
        direction={direction}
        speed="slow"
        pauseOnHover
        className="bg-white"
      />
    </div>
  );
}

export default function Banks() {
  return (
    <section className="py-16">
      <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-8 text-center">
        Our Banking Partners
      </h2>

      <div className="flex flex-col gap-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Row 1 → right */}
        <Row direction="right" rounded="top" />
        {/* Row 2 → left */}
        <Row direction="left" rounded="none" />
        {/* Row 3 → right */}
        <Row direction="right" rounded="none" />
        {/* Row 4 → left */}
        <Row direction="left" rounded="bottom" />
      </div>
    </section>
  );
}
