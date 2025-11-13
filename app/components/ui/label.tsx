import * as React from "react";

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Show a red asterisk automatically */
  required?: boolean;
  /** Show a subtle "Optional" tag */
  optional?: boolean;
  /** Visually hide the label but keep it for screen readers */
  srOnly?: boolean;
  /** Small helper text on the right (e.g., "(10 digits)") */
  hint?: React.ReactNode;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, optional, srOnly, hint, ...props }, ref) => {
    return (
      <div className={cn("flex items-center justify-between gap-2", srOnly && "sr-only")}>
        <label
          ref={ref}
          className={cn(
            "text-sm font-semibold text-gray-700 leading-none",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            "mb-1.5 block",
            className
          )}
          {...props}
        >
          <span className="align-middle">{children}</span>
          {required && <span className="ml-1 align-middle text-red-500">*</span>}
          {optional && !required && (
            <span className="ml-2 align-middle text-xs text-gray-500">(Optional)</span>
          )}
        </label>

        {hint && <span className="text-xs text-gray-500">{hint}</span>}
      </div>
    );
  }
);

Label.displayName = "Label";