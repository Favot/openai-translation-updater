import { executeCommand } from './executeCommand'

export const getFileContent = (gitRef: string, filePath: string) => {
  const command = `git show ${gitRef}:${filePath}`

  const output = executeCommand(command)

  return output ? JSON.parse(output) : {}
}
