export const normalizePath = (path: string) => {
  return path.replaceAll(" ", "-").replaceAll("_", "-");
}