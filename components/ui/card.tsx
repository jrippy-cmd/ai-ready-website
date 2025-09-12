import * as React from "react";
import { cn } from "@/utils/cn";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "elevated" | "outline" | "ghost";
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
};

const pad = {
  none: "p-0",
  sm: "p-12",
  md: "p-16",
  lg: "p-24",
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      children,
      variant = "outline",
      interactive = false,
      padding = "md",
      ...props
    },
    ref
  ) => {
    const base = "bg-card text-card-foreground rounded-12 transition-all";

    const surface =
      variant === "elevated"
        ? "border border-border shadow-sm"
        : variant === "outline"
        ? "border border-border"
        : "border border-transparent";

    const hover = interactive
      ? "hover:shadow-md hover:border-border hover:bg-secondary/30"
      : "";

    const focus =
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

    return (
      <div
        ref={ref}
        tabIndex={interactive ? 0 : -1}
        className={cn(base, surface, hover, focus, pad[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

const CardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-12 flex items-start justify-between gap-12", className)} {...props} />
);

const CardTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-title-h5 font-medium tracking-tight", className)} {...props} />
);

const CardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-body-medium text-muted-foreground", className)} {...props} />
);

const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("space-y-12", className)} {...props} />
);

const CardFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-16 flex items-center gap-12", className)} {...props} />
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
