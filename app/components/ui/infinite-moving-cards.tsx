"use client";
import Image from "next/image";
import { cn } from "@/app/lib/utils";
import React, { useEffect, useState, useRef } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow", // keep slower by default
  pauseOnHover = true,
  className,
}: {
  items: { logoUrl: string; name: string }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // slow timings
    const dur =
      speed === "fast" ? "50s" : speed === "normal" ? "90s" : "120s";
    containerRef.current.style.setProperty("--animation-duration", dur);

    setStart(true);
  }, [speed]);

  const animationDirection: React.CSSProperties["animationDirection"] =
    direction === "left" ? "normal" : "reverse";

  return (
    <div
      ref={containerRef}
      className={cn(
        // slightly reduced width from 100rem -> 92rem
        "relative z-10 w-full max-w-[92rem] mx-auto overflow-hidden bg-white",
        "[mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]",
        className
      )}
    >
      <ul
        style={{ animationDirection }}
        className={cn(
          // slightly reduced loop width & spacing
          "flex w-max min-w-[300%] shrink-0 flex-nowrap gap-6 py-6",
          "will-change-transform",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {[...items, ...items].map((item, idx) => (
          <li
            key={idx}
            // slightly smaller cards (from 56 -> 52)
            className="relative w-52 h-52 max-w-full shrink-0 rounded-2xl p-6 flex items-center justify-center bg-white"
            title={item.name}
          >
            <Image
              src={item.logoUrl}
              alt={item.name}
              className="max-h-full max-w-full object-contain"
              width={144}
              height={144}
            />
          </li>
        ))}
      </ul>

      <style jsx global>{`
        @keyframes scroll {
          to {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll var(--animation-duration, 120s) linear infinite;
        }
      `}</style>
    </div>
  );
};
