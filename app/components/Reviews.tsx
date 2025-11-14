"use client";
import React, { useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";

/* =============================================================
    REVIEW DATA
============================================================= */
const reviews = [
  {
    name: "Tapas J.",
    handle: "@tapas_j",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    text: "SafeRupeez has transformed my saving habits. Highly recommend to everyone!",
    rating: 5,
  },
  {
    name: "Hammem H.",
    handle: "@hammem_h",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
    text: "SafeRupeez has been a game-changer for my savings journey.",
    rating: 5,
  },
  {
    name: "harshita S.",
    handle: "@harshita_s",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    text: "I love how SafeRupeez makes saving money so simple and stress-free!",
    rating: 5,
  },
  {
    name: "Karan V.",
    handle: "@karan_v",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    text: "SafeRupeez has been a lifesaver for my savings goals. Highly recommended!",
    rating: 5,
  },
  {
    name: " Jaya Prakash",
    handle: "@jaya_prakash",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    text: "SafeRupeez has made saving money effortless and enjoyable for me.",
    rating: 5,
  },
];

/* =============================================================
    INFINITE MOVING ROW
============================================================= */
function InfiniteRow({ direction }: { direction: "left" | "right" }) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const CARD_WIDTH = 380; // This should match the sm:w-[380px] width

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    let x = 0;
    const cardWidth = CARD_WIDTH;
    const totalCards = reviews.length;
    const totalWidth = cardWidth * totalCards;

    x = direction === "left" ? 0 : -totalWidth;

    const speed = 0.5;

    const animate = () => {
      if (!el) return;

      x += direction === "left" ? -speed : speed;

      if (direction === "left" && x <= -totalWidth) {
        x = 0;
      } else if (direction === "right" && x >= 0) {
        x = -totalWidth;
      }

      el.style.transform = `translateX(${x}px)`;
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);
    };
  }, [direction]);

  return (
    <div className="relative overflow-hidden w-full">
      <div ref={rowRef} className="flex gap-4 py-2">
        {[...reviews, ...reviews].map((item, i) => (
          <div
            key={i}
            // MODIFIED: Reduced padding for mobile (p-4) and kept wide for sm+ (sm:p-5)
            // The card width remains responsive (w-full on mobile, fixed on sm+)
            className="group w-full sm:w-[380px] flex-shrink-0
              bg-white rounded-2xl p-4 sm:p-5
              border border-gray-100 hover:border-amber-200
              transition-all duration-500 transform hover:-translate-y-2"
          >
            {/* Quote Icon */}
            <div className="mb-2 relative">
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl opacity-20 transform rotate-6"></div>
              <Quote className="relative w-6 h-6 text-amber-600" />
            </div>

            {/* Review Text with wrapping */}
            <p
              // MODIFIED: Reduced min-height for mobile (min-h-[72px]) and increased it for sm+ (sm:min-h-[88px])
              className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 min-h-[72px] sm:min-h-[88px] break-words"
            >
              {item.text}
            </p>

            {/* Rating Stars */}
            <div className="flex gap-1 mb-2">
              {[...Array(item.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-2"></div>

            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full transform rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="relative w-full h-full rounded-full object-cover ring-2 ring-white shadow-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm sm:text-base truncate group-hover:text-amber-700 transition-colors duration-300">
                  {item.name}
                </p>
                <p className="text-amber-600 text-xs sm:text-sm truncate">
                  {item.handle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =============================================================
    MAIN SECTION
============================================================= */
export default function ReviewsSection() {
  return (
    // ADDED: Added px-4 to the section for padding on the edges of small screens
    <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-br from-amber-50 via-white to-yellow-50/40 overflow-hidden px-4">
      {/* Background decorative blurs */}
      <div className="absolute top-16 right-12 w-80 h-80 bg-amber-300/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-16 left-12 w-80 h-80 bg-yellow-300/20 blur-[120px] rounded-full" />

      {/* Heading */}
      <div className="relative text-center mb-12 max-w-4xl mx-auto">
        <div className="inline-flex items-center justify-center mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-100/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-amber-200/50 shadow-sm">
            ⭐ User Testimonials
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Take{" "}
          <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
            their
          </span>{" "}
          word for it
        </h2>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
          Over 10 thousand users across 20+ cities trust SafeRupeez
        </p>
      </div>

      {/* Review Rows */}
      {/* The row containers no longer need px-4 because it's on the section */}
      <div className="relative flex flex-col gap-4">
        <InfiniteRow direction="left" />
        <InfiniteRow direction="right" />
      </div>
    </section>
  );
}
