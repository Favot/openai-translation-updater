import { executeCommand } from '../../src/generalUtils'
import {
  LanguageForTest,
  TemplateName,
  baseDirectory,
  homeScreenDirectory,
  templateDirectory,
} from '../type'

export const copyTemplateWithTextToEnGB = () => {
  console.log('copy the mainTranslationTemplateWithContext.json to en-GB.json')

  executeCommand(
    `cp ${templateDirectory}/${TemplateName.mainTranslationTemplateWithText} ${baseDirectory}/${LanguageForTest.enGB}.json`,
  )

  console.log('copy the homeScreenTemplateWithContext.json to en-GB.json')

  executeCommand(`
        cp ${templateDirectory}/${TemplateName.homeScreenTemplateWithText} ${homeScreenDirectory}/${LanguageForTest.enGB}.json
    `)
}
