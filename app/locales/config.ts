import { format } from "date-fns/format";
import { type Locale, enUS as enLocale, fr as frLocale } from "date-fns/locale";
import type { FlatNamespace, KeyPrefix } from "i18next";
import { useMemo } from "react";
import { type FallbackNs, type UseTranslationOptions, useTranslation } from "react-i18next";
import type { Country } from "react-phone-number-input";
import { useLocation, useMatches } from "react-router";
import en from "~/locales/en";
import fr from "~/locales/fr";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: DefaultNS;
    resources: ResourceKeys;
  }

  interface i18n {
    language: Language;
  }
}

export const languages = ["en", "fr"] as const;

export type Language = (typeof languages)[number];

type LanguageOption = {
  country: Country;
  value: Language;
  label: NamespaceKeys<"common">;
};

export const languageOptions: Array<LanguageOption> = [
  {
    value: "fr",
    label: "language.french",
    country: "FR",
  },
  {
    value: "en",
    label: "language.english",
    country: "GB",
  },
];

const dateFnsMap: Record<Language, Locale> = {
  fr: frLocale,
  en: enLocale,
};

export function useLocalization<
  const Ns extends FlatNamespace | Array<FlatNamespace> | undefined = undefined,
  const KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(ns?: Ns, options?: UseTranslationOptions<KPrefix>) {
  const { t, i18n } = useTranslation(ns, options);
  const language = i18n.language;
  const dateFns = useMemo(() => dateFnsMap[language], [language]);
  const locale = useMemo(
    () => ({
      dateFns,
      formatDate: (date: Date) => format(date, "PPP", { locale: dateFns }),
    }),
    [dateFns]
  );

  return useMemo(
    () => ({
      t,
      language,
      locale,
    }),
    [language, locale, t]
  );
}

export const defaultLanguage = "en" satisfies Language;

export const ns = Object.keys(fr) as Array<keyof typeof fr>;

export type Namespace = (typeof ns)[number];

export const defaultNS = "common" satisfies Namespace;

export type DefaultNS = typeof defaultNS;

export const resources = {
  en,
  fr,
} as const;

export type ResourceKeys = (typeof resources)[typeof defaultLanguage];

type RecursiveDotNotation<T> = T extends Record<string, any>
  ? {
      [K in keyof T]: T[K] extends Record<string, any>
        ? T[K] extends readonly any[] // Check if T[K] is an array
          ? K & string // If it's an array, treat it as a leaf node (use the key itself)
          : `${K & string}.${RecursiveDotNotation<T[K]>}` // Otherwise, if it's an object (and not an array), recurse
        : K & string; // If T[K] is not a Record (e.g., string, number, boolean), treat as a leaf
    }[keyof T]
  : string;

export type NamespaceKeys<T extends keyof ResourceKeys> = RecursiveDotNotation<ResourceKeys[T]>;

export function isSupportedLanguage(lang: unknown): lang is Language {
  return languages.includes(lang as Language);
}

export function asLanguage(lang: unknown): Language | undefined {
  if (isSupportedLanguage(lang)) {
    return lang;
  }
}

type RootNavigationKeys = ResourceKeys["common"]["navigation"];

type SubNavigationKeysOf<RootKey extends keyof RootNavigationKeys> = RootNavigationKeys[RootKey]["item"];

type SubPathOf<RootPath extends RoutePath> = Exclude<Extract<RoutePath, `${RootPath}/${string}`>, RootPath>;

export function defineNav<
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

const LOCALE_SEGMENT = ":lang?";

/**
 * Get the current raw path, replacing the active language parameter with its route segment
 *
 */
export function useCurrentRawPath() {
  const location = useLocation();
  const currentRoute = useMatches().find((match) => match.pathname === location.pathname);

  return useMemo(
    () =>
      (currentRoute?.pathname
        ? currentRoute.params.lang
          ? currentRoute.pathname.replace(currentRoute.params.lang, LOCALE_SEGMENT)
          : `/${LOCALE_SEGMENT}${currentRoute.pathname}`
        : `/${LOCALE_SEGMENT}`) as RoutePath,
    [currentRoute?.pathname, currentRoute?.params.lang]
  );
}
