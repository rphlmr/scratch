import { format } from "date-fns/format";
import { type Locale, enUS, fr } from "date-fns/locale";
import type { FlatNamespace, KeyPrefix } from "i18next";
import React from "react";
import { type FallbackNs, type UseTranslationOptions, useTranslation } from "react-i18next";
import type { Language } from "~/locales/config";

const dateFnsMap: Record<Language, Locale> = {
  fr,
  en: enUS,
};

export function useLocalization<
  const Ns extends FlatNamespace | Array<FlatNamespace> | undefined = undefined,
  const KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(ns?: Ns, options?: UseTranslationOptions<KPrefix>) {
  const { t, i18n } = useTranslation(ns, options);
  const language = i18n.language;
  const dateFns = React.useMemo(() => dateFnsMap[language], [language]);
  const locale = React.useMemo(
    () => ({
      dateFns,
      formatDate: (date: Date) => format(date, "PPP", { locale: dateFns }),
    }),
    [dateFns]
  );

  return React.useMemo(
    () => ({
      t,
      language,
      locale,
    }),
    [language, locale, t]
  );
}
