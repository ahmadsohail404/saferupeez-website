// app/components/ui/double-infinite-moving-cards.tsx
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
        "relative h-44 md:h-52 overflow-hidden",
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

export default function DoubleRowInfiniteMovingCards() {
  return (
    <>
      <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-10 text-center">
        Our Alumni Work At
      </h2>

      <div className="flex flex-col gap-0 w-full max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-8">
        <Row direction="right" rounded="top" />
        <Row direction="left" rounded="none" />
        <Row direction="right" rounded="none" />
        <Row direction="left" rounded="bottom" />
      </div>
    </>
  );
}
