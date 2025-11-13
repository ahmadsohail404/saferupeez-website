// app/components/ui/input.tsx
"use client";

import * as React from "react";
import { AlertCircle } from "lucide-react";

// If you already have cn in "@/app/lib/utils", keep that import and
// delete the fallback implementation below.
let _cn: ((...c: Array<string | false | null | undefined>) => string) | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  _cn = require("@/app/lib/utils").cn;
} catch {}
function cn(...c: Array<string | false | null | undefined>) {
  return (_cn ?? ((...x) => x.filter(Boolean).join(" ")))(...c);
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional left icon component (e.g., Mail, Phone) */
  icon?: React.ComponentType<{ className?: string }>;
  /** Error styling (red border/ring + alert icon on right) */
  error?: boolean;
  /** Optional extra class on the outer wrapper div */
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon: Icon, error, containerClassName, type, ...props }, ref) => {
    return (
      <div className={cn("relative", containerClassName)}>
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        )}

        <input
          ref={ref}
          type={type}
          data-slot="input"
          aria-invalid={error ? true : undefined}
          className={cn(
            // ── base (shadcn-like) ─────────────────────────────────────────────
            "flex h-9 w-full min-w-0 rounded-md border bg-input-background px-3 py-1",
            "text-base md:text-sm placeholder:text-muted-foreground",
            "selection:bg-primary selection:text-primary-foreground",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
            // ── borders / rings ────────────────────────────────────────────────
            error
              ? "border-destructive aria-invalid:border-destructive aria-invalid:ring-destructive/20 focus-visible:border-destructive focus-visible:ring-[3px] focus-visible:ring-destructive/30"
              : "border-input focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            // ── background & subtle hover ─────────────────────────────────────
            "dark:bg-input/30",
            // ── padding tweaks when icon present ──────────────────────────────
            Icon ? "pl-10 pr-10" : "px-3",
            // ── allow overrides ───────────────────────────────────────────────
            className
          )}
          {...props}
        />

        {error && (
          <AlertCircle className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
