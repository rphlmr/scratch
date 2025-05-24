import { ChevronRight, GlobeIcon, TypeOutlineIcon } from "lucide-react";
import { ChevronsUpDown } from "lucide-react";
import type React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useNavigate } from "react-router";
import { Flag } from "~/components/flag";
import { Button } from "~/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "~/components/ui/select";
import { asRouterState } from "~/hooks/use-router-state";
import { type CommonResourceKeys, type CountryCode, type Language, isSupportedLanguage } from "~/locales/config";
import { useLocalizedHref } from "~/locales/use-localized-href";
import { cn } from "~/utils/cn";

import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Separator } from "~/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "~/components/ui/sidebar";
import { useCurrentLocalizedRoutePattern } from "~/locales/use-current-localized-route-pattern";
import { useLocalization } from "~/locales/use-localization";
import { createNavigationConfig } from "~/utils/create-navigation-config";

type LanguageOption = {
  country: CountryCode;
  value: Language;
  label: keyof CommonResourceKeys["language"];
};

export const languageOptions: Array<LanguageOption> = [
  {
    value: "fr",
    label: "french",
    country: "FR",
  },
  {
    value: "en",
    label: "english",
    country: "GB",
  },
];

function SelectLanguage() {
  const { t, i18n } = useTranslation("common", { keyPrefix: "language" });
  const navigate = useNavigate();
  const href = useLocalizedHref();
  const currentRawPath = useCurrentLocalizedRoutePattern();
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
          navigate(href(currentRawPath, { lang }), {
            replace: true,
            preventScrollReset: true,
            state: asRouterState({ menu: "locked" }),
          });
        }
      }}
    >
      <SelectTrigger asChild>
        <Button intent="ghost" size="icon" className="size-7" aria-label="switch language">
          <GlobeIcon />
        </Button>
      </SelectTrigger>

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

const navigationConfig = createNavigationConfig([
  {
    key: "forms",
    path: "/:lang?/forms",
    icon: TypeOutlineIcon,
    items: [
      {
        key: "step_by_step",
        path: "/:lang?/forms/step-by-step",
      },
    ],
  },
]);

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isMobile } = useSidebar();
  const { t } = useLocalization();
  const href = useLocalizedHref();
  const currentRawPath = useCurrentLocalizedRoutePattern();

  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <img
                    src="https://avatars.githubusercontent.com/u/20722140?s=400&u=274a794dbb372ee5ce672a58b55e7248ef0f2c9b&v=4"
                    className="flex justify-center items-center bg-sidebar-primary rounded-lg size-8 aspect-square text-sidebar-primary-foreground"
                    alt="@rphlmr"
                  />
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium">@rphlmr's scratchpad</span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="rounded-lg w-[--radix-dropdown-menu-trigger-width] min-w-56"
                align="start"
                side={isMobile ? "bottom" : "right"}
                sideOffset={4}
              >
                <DropdownMenuItem asChild>
                  <Link to="https://github.com/rphlmr/scratch" target="_blank">
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <title>GitHub</title>
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    <span className="ml-2">{t("action.view_on_github")}</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navigationConfig.map((group) => (
              <Collapsible
                key={group.key}
                asChild
                defaultOpen={currentRawPath.includes(group.path)}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={t(`navigation.${group.key}.title`)}
                      isActive={group.path === currentRawPath}
                    >
                      {group.icon && <group.icon />}
                      <span>{t(`navigation.${group.key}.title`)}</span>
                      <ChevronRight className="ml-auto group-data-[state=open]/collapsible:rotate-90 transition-transform duration-200" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {group.items?.map((item) => (
                        <SidebarMenuSubItem key={item.key}>
                          <SidebarMenuSubButton asChild isActive={item.path === currentRawPath}>
                            <NavLink to={href(item.path)}>{t(`navigation.${group.key}.item.${item.key}`)}</NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

export default function MainLayout() {
  const { t } = useLocalization();
  const href = useLocalizedHref();
  const currentRawPath = useCurrentLocalizedRoutePattern();
  const currentGroup = navigationConfig.find((group) => currentRawPath.includes(group.path));
  const currentGroupItem = currentGroup?.items?.find((item) => item.path === currentRawPath);
  const hasBreadcrumb = currentGroup != null && currentGroupItem != null;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center gap-2 px-4 h-16 shrink-0">
          <SidebarTrigger className="-ml-1" />
          <SelectLanguage />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <NavLink to={href(currentGroup?.path || "/:lang?")}>
                    {t(`navigation.${currentGroup?.key}.title`, { defaultValue: t("welcome") })}
                  </NavLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {hasBreadcrumb ? (
                <>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{t(`navigation.${currentGroup.key}.item.${currentGroupItem.key}`)}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              ) : null}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex flex-col flex-1 gap-4 p-4 pt-0">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
