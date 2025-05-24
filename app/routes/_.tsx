import { GlobeIcon, MenuIcon, XIcon } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useLocation, useMatches, useNavigate } from "react-router";
import { Flag } from "~/components/flag";
import { Button } from "~/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useLocalizedHref } from "~/hooks/use-localized-href";
import { asRouterState, useRouterState } from "~/hooks/use-router-state";
import { type NamespaceKeys, isSupportedLanguage, languageOptions } from "~/locales/config";
import { cn } from "~/utils/cn";

type NavigationPaths = Array<{
  label: NamespaceKeys<"common">;
  path: RoutePath;
  rightIcon?: React.ReactNode;
}>;

const navigationPaths: NavigationPaths = [
  {
    label: "navigation.home",
    path: "/:lang?",
  },
  {
    label: "navigation.wizard_form",
    path: "/:lang?/wizard-form",
  },
];

const navigationPathsMobile: NavigationPaths = [...navigationPaths];

type SelectLanguageProps = {
  intent?: "desktop" | "mobile";
};

function SelectLanguage({ intent = "desktop" }: SelectLanguageProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const href = useLocalizedHref();
  const location = useLocation();
  const currentRoute = useMatches().find((match) => match.pathname === location.pathname);
  const rawPath = currentRoute
    ? currentRoute.params.lang
      ? currentRoute.pathname.replace(currentRoute.params.lang, ":lang?")
      : `/:lang?${currentRoute.pathname}`
    : "/:lang?";
  const language = languageOptions
    .map((option) => ({
      ...option,
      label: t(option.label),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <Select
      defaultValue={i18n.language}
      onValueChange={(lang) => {
        if (isSupportedLanguage(lang)) {
          i18n.changeLanguage(lang);
          navigate(href(rawPath as RoutePath, { lang }), {
            replace: true,
            preventScrollReset: true,
            state: asRouterState({ menu: "locked" }),
          });
        }
      }}
    >
      {intent === "desktop" && (
        <SelectTrigger asChild>
          <Button intent="secondary" size="icon" aria-label="switch language">
            <GlobeIcon />
          </Button>
        </SelectTrigger>
      )}
      {intent === "mobile" && (
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
      )}

      <SelectContent side="bottom" align="center">
        {language.map((option) => (
          <SelectItem key={option.country} value={option.value}>
            <span className="flex items-center gap-4">
              <Flag country={option.country} title={option.label} />
              <span className={cn("text-primary truncate")}>{option.label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function DesktopHeader() {
  const { t } = useTranslation();
  const href = useLocalizedHref();

  return (
    <nav className={cn("hidden lg:flex items-center gap-2 w-full overflow-hidden")}>
      <NavLink
        to={href("/:lang?")}
        className={cn("w-fit", "focus-visible:inset-ring-2 focus-visible:outline-none focus-visible:inset-ring-ring")}
      >
        {/* logo */}
      </NavLink>

      <div className={cn("flex justify-center items-center overflow-hidden grow")}>
        {navigationPaths.map((item) => (
          <NavLink
            key={item.label}
            to={href(item.path)}
            end
            className={({ isActive }) =>
              cn(
                "inline-flex items-center gap-1 p-3 border-b-2 w-fit h-12.5 overflow-hidden font-lexend text-lg text-center leading-[1.2]",
                isActive
                  ? "border-primary-pressed text-primary-pressed"
                  : "border-transparent text-primary hover:text-primary-hover"
              )
            }
          >
            <span className={cn("truncate")}>{t(item.label)}</span>
            {item.rightIcon}
          </NavLink>
        ))}
      </div>

      <div className={cn("relative flex items-center gap-5")}>
        <SelectLanguage intent="desktop" />
      </div>
    </nav>
  );
}

type MobileMenuProps = {
  onClick: () => void;
  ariaLabel: string;
  icon: React.ReactNode;
};

function MobileMenu({ onClick, ariaLabel, icon }: MobileMenuProps) {
  const href = useLocalizedHref();

  return (
    <div className={cn("flex justify-between items-center w-full h-fit overflow-hidden")}>
      <NavLink to={href("/:lang?")} className={cn("w-fit")}>
        {/* logo */}
      </NavLink>

      <Button onClick={onClick} intent="ghost" aria-label={ariaLabel}>
        {icon}
      </Button>
    </div>
  );
}

function MobileHeader() {
  const { t } = useTranslation();
  const [menuState, setMenuState] = React.useState<"open" | "closed">("closed");
  const location = useLocation();
  const routerState = useRouterState();
  const href = useLocalizedHref();

  React.useEffect(() => {
    if (menuState === "open" && routerState.menu === "unlocked") {
      setMenuState("closed");
    }
  }, [location.pathname, routerState.menu]);

  return (
    <div className={cn("lg:hidden flex w-full")}>
      <MobileMenu ariaLabel="open menu" onClick={() => setMenuState("open")} icon={<MenuIcon />} />

      <div
        className={cn(
          "z-50 absolute inset-0 flex flex-col items-center gap-1 bg-background p-6 w-full h-full overflow-hidden",
          "transition-all duration-300 ease-in-out",
          menuState === "open" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <MobileMenu ariaLabel="close menu" onClick={() => setMenuState("closed")} icon={<XIcon />} />

        <div className={cn("flex flex-col w-full overflow-hidden grow")}>
          <div className={cn("flex flex-col justify-center gap-8 border-b-2 border-b-primary-default w-full grow")}>
            <span className={cn("font-lexend font-extrabold text-primary text-3xl")}>Menu</span>
            <nav className={cn("flex flex-col gap-3")}>
              {navigationPathsMobile.map((item) => (
                <NavLink
                  key={item.label}
                  to={href(item.path)}
                  state={asRouterState({ menu: "unlocked" })}
                  end
                  className={({ isActive }) =>
                    cn(
                      "inline-flex relative items-center gap-1 px-1 py-3 w-fit font-lexend text-2xl text-center",
                      isActive
                        ? "font-semibold text-primary-pressed after:content-[''] after:w-20 after:h-1 after:bg-primary-pressed after:absolute after:bottom-0 after:left-1 after:rounded-full"
                        : "text-primary hover:text-primary-hover"
                    )
                  }
                >
                  <span className={cn("truncate")}>{t(item.label)}</span>
                  {item.rightIcon}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className={cn("pt-6")}>
            <SelectLanguage intent="mobile" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MainLayout() {
  return (
    <div className={cn("relative grid grid-rows-[auto_1fr] size-full overflow-hidden")}>
      <header
        className={cn("z-10 flex items-center gap-1 bg-background p-6 w-full overflow-visible lg:overflow-hidden")}
      >
        <DesktopHeader />
        <MobileHeader />
      </header>
      <main className={cn("grid grid-cols-1 p-6 size-full overflow-x-hidden")}>
        <Outlet />
      </main>
    </div>
  );
}
