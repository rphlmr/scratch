import * as React from "react";

const MOBILE_BREAKPOINT = "(max-width: 768px)"; // lower than md

function subscribe(callback: (event: MediaQueryListEvent) => void) {
  window.matchMedia(MOBILE_BREAKPOINT).addEventListener("change", callback);

  return () => {
    window.matchMedia(MOBILE_BREAKPOINT).removeEventListener("change", callback);
  };
}

/**
 * Check if the app should use the mobile app layout
 *
 * @returns true if the app is installed as a PWA
 */
export function useIsMobile() {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOBILE_BREAKPOINT).matches, // How to get the value on the client
    () => false // How to get the value on the server
  );
}
