import { useLocation } from "react-router";

type RouterState = Partial<{
  menu: "unlocked" | "locked";
}>;

export function useRouterState(): RouterState {
  const { state } = useLocation();

  return Object.assign({}, state);
}

export function asRouterState(state: RouterState): RouterState {
  return Object.assign({}, state);
}
