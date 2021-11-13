import { useEffect, useState } from "react";
import { isBreakpoint, screenSizes } from "./UserInterfaceUtils";

export const useBreakpoint = (breakpoint: keyof typeof screenSizes): boolean => {
  const [matches, setMatches] = useState<boolean>(isBreakpoint(breakpoint));

  useEffect(() => {
    const handleResize = () => setMatches(isBreakpoint(breakpoint));

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [matches, breakpoint]);

  return matches;
};

export const usePixelBreakpoint = (pixelBreakpoint: number): boolean => {
  const [matches, setMatches] = useState<boolean>(window.innerWidth > pixelBreakpoint);

  useEffect(() => {
    const handleResize = () => setMatches(window.innerWidth > pixelBreakpoint);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [matches, pixelBreakpoint]);

  return matches;
}