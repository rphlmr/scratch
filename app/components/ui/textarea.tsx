import type * as React from "react";

import { cn } from "~/utils/cn";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "focus-visible:inset-ring-[3px] focus-visible:inset-ring-ring/50 flex bg-transparent dark:bg-input/30 disabled:opacity-50 shadow-xs px-3 py-2 border border-input aria-invalid:border-destructive focus-visible:border-ring rounded-md outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 w-full min-h-16 placeholder:text-muted-foreground md:text-sm text-base transition-[color,box-shadow] field-sizing-content disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
