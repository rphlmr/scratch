import { createCookie } from "react-router";
import { unstable_createI18nextMiddleware } from "remix-i18next/middleware";
import { defaultLanguage, defaultNS, languages, ns, resources } from "./config";

export const localeCookie = createCookie("lng", {
  path: "/",
  sameSite: "lax",
  httpOnly: true,
});

export const [i18nextMiddleware, getLocale, getInstance] = unstable_createI18nextMiddleware({
  detection: {
    supportedLanguages: [...languages],
    fallbackLanguage: defaultLanguage,
    order: ["custom"],
    findLocale(request) {
      const locale = new URL(request.url).pathname.split("/").at(1) || null;
      return Promise.resolve(locale);
    },
  },
  i18next: {
    resources,
    ns,
    defaultNS,
    fallbackLng: defaultLanguage,
  },
});
