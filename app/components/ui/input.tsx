import * as React from "react";
import { AlertCircle } from "lucide-react";

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Icon to display on the left side */
  icon?: React.ComponentType<{ className?: string }>;
  /** Show error state */
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon: Icon, error, ...props }, ref) => {
    return (
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        )}
        <input
          ref={ref}
          className={cn(
            "flex w-full h-12 rounded-xl border transition-all duration-200",
            "bg-white/90 backdrop-blur-sm text-gray-900 text-sm",
            Icon ? "pl-10 pr-4" : "px-4",
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
        {error && (
          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
        )}
      </div>
    );
  }
);

Input.displayName = "Input";