import type { FlatNamespace as I18nFlatNamespace, Namespace as I18nNamespace } from "i18next";
import type { Country } from "react-phone-number-input";

import en from "~/locales/translations/en";
import fr from "~/locales/translations/fr";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: DefaultNS;
    resources: ResourceKeys;
  }

  interface i18n {
    language: Language;
  }
}

export type Namespace = I18nNamespace;

export type FlatNamespace = I18nFlatNamespace;

export type CountryCode = Country;

export const supportedLanguages = ["en", "fr"] as const;

export type Language = (typeof supportedLanguages)[number];

export const fallbackLanguage = "en" satisfies Language;

export const ns = Object.keys(fr) as ReadonlyArray<keyof typeof fr>;

export const defaultNS = "common" satisfies Namespace;

export type DefaultNS = typeof defaultNS;

export const resources = {
  en,
  fr,
} as const;

export type ResourceKeys = (typeof resources)[typeof fallbackLanguage];

export type CommonResourceKeys = ResourceKeys[DefaultNS];

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
  return supportedLanguages.includes(lang as Language);
}

export function asLanguage(lang: unknown): Language | undefined {
  if (isSupportedLanguage(lang)) {
    return lang;
  }
}
