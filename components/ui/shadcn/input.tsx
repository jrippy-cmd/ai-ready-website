import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      className={cn(
        // layout
        "block w-full cursor-text rounded-8 px-12 py-8 transition-all",
        // base surface & border (tokens)
        "bg-background text-foreground border border-border",
        // hover/active nuance
        "hover:bg-secondary",
        // focus ring on the wrapper when the input is focused
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
        // disabled style if consumer passes disabled on the input
        "aria-disabled:opacity-50 aria-disabled:cursor-not-allowed",
        // typography
        "text-body-medium",
        className
      )}
      aria-disabled={props.disabled ? true : undefined}
    >
      <input
        ref={ref}
        {...props}
        className={cn(
          "w-full bg-transparent outline-none placeholder:text-muted-foreground",
          "disabled:cursor-not-allowed"
        )}
      />
    </label>
  );
});

Input.displayName = "Input";

export default Input;
