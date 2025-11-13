"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/app/lib/utils";

// -----------------------------------------
// CLEAN, FIXED, PREMIUM SLIDER COMPONENT
// -----------------------------------------
export function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  step,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
        ? defaultValue
        : [min, max],
    [value, defaultValue, min, max]
  );

  return (
    <SliderPrimitive.Root
      {...props}
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      className={cn(
        "relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50",
        className
      )}
    >
      {/* TRACK (the background line) */}
      <SliderPrimitive.Track
        className={cn(
          "relative w-full h-2 bg-purple-200 rounded-full overflow-hidden"
        )}
      >
        {/* RANGE (filled colored section) */}
        <SliderPrimitive.Range
          className={cn("absolute h-full bg-purple-600 rounded-full")}
        />
      </SliderPrimitive.Track>

      {/* ONE SINGLE PREMIUM THUMB */}
      {_values.map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className={cn(
            "block h-5 w-5 rounded-full bg-purple-600 border-2 border-white shadow-lg",
            "cursor-pointer focus:outline-none focus:ring-4 focus:ring-purple-400/40"
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
}
