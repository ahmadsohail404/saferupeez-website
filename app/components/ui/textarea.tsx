import * as React from "react";

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Show error state */
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex w-full min-h-[140px] rounded-xl border transition-all duration-200",
          "bg-white/90 backdrop-blur-sm text-gray-900 text-sm",
          "px-4 py-3 resize-y",
          error
            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100",
          "placeholder:text-gray-400",
          "hover:border-gray-300",
          "focus:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";