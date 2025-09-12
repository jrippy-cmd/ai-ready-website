// lib/app/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cx: Combines class names and merges Tailwind classes safely
 */
export function cx(...inputs: Array<string | false | null | undefined>) {
  return twMerge(clsx(inputs));
}
