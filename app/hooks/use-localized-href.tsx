import { useCallback } from "react";
import { href, useParams } from "react-router";
import { asLanguage } from "~/locales/config";

type LocalizedHrefFn = (...args: Parameters<typeof href>) => ReturnType<typeof href>;

export const localizedHref: (lang: unknown) => LocalizedHrefFn =
  (lang) =>
  (path, ...args) =>
    href(path, Object.assign({ lang: asLanguage(lang) }, ...args));

export function useLocalizedHref(): LocalizedHrefFn {
  const params = useParams();
  const lang = params.lang;

  // biome-ignore lint/correctness/useExhaustiveDependencies: wrong assumption
  return useCallback(localizedHref(lang), [lang]);
}
