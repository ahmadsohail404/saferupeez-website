"use client";
import Image from "next/image";
import { cn } from "@/app/lib/utils";
import React, { useEffect, useState, useRef } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
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
    const dur = speed === "fast" ? "30s" : speed === "normal" ? "40s" : "80s";
    containerRef.current.style.setProperty("--animation-duration", dur);
    setStart(true);
  }, [speed]);

  const animationDirection: React.CSSProperties["animationDirection"] =
    direction === "left" ? "normal" : "reverse";

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative z-10 max-w-7xl overflow-hidden bg-white",
        "[mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]",
        className
      )}
    >
      <ul
        style={{ animationDirection }}
        className={cn(
          "flex w-max min-w-[200%] shrink-0 flex-nowrap gap-5 py-5",
          "will-change-transform",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {[...items, ...items].map((item, idx) => (
          <li
            key={idx}
            className="relative w-36 h-36 max-w-full shrink-0 rounded-xl p-5 flex items-center justify-center bg-white"
            title={item.name}
          >
            <Image
              src={item.logoUrl}
              alt={item.name}
              className="max-h-full max-w-full object-contain"
              width={96}
              height={96}
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
          animation: scroll var(--animation-duration, 40s) linear infinite;
        }
      `}</style>
    </div>
  );
};
