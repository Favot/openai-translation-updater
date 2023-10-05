import { executeCommand } from '../../src/generalUtils'
import { LanguageForTest, baseDirectory, homeScreenDirectory } from '../type'

export const clearEnGbFiles = async () => {
  console.log('clear en-gb files')

  executeCommand(`rm ${baseDirectory}/${LanguageForTest.enGB}.json`)
  executeCommand(`rm ${homeScreenDirectory}/${LanguageForTest.enGB}.json`)
}
