import { useCallback } from "react";
import { href, useParams } from "react-router";
import { asLanguage } from "~/locales/config";

export function useLocalizedHref(): (...args: Parameters<typeof href>) => ReturnType<typeof href> {
  const params = useParams();
  const lang = asLanguage(params.lang);

  return useCallback((path, ...args) => href(path, Object.assign({ lang }, ...args)), [lang]);
}
