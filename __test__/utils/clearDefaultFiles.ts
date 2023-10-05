import { executeCommand } from '../../src/generalUtils'
import { baseDirectory, homeScreenDirectory } from '../config'

export const clearDefaultFiles = async ({
  defaultLanguage,
}: {
  defaultLanguage: string
}) => {
  console.log(`clear ${defaultLanguage} files`)

  executeCommand(`rm ${baseDirectory}/${defaultLanguage}.json`)
  executeCommand(`rm ${homeScreenDirectory}/${defaultLanguage}.json`)
}
