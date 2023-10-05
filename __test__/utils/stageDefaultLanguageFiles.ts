import { executeCommand } from '../../src/generalUtils'
import { baseDirectory, homeScreenDirectory } from '../config'

export const stageDefaultLanguageFiles = ({
  defaultLanguage,
}: {
  defaultLanguage: string
}) => {
  executeCommand(`git add ${baseDirectory}/${defaultLanguage}.json`)
  executeCommand(`git add ${homeScreenDirectory}/${defaultLanguage}.json`)
}
