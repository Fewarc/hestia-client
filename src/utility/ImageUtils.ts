export const getImageExtension = (filePath: string): string => {
  return filePath.slice(filePath.lastIndexOf('.'));
}