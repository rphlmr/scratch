import React from "react";
import { href, useLocation, useMatches, useParams } from "react-router";
import { type Language, asLanguage } from "~/locales/config";

export const LANG_PARAM_SEGMENT = "/:lang";

export function localizedPathPattern(pathname?: string, lang?: Language | string): RoutePath {
  return (
    pathname
      ? lang
        ? pathname.replace(lang, LANG_PARAM_SEGMENT.replace("/", ""))
        : `${LANG_PARAM_SEGMENT}${pathname}`
      : `${LANG_PARAM_SEGMENT}`
  ) as RoutePath;
}

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

  return localizedPathPattern(currentRoute?.pathname, currentRoute?.params.lang);
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
