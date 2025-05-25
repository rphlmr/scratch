import type { CommonResourceKeys } from "~/locales/config";

type RootNavigationKeys = CommonResourceKeys["navigation"];

type SubNavigationKeysOf<RootKey extends keyof RootNavigationKeys> = RootNavigationKeys[RootKey]["item"];

type SubPathOf<Path extends string, BasePath extends RoutePath = RoutePath> = Extract<BasePath, `${Path}/${string}`>;

export function createNavigationItem<
  const RootNavigationKey extends keyof RootNavigationKeys,
  const ParentPath extends RoutePath,
  const Path extends SubPathOf<ParentPath> = SubPathOf<ParentPath>,
  const Items extends Array<ReturnType<typeof createNavigationItem<RootNavigationKey, Path>>> = any,
>(item: {
  key: keyof SubNavigationKeysOf<RootNavigationKey>;
  path: Path;
  items?: Items;
}) {
  return item;
}

export function createNavigationSection<
  const RootNavigationKey extends keyof RootNavigationKeys,
  const Path extends RoutePath,
  const Items extends Array<ReturnType<typeof createNavigationItem<RootNavigationKey, Path>>>,
>(section: {
  key: RootNavigationKey;
  path: Path;
  icon: React.ElementType;
  items: Items;
}) {
  return section;
}
