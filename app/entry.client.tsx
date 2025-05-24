import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Fetch from "i18next-fetch-backend";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { HydratedRouter } from "react-router/dom";
import { getInitialNamespaces } from "remix-i18next/client";
import { defaultLanguage, defaultNS } from "./locales/config";

async function main() {
  await i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(Fetch)
    .init({
      fallbackLng: defaultLanguage,
      ns: getInitialNamespaces(),
      defaultNS,
      detection: { order: ["htmlTag"], caches: [] },
      backend: { loadPath: "/resources/locales/{{lng}}/{{ns}}" },
    });

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <HydratedRouter />
        </StrictMode>
      </I18nextProvider>
    );
  });
}

main().catch((error) => console.error(error));
