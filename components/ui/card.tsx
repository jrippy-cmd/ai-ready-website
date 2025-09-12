import * as React from "react";
import { cn } from "@/utils/cn";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "elevated" | "outline" | "ghost";
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
};

const pad = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
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
    const base =
      "bg-card text-card-foreground rounded-10 transition-shadow";

    const surface =
      variant === "elevated"
        ? "shadow-md border border-border/60"
        : variant === "outline"
        ? "border border-border"
        : "border border-transparent";

    const hover = interactive
      ? "hover:shadow-lg hover:border-border"
      : "";

    return (
      <div
        ref={ref}
        className={cn(base, surface, hover, pad[padding], className)}
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
  <div className={cn("mb-3 flex items-start justify-between gap-3", className)} {...props} />
);

const CardTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-title-h5 font-semibold", className)} {...props} />
);

const CardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-muted-foreground", className)} {...props} />
);

const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("space-y-4", className)} {...props} />
);

const CardFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-6 flex items-center gap-3", className)} {...props} />
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
