"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/utils/cn";

export interface SelectProps extends SelectPrimitive.SelectProps {
  placeholder?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

const Select = ({
  children,
  placeholder,
  triggerClassName,
  contentClassName,
  ...props
}: SelectProps) => (
  <SelectPrimitive.Root {...props}>
    <SelectPrimitive.Trigger
      className={cn(
        // layout
        "inline-flex w-full items-center justify-between gap-8 rounded-8 px-12 py-8",
        // surfaces
        "bg-background text-foreground border border-border shadow-sm",
        // hover nuance
        "hover:bg-secondary",
        // focus ring
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        // disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        // type ramp
        "text-body-medium",
        triggerClassName
      )}
    >
      <SelectPrimitive.Value placeholder={placeholder} />
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="size-16 opacity-80" aria-hidden />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>

    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          "z-50 min-w-[200px] overflow-hidden rounded-10 border border-border",
          "bg-card text-card-foreground shadow-lg",
          // simple open/close motion
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=top]:slide-in-from-bottom-2",
          contentClassName
        )}
      >
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-6">
          <ChevronUp className="size-16 opacity-80" />
        </SelectPrimitive.ScrollUpButton>

        <SelectPrimitive.Viewport className="p-4">
          {children}
        </SelectPrimitive.Viewport>

        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-6">
          <ChevronDown className="size-16 opacity-80" />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
);

const SelectItem = React.forwardRef<
  HTMLDivElement,
  SelectPrimitive.SelectItemProps
>(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-8 px-10 py-8",
      "outline-none text-body-medium",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "data-[highlighted]:bg-secondary data-[highlighted]:text-foreground",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 inline-flex size-16 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="size-16" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";

export { Select, SelectItem };
