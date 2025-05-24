import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "~/utils/cn";

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn("group/navigation-menu relative flex flex-1 justify-center items-center max-w-max", className)}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("group flex flex-1 justify-center items-center gap-1 list-none", className)}
      {...props}
    />
  );
}

function NavigationMenuItem({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" className={cn("relative", className)} {...props} />
  );
}

const navigationMenuTriggerStyle = cva(
  "group inline-flex focus-visible:inset-ring-[3px] focus-visible:inset-ring-ring/50 justify-center items-center bg-background data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent hover:bg-accent focus:bg-accent disabled:opacity-50 px-4 py-2 rounded-md outline-none focus-visible:outline-1 w-max h-9 font-medium text-sm transition-[color,box-shadow] data-[state=open]:text-accent-foreground hover:text-accent-foreground focus:text-accent-foreground disabled:pointer-events-none"
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="top-[1px] relative ml-1 size-3 group-data-[state=open]:rotate-180 transition duration-300"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "top-0 data-[motion=from-end]:slide-in-from-right-52 data-[motion=to-end]:slide-out-to-right-52 left-0 data-[motion=to-start]:slide-out-to-left-52 md:absolute data-[motion=from-start]:slide-in-from-left-52 p-2 pr-2.5 w-full md:w-auto data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className
      )}
      {...props}
    />
  );
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className={cn("top-full left-0 z-50 isolate absolute flex justify-center")}>
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "relative bg-popover shadow mt-1.5 border rounded-md w-full md:w-[var(--radix-navigation-menu-viewport-width)] h-[var(--radix-navigation-menu-viewport-height)] overflow-hidden text-popover-foreground origin-top-center data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90",
          className
        )}
        {...props}
      />
    </div>
  );
}

function NavigationMenuLink({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "focus-visible:inset-ring-[3px] focus-visible:inset-ring-ring/50 flex flex-col gap-1 data-[active=true]:bg-accent/50 data-[active=true]:hover:bg-accent data-[active=true]:focus:bg-accent hover:bg-accent focus:bg-accent p-2 rounded-sm outline-none focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground text-sm transition-all data-[active=true]:text-accent-foreground hover:text-accent-foreground focus:text-accent-foreground",
        className
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "top-full z-[1] flex justify-center items-end h-1.5 overflow-hidden data-[state=hidden]:animate-out data-[state=visible]:animate-in data-[state=hidden]:fade-out data-[state=visible]:fade-in",
        className
      )}
      {...props}
    >
      <div className="top-[60%] relative shadow-md bg-border rounded-tl-sm w-2 h-2 rotate-45" />
    </NavigationMenuPrimitive.Indicator>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};
