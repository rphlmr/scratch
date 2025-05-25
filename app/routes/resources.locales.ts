import { cacheHeader } from "pretty-cache-header";
import { data } from "react-router";
import { z } from "zod";
import { type Language, type Namespace, resources, supportedLanguages } from "~/locales/config";
import type { Route } from "./resources/+types/locales";

export async function loader({ params }: Route.LoaderArgs) {
  const parsedLang = z
    .string()
    .refine((lang: any): lang is Language => supportedLanguages.includes(lang))
    .safeParse(params.lang);

  if (parsedLang.error) {
    return data({ error: parsedLang.error }, { status: 400 });
  }

  const lang = parsedLang.data;

  const namespaces = resources[lang];

  const parsedNs = z
    .string()
    .refine((ns): ns is Namespace => {
      return Object.keys(resources[lang]).includes(ns);
    })
    .safeParse(params.ns);

  if (parsedNs.error) {
    return data({ error: parsedNs.error }, { status: 400 });
  }

  const ns = parsedNs.data;

  const headers = new Headers();

  // On production, we want to add cache headers to the response
  if (process.env.NODE_ENV === "production") {
    headers.set(
      "Cache-Control",
      cacheHeader({
        maxAge: "5m", // Cache in the browser for 5 minutes
        sMaxage: "1d", // Cache in the CDN for 1 day
        // Serve stale content while revalidating for 7 days
        staleWhileRevalidate: "7d",
        // Serve stale content if there's an error for 7 days
        staleIfError: "7d",
      })
    );
  }

  return data(namespaces[ns], { headers });
}
