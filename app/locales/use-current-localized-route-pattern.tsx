import { useLocation, useMatches } from "react-router";

const LANG_PARAM_SEGMENT = ":lang?";

/**
 * Returns the current route path pattern, replacing the active **localized language segment** in the pathname
 * with its route parameter (e.g., ":lang?"), matching how localized routes are declared in React Router.
 *
 * For example, if the current path is `/en/dashboard`, this will return `/:lang?/dashboard`.
 *
 * Only the language segment is parameterized; other route parameters are not affected.
 * This hook is specifically for routes that include a language segment.
 *
 */
export function useCurrentLocalizedPathPattern(): RoutePath {
  const location = useLocation();
  const currentRoute = useMatches().find((match) => match.pathname === location.pathname);

  return (
    currentRoute?.pathname
      ? currentRoute.params.lang
        ? currentRoute.pathname.replace(currentRoute.params.lang, LANG_PARAM_SEGMENT)
        : `/${LANG_PARAM_SEGMENT}${currentRoute.pathname}`
      : `/${LANG_PARAM_SEGMENT}`
  ) as RoutePath;
}
