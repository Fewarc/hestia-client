// TODO: Observe changes in tailwind.config.js[theme.screens] 
export const screenSizes = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

export const getBreakpoint = () => {
  const screenSizesValues = Object.values(screenSizes).filter(size => size <= window.innerWidth);
  const pixelBreakpoint = Math.max(...screenSizesValues);
  if (!screenSizesValues.length) return Math.min(...Object.values(screenSizes));
  return Object.keys(screenSizes).filter(key => screenSizes[key as keyof typeof screenSizes] === pixelBreakpoint)[0];
}

export const isBreakpoint = (breakpoint: keyof typeof screenSizes): boolean => {
  return screenSizes[breakpoint] > window.innerWidth;
}
