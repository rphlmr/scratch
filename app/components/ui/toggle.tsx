import * as TogglePrimitive from "@radix-ui/react-toggle";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "~/utils/cn";

const toggleVariants = cva(
  "inline-flex focus-visible:inset-ring-[3px] focus-visible:inset-ring-ring/50 justify-center items-center gap-2 data-[state=on]:bg-accent hover:bg-muted disabled:opacity-50 aria-invalid:border-destructive focus-visible:border-ring rounded-md outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 font-medium hover:text-muted-foreground text-sm whitespace-nowrap transition-[color,box-shadow] data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none disabled:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      intent: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      intent: "default",
      size: "default",
    },
  }
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root data-slot="toggle" className={cn(toggleVariants({ variant, size, className }))} {...props} />
  );
}

export { Toggle, toggleVariants };
