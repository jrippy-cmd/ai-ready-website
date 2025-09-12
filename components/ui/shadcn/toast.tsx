"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

/**
 * Tokenized toaster aligned to Localhowl’s design system.
 * Drop this near the root (e.g., in app/layout.tsx).
 */
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light" // force tokens, no theme provider needed
      position="top-right"
      duration={3500}
      closeButton
      toastOptions={{
        classNames: {
          // Toast surface
          toast: [
            "rounded-10 border border-border shadow-sm",
            "bg-card text-card-foreground",
          ].join(" "),
          // Title & description
          title: "text-body-medium font-medium",
          description: "text-body-medium text-muted-foreground",
          // Buttons
          actionButton:
            "rounded-8 border border-border bg-background px-10 py-6 text-body-medium hover:bg-secondary",
          cancelButton:
            "rounded-8 bg-background px-10 py-6 text-body-medium hover:bg-secondary",
          // Close icon
          closeButton: "opacity-70 hover:opacity-100",
          // Variants use accent colors from tokens
          success:
            "border-border bg-card text-card-foreground data-[type=success]:[--accent:theme(colors.accent-forest)]",
          error:
            "border-border bg-card text-card-foreground data-[type=error]:[--accent:theme(colors.accent-crimson)]",
          warning:
            "border-border bg-card text-card-foreground data-[type=warning]:[--accent:theme(colors.accent-honey)]",
          info:
            "border-border bg-card text-card-foreground data-[type=info]:[--accent:theme(colors.accent-bluetron)]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
