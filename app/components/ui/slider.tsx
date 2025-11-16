// app/components/ui/slider.tsx

"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/app/lib/utils";

// Extend props to include your custom className overrides
type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> & {
  thumbClassName?: string;
  trackClassName?: string;
  rangeClassName?: string;
};

export function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  step,
  thumbClassName,
  trackClassName,
  rangeClassName,
  ...props
}: SliderProps) {
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
      {/* TRACK */}
      <SliderPrimitive.Track
        className={cn(
          "relative w-full h-2 bg-slate-300 rounded-full overflow-hidden",
          trackClassName
        )}
      >
        {/* RANGE */}
        <SliderPrimitive.Range
          className={cn(
            "absolute h-full bg-black rounded-full",
            rangeClassName
          )}
        />
      </SliderPrimitive.Track>

      {/* THUMBS */}
      {_values.map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className={cn(
            "block h-5 w-5 rounded-full bg-black border-2 border-white shadow-lg",
            "cursor-pointer focus:outline-none focus:ring-4 focus:ring-black",
            thumbClassName
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
}
