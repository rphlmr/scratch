import React from "react";
import { href, useLocation, useMatches, useParams } from "react-router";
import { asLanguage } from "~/locales/config";

export const LANG_PARAM_SEGMENT = "/:lang";

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
        ? currentRoute.pathname.replace(currentRoute.params.lang, LANG_PARAM_SEGMENT.replace("/", ""))
        : `${LANG_PARAM_SEGMENT}${currentRoute.pathname}`
      : `${LANG_PARAM_SEGMENT}`
  ) as RoutePath;
}

type LocalizedHrefFn = (...args: Parameters<typeof href>) => ReturnType<typeof href>;

export const localizedHref: (lang: unknown) => LocalizedHrefFn =
  (lang) =>
  (pattern, ...args) => {
    const params = Object.assign({ lang: asLanguage(lang) }, ...args);

    const path = asLanguage(params.lang) ? pattern : (pattern.replace(LANG_PARAM_SEGMENT, "") as RoutePath);

    return href(path, params);
  };

export function useLocalizedHref(): LocalizedHrefFn {
  const params = useParams();
  const lang = params.lang;

  return React.useMemo(() => localizedHref(lang), [lang]);
}
