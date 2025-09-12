"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/utils/cn";

/**
 * Provider with configurable open delay.
 * Usage:
 * <TooltipProvider delayDuration={200}>…</TooltipProvider>
 */
const TooltipProvider: React.FC<
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>
> = ({ children, ...props }) => (
  <TooltipPrimitive.Provider {...props}>{children}</TooltipPrimitive.Provider>
);

const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

type Variant = "default" | "inverse" | "info" | "success" | "warning";
type Size = "sm" | "md";

const variantClasses: Record<Variant, string> = {
  // tokenized surface identical to your current look
  default:
    "bg-card text-card-foreground border-border shadow-md",
  // high-contrast option
  inverse:
    "bg-accent-black text-accent-white border-black-alpha-32 shadow-lg",
  // semantic options mapped to your palette
  info:
    "bg-accent-bluetron text-accent-white border-black-alpha-32 shadow-lg",
  success:
    "bg-accent-forest text-accent-white border-black-alpha-32 shadow-lg",
  warning:
    "bg-accent-honey text-accent-black border-black-alpha-32 shadow-lg",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-8 py-4 text-body-small rounded-6",
  md: "px-8 py-6 text-body-medium rounded-8",
};

type TooltipContentProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Content
> & {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
};

/**
 * Tokenized tooltip content with variants, sizes, and optional arrow.
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(
  (
    {
      className,
      sideOffset = 6,
      variant = "default",
      size = "md",
      withArrow = false,
      align = "center",
      ...props
    },
    ref
  ) => (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        align={align}
        className={cn(
          // layout and surface
          "z-50 border",
          variantClasses[variant],
          sizeClasses[size],

          // animations
          "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out",
          "data-[state=delayed-open]:fade-in-0 data-[state=closed]:fade-out-0",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=top]:slide-in-from-bottom-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          className
        )}
        {...props}
      >
        {props.children}
        {withArrow && (
          <TooltipPrimitive.Arrow
            className={cn(
              "size-8",
              // Arrow inherits background via CSS variable on many setups.
              // We emulate it by giving it a matching fill per variant.
              variant === "default" && "fill-[color:var(--card)]",
              variant === "inverse" && "fill-[color:var(--accent-black)]",
              variant === "info" && "fill-[color:var(--accent-bluetron)]",
              variant === "success" && "fill-[color:var(--accent-forest)]",
              variant === "warning" && "fill-[color:var(--accent-honey)]"
            )}
          />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent };
