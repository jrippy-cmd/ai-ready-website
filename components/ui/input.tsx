import * as React from "react";
import { cn } from "@/utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /** visual size only */
  size?: "sm" | "md" | "lg";
  /** invalid state styling */
  invalid?: boolean;
  /** left or right adornments */
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

const sizeMap = {
  sm: "h-9 px-3 text-body-small rounded-6",
  md: "h-10 px-4 text-body-medium rounded-8",
  lg: "h-12 px-5 text-body-large rounded-10",
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      size = "md",
      invalid = false,
      startIcon,
      endIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const withIcons =
      (startIcon ? "pl-10" : "") + (endIcon ? " pr-10" : "");

    return (
      <div className={cn("relative w-full", disabled && "opacity-60")}>
        {startIcon && (
          <span
            className={cn(
              "absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground pointer-events-none"
            )}
          >
            {startIcon}
          </span>
        )}

        <input
          type={type}
          className={cn(
            // surface + text
            "w-full bg-background text-foreground",
            // border + ring
            "border border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            // placeholder
            "placeholder:text-muted-foreground/70",
            // transitions
            "transition-shadow",
            // rounding from size map
            sizeMap[size],
            // add space for icons
            withIcons,
            // invalid state
            invalid &&
              "border-destructive focus-visible:ring-destructive focus-visible:ring-offset-2",
            className
          )}
          ref={ref}
          aria-invalid={invalid || undefined}
          disabled={disabled}
          {...props}
        />

        {endIcon && (
          <button
            type="button"
            tabIndex={-1}
            className={cn(
              "absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
            )}
            aria-hidden
          >
            {endIcon}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
