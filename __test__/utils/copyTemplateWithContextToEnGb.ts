import { executeCommand } from '../../src/generalUtils'
import {
  LanguageForTest,
  TemplateName,
  baseDirectory,
  homeScreenDirectory,
  templateDirectory,
} from '../type'

export const copyTemplateWithContextToEnGb = () => {
  console.log('copy the mainTranslationTemplateWithContext.json to en-GB.json')

  executeCommand(
    `cp ${templateDirectory}/${TemplateName.mainTranslationTemplateWithContext} ${baseDirectory}/${LanguageForTest.enGB}.json`,
  )

  console.log('copy the homeScreenTemplateWithContext.json to en-GB.json')

  executeCommand(`
        cp ${templateDirectory}/${TemplateName.homeScreenTemplateWithContext} ${homeScreenDirectory}/${LanguageForTest.enGB}.json
    `)
}
