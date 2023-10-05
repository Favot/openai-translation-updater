export const getCurrentDirectory = (filePath: string) => {
  const pathArray = filePath.split('/')
  pathArray.pop()
  return pathArray.join('/')
}
