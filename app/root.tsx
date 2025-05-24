import { useTranslation } from "react-i18next";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, data, isRouteErrorResponse } from "react-router";
import { useChangeLanguage } from "remix-i18next/react";

import { getLocale, i18nextMiddleware, localeCookie } from "~/locales/middleware";
import type { Route } from "./+types/root";
import "~/app.css";

export const unstable_middleware = [i18nextMiddleware];

export async function loader({ context }: Route.LoaderArgs) {
  const locale = getLocale(context);
  return data({ locale }, { headers: { "Set-Cookie": await localeCookie.serialize(locale) } });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  return (
    <html lang={i18n.language} dir={i18n.dir(i18n.language)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <body className="relative bg-background w-dvw h-dvh overflow-x-hidden overscroll-none font-inter">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  useChangeLanguage(loaderData.locale);
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-auto p-4 pt-16 container">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="p-4 w-full overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
