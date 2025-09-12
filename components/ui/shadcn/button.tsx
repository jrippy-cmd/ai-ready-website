import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "destructive";
  size?: "default" | "large";
  isLoading?: boolean;
  loadingLabel?: string;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      variant = "primary",
      size = "default",
      isLoading = false,
      loadingLabel = "Loading…",
      disabled,
      className,
      children,
      type,
      ...attrs
    },
    ref
  ) => {
    const nonInteractive = Boolean(disabled || isLoading);

    // Shared base styles + focus ring that follows your tokens
    const base =
      "relative inline-flex items-center justify-center select-none whitespace-nowrap transition-colors disabled:cursor-not-allowed";
    const focus =
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

    const sizeCls =
      size === "large"
        ? "h-11 rounded-[10px] px-12 py-3 gap-3 text-label-large"
        : "h-10 rounded-[8px] px-10 py-2.5 gap-2 text-label-medium";

    const variantCls =
      variant === "primary"
        ? cn(
            "bg-primary text-primary-foreground",
            !nonInteractive && "hover:opacity-90 active:scale-[0.995]",
            "disabled:opacity-70"
          )
        : variant === "secondary"
        ? cn(
            "bg-secondary text-secondary-foreground",
            !nonInteractive && "hover:bg-secondary/80 active:scale-[0.99]",
            "disabled:opacity-60"
          )
        : variant === "tertiary"
        ? cn(
            "bg-transparent text-foreground",
            "disabled:opacity-50",
            !nonInteractive && "hover:bg-muted"
          )
        : variant === "outline"
        ? cn(
            "bg-background text-foreground border border-border",
            !nonInteractive && "hover:bg-muted",
            "disabled:opacity-60"
          )
        : // destructive
          cn(
            "bg-destructive text-destructive-foreground",
            !nonInteractive && "hover:opacity-90 active:scale-[0.98]",
            "disabled:opacity-70"
          );

    // Spinner colors follow variant semantics
    const spinnerCls =
      variant === "primary" || variant === "destructive"
        ? "border-white/30 border-t-white"
        : "border-foreground/30 border-t-foreground";

    return (
      <button
        {...attrs}
        ref={ref}
        type={type ?? "button"}
        disabled={nonInteractive}
        aria-disabled={nonInteractive || undefined}
        aria-busy={isLoading || undefined}
        aria-live={isLoading ? "polite" : undefined}
        data-state={isLoading ? "loading" : nonInteractive ? "disabled" : "idle"}
        className={cn(base, focus, sizeCls, variantCls, className)}
      >
        {isLoading && (
          <>
            <div
              className={cn(
                "w-4 h-4 border-2 rounded-full animate-spin",
                spinnerCls
              )}
              aria-hidden
            />
            <span className="sr-only">{loadingLabel}</span>
          </>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
