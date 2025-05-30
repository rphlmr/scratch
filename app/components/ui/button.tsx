import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "~/utils/cn";

const button = cva(
  "inline-flex aria-invalid:inset-ring-destructive/20 focus-visible:inset-ring-[3px] focus-visible:inset-ring-ring/50 justify-center items-center gap-2 disabled:opacity-50 aria-invalid:border-destructive focus-visible:border-ring rounded-md outline-none dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 font-medium text-sm whitespace-nowrap transition-all cursor-pointer [&_svg]:pointer-events-none disabled:pointer-events-none shrink-0 [&_svg]:shrink-0",
  {
    variants: {
      intent: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:inset-ring-destructive/20 dark:focus-visible:inset-ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      intent: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  intent,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof button> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return <Comp data-slot="button" className={cn(button({ intent, size, className }))} {...props} />;
}

export { Button, button };
