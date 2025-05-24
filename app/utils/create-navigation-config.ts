import type { CommonResourceKeys } from "~/locales/config";

type RootNavigationKeys = CommonResourceKeys["navigation"];

type SubNavigationKeysOf<RootKey extends keyof RootNavigationKeys> = RootNavigationKeys[RootKey]["item"];

type SubPathOf<RootPath extends RoutePath> = Exclude<Extract<RoutePath, `${RootPath}/${string}`>, RootPath>;

/**
 * Creates a strongly-typed navigation configuration for the application.
 *
 * This utility helps define a navigation structure by grouping routes under root paths,
 * each with an associated icon and a list of sub-navigation items.
 *
 * @template RootNavigationKey - The key for the root navigation section, from your i18n resource.
 * @template RootPath - The root route path for the navigation section.
 * @template SubRoutePath - The sub-route path under the root path.
 *
 * @param nav - An array of navigation section definitions. Each section includes:
 *   - `key`: The i18n key for the root navigation section.
 *   - `path`: The root route path.
 *   - `icon`: The icon component for the section.
 *   - `items`: An array of sub-navigation items, each with:
 *     - `key`: The i18n key for the sub-navigation item.
 *     - `path`: The sub-route path.
 *
 * @returns The navigation configuration array, typed for use throughout the app.
 *
 * @example
 * const navConfig = createNavigationConfig([
 *   {
 *     key: "dashboard",
 *     path: "/dashboard",
 *     icon: DashboardIcon,
 *     items: [
 *       { key: "overview", path: "/dashboard/overview" },
 *       { key: "stats", path: "/dashboard/stats" }
 *     ]
 *   }
 * ]);
 */
export function createNavigationConfig<
  const RootNavigationKey extends keyof RootNavigationKeys,
  const RootPath extends RoutePath,
  const SubRoutePath extends SubPathOf<RootPath>,
>(
  nav: Array<{
    key: RootNavigationKey;
    path: RootPath;
    icon: React.ElementType;
    items: Array<{
      key: keyof SubNavigationKeysOf<RootNavigationKey>;
      path: SubRoutePath;
    }>;
  }>
) {
  return nav;
}
