import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "~/utils/cn";

const alertVariants = cva(
  "relative items-start gap-y-0.5 has-[>svg]:gap-x-3 grid grid-cols-[0_1fr] has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] px-4 py-3 border rounded-lg w-full [&>svg]:size-4 [&>svg]:text-current text-sm [&>svg]:translate-y-0.5",
  {
    variants: {
      intent: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  }
);

function Alert({ className, intent, ...props }: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return <div data-slot="alert" role="alert" className={cn(alertVariants({ intent }), className)} {...props} />;
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn("col-start-2 min-h-4 font-medium line-clamp-1 tracking-tight", className)}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "justify-items-start gap-1 grid col-start-2 text-muted-foreground text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
