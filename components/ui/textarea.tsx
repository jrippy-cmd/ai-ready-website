import * as React from "react";
import { cn } from "@/utils/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        className={cn(
          // layout
          "block w-full cursor-text rounded-8 px-12 py-8 transition-all",
          // surfaces & border (tokens)
          "bg-background text-foreground border border-border",
          // hover nuance
          "hover:bg-secondary",
          // focus ring on wrapper
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
          // disabled support
          "aria-disabled:opacity-50 aria-disabled:cursor-not-allowed",
          // type ramp
          "text-body-medium",
          className
        )}
        aria-disabled={props.disabled ? true : undefined}
      >
        <textarea
          ref={ref}
          {...props}
          className={cn(
            "w-full min-h-[120px] bg-transparent outline-none resize-y",
            "placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed"
          )}
        />
      </label>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
