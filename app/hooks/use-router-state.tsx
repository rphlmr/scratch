import { useLocation } from "react-router";

type RouterState = Partial<{
  menu: "unlocked" | "locked";
}>;

export function useRouterState(): RouterState {
  const location = useLocation();

  return {
    ...location.state,
  };
}

export function asRouterState(state: RouterState): RouterState {
  return {
    ...state,
  };
}
