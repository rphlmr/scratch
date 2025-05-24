import { type VariantProps, cva } from "class-variance-authority";
import type { EmbeddedFlagProps, FlagProps as Props } from "react-phone-number-input";
import Flags from "react-phone-number-input/flags";
import { cn } from "~/utils/cn";

export const flag = cva("flex rounded-xs [&_svg:not([class*='size-'])]:size-full overflow-hidden", {
  variants: {
    size: {
      default: "w-6 h-4",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type FlagProps = EmbeddedFlagProps & Pick<Props, "country"> & VariantProps<typeof flag>;

export function Flag({ country, title, size }: FlagProps) {
  const FlagIcon = Flags[country];

  if (!FlagIcon) {
    return null;
  }

  return (
    <span className={cn(flag({ size }))}>
      <FlagIcon title={title} />
    </span>
  );
}
