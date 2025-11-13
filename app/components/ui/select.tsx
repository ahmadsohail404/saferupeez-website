"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";

import { cn } from "@/app/lib/utils";

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
// app/components/ui/select.tsx
"use client";

import * as React from "react";
import * as DM from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown } from "lucide-react";

/** tiny cn helper */
function cn(...args: Array<string | undefined | false | null>) {
  return args.filter(Boolean).join(" ");
}

/* -------------------------------------------------------------------------- */
/*  Context                                                                    */
/* -------------------------------------------------------------------------- */
type Ctx = {
  value?: string;
  setValue?: (v: string) => void;

  /** The *label* to show in the trigger after selection */
  selectedLabel?: React.ReactNode;
  setSelectedLabel?: (n: React.ReactNode) => void;

  /** Placeholder support */
  placeholder?: React.ReactNode;
  setPlaceholder?: (p: React.ReactNode) => void;

  /** open state (non-modal so no scroll lock) */
  open?: boolean;
  setOpen?: (o: boolean) => void;
};
const SelectCtx = React.createContext<Ctx>({});

/* -------------------------------------------------------------------------- */
/*  Root                                                                       */
/* -------------------------------------------------------------------------- */
type SelectProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  open?: boolean;
  onOpenChange?: (o: boolean) => void;
  children: React.ReactNode;
};

export function Select({
  value: controlledValue,
  defaultValue,
  onValueChange,
  open: controlledOpen,
  onOpenChange,
  children,
}: SelectProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | undefined>(
    defaultValue
  );
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const setValue = (v: string) => {
    if (!isControlled) setUncontrolledValue(v);
    onValueChange?.(v);
  };

  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = (o: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(o);
    onOpenChange?.(o);
  };

  const [placeholder, setPlaceholder] = React.useState<React.ReactNode>();
  const [selectedLabel, setSelectedLabel] = React.useState<React.ReactNode>();

  return (
    <SelectCtx.Provider
      value={{
        value,
        setValue,
        placeholder,
        setPlaceholder,
        open,
        setOpen,
        selectedLabel,
        setSelectedLabel,
      }}
    >
      <DM.Root open={open} onOpenChange={setOpen} modal={false}>
        {children}
      </DM.Root>
    </SelectCtx.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/*  Value (placeholder only)                                                   */
/* -------------------------------------------------------------------------- */
export function SelectValue({ placeholder }: { placeholder?: React.ReactNode }) {
  const ctx = React.useContext(SelectCtx);
  React.useEffect(() => {
    ctx.setPlaceholder?.(placeholder);
  }, [placeholder]); // placeholder update only
  return null;
}

/* -------------------------------------------------------------------------- */
/*  Trigger – hover OR click to open, black-border look                        */
/* -------------------------------------------------------------------------- */
export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { error?: boolean }
>(({ className, children, error, onMouseEnter, onClick, ...props }, ref) => {
  const { open, setOpen, selectedLabel, placeholder } = React.useContext(SelectCtx);

  const handleMouseEnter: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onMouseEnter?.(e);
    setOpen?.(true);
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);
    setOpen?.(!open);
  };

  return (
    <DM.Trigger asChild>
      <button
        ref={ref}
        type="button"
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-xl px-4 py-2 transition-all duration-200",
          "bg-white text-sm text-slate-900",
          error
            ? "border border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "border border-black/20 focus:border-black focus:ring-2 focus:ring-black/20",
          "hover:border-black/30 focus:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        <span className="truncate text-left flex-1">
          {/* children are optional; we primarily show selectedLabel or placeholder */}
          {children}
          {children ? " " : null}
          {selectedLabel ? (
            <span className="text-slate-900">{selectedLabel}</span>
          ) : (
            <span className="text-gray-500">{placeholder as React.ReactNode}</span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "ml-2 h-4 w-4 opacity-60 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
    </DM.Trigger>
  );
});
SelectTrigger.displayName = "SelectTrigger";

/* -------------------------------------------------------------------------- */
/*  Content – smooth animations, no scroll lock                                */
/* -------------------------------------------------------------------------- */
type SelectContentProps = React.ComponentPropsWithoutRef<typeof DM.Content> & {
  sideOffset?: number;
};

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, sideOffset = 8, onMouseLeave, ...props }, ref) => {
    const { setOpen } = React.useContext(SelectCtx);

    const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = (e) => {
      onMouseLeave?.(e);
      setOpen?.(false);
    };

    return (
      <DM.Portal>
        <DM.Content
          ref={ref}
          sideOffset={sideOffset}
          align="start"
          className={cn(
            "relative z-50 min-w-[12rem] overflow-hidden rounded-xl bg-white text-slate-900",
            "border border-black/20 shadow-xl p-1",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2",
            "transition-[transform,opacity] duration-200",
            className
          )}
          onMouseLeave={handleMouseLeave}
          {...props}
        />
      </DM.Portal>
    );
  }
);
SelectContent.displayName = "SelectContent";

/* -------------------------------------------------------------------------- */
/*  Group / Label / Separator (helpers)                                        */
/* -------------------------------------------------------------------------- */
export const SelectGroup = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-1 first:mt-0", className)} {...props} />
);

export const SelectLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold text-foreground/70", className)}
    {...props}
  />
));
SelectLabel.displayName = "SelectLabel";

export const SelectSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("my-1 h-px bg-muted", className)} {...props} />
));
SelectSeparator.displayName = "SelectSeparator";

/* -------------------------------------------------------------------------- */
/*  Item – sets both value AND the selected label for the trigger              */
/* -------------------------------------------------------------------------- */
type ItemProps = React.ComponentPropsWithoutRef<typeof DM.Item> & {
  value: string;
};

export const SelectItem = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, children, value, ...props }, ref) => {
    const { value: selected, setValue, setOpen, setSelectedLabel } = React.useContext(SelectCtx);
    const isActive = selected === value;

    return (
      <DM.Item
        ref={ref}
        onSelect={(e) => {
          e.preventDefault(); // keep focus stable
          setValue?.(value);
          // store the visible label so Trigger can render it
          setSelectedLabel?.(children);
          requestAnimationFrame(() => setOpen?.(false));
        }}
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm outline-none",
          "hover:bg-purple-50 focus:bg-purple-50",
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          "transition-colors duration-150",
          isActive && "bg-purple-50 text-purple-700 font-medium",
          className
        )}
        {...props}
      >
        <span className="mr-6 truncate">{children}</span>
        {isActive && <Check className="absolute right-3 h-4 w-4 text-purple-600" />}
      </DM.Item>
    );
  }
);
SelectItem.displayName = "SelectItem";
