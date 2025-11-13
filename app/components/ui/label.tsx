// app/components/ui/label.tsx
"use client";

import * as React from "react";

// If you already have cn in "@/app/lib/utils", keep that import.
// The fallback below prevents crashes if that path changes.
let _cn: ((...c: Array<string | false | null | undefined>) => string) | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  _cn = require("@/app/lib/utils").cn;
} catch {}
function cn(...c: Array<string | false | null | undefined>) {
  return (_cn ?? ((...x) => x.filter(Boolean).join(" ")))(...c);
}

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Show a red asterisk automatically */
  required?: boolean;
  /** Show a subtle “(Optional)” tag */
  optional?: boolean;
  /** Visually hide the label but keep it for screen readers */
  srOnly?: boolean;
  /** Small helper text on the right (e.g., “(10 digits)”) */
  hint?: React.ReactNode;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, optional, srOnly, hint, ...props }, ref) => {
    return (
      <div className={cn("mb-1.5 flex items-center justify-between gap-2", srOnly && "sr-only")}>
        <label
          ref={ref}
          className={cn(
            "text-sm font-medium leading-none text-foreground",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            className
          )}
          {...props}
        >
          <span className="align-middle">{children}</span>
          {required && <span className="ml-1 align-middle text-red-500">*</span>}
          {!required && optional && (
            <span className="ml-2 align-middle text-xs text-muted-foreground">(Optional)</span>
          )}
        </label>

        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
    );
  }
);
Label.displayName = "Label";
