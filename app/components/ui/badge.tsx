import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "~/utils/cn";

const badgeVariants = cva(
  "inline-flex focus-visible:inset-ring-[3px] focus-visible:inset-ring-ring/50 justify-center items-center gap-1 px-2 py-0.5 border aria-invalid:border-destructive focus-visible:border-ring rounded-md aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 w-fit [&>svg]:size-3 overflow-hidden font-medium text-xs whitespace-nowrap transition-[color,box-shadow] [&>svg]:pointer-events-none shrink-0",
  {
    variants: {
      intent: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:inset-ring-destructive/20 dark:focus-visible:inset-ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
