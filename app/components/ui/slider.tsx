"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "~/utils/cn";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max]
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex data-[orientation=vertical]:flex-col items-center data-[disabled]:opacity-50 w-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 touch-none select-none",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative bg-muted rounded-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1.5 data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:h-full overflow-hidden grow"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn("absolute bg-primary data-[orientation=vertical]:w-full data-[orientation=horizontal]:h-full")}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="block bg-background disabled:opacity-50 shadow-sm border border-primary rounded-full focus-visible:outline-hidden ring-ring/50 hover:ring-4 focus-visible:ring-4 size-4 transition-[color,box-shadow] disabled:pointer-events-none shrink-0"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
