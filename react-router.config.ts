import type { Config } from "@react-router/dev/config";
import type { href } from "react-router";

declare global {
  export type RoutePath = Readonly<Parameters<typeof href>[0]>;
}

export default {
  ssr: true,
  prerender: ["/"],
  future: {
    unstable_middleware: true,
  },
} satisfies Config;
