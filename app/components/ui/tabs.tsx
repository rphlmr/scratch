"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import type * as React from "react";

import { cn } from "~/utils/cn";

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-2", className)} {...props} />;
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex justify-center items-center bg-muted p-[3px] rounded-lg w-fit h-9 text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex flex-1 justify-center items-center gap-1.5 data-[state=active]:bg-background dark:data-[state=active]:bg-input/30 disabled:opacity-50 data-[state=active]:shadow-sm px-2 py-1 border dark:data-[state=active]:border-input border-transparent focus-visible:border-ring rounded-md focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 h-[calc(100%-1px)] [&_svg:not([class*='size-'])]:size-4 font-medium text-foreground dark:data-[state=active]:text-foreground dark:text-muted-foreground text-sm whitespace-nowrap transition-[color,box-shadow] [&_svg]:pointer-events-none disabled:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
