// components/ui/typography.tsx
import { cn } from "@/utils/cn";

export function H1({ className, ...p }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn("text-title-h1 text-accent-black", className)} {...p} />;
}
export function H2({ className, ...p }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-title-h2 text-accent-black", className)} {...p} />;
}
export function H3({ className, ...p }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-title-h3 text-accent-black", className)} {...p} />;
}
export function Text({ className, ...p }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-body-large text-accent-black", className)} {...p} />;
}
export function Muted({ className, ...p }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-body-medium text-black-alpha-64", className)} {...p} />;
}
export function Label({ className, ...p }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("text-label-medium text-accent-black", className)} {...p} />;
}
