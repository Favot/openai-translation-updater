import { executeCommand } from '../../src/generalUtils'
import {
  baseDirectory,
  homeScreenDirectory,
  templateDirectory,
} from '../config'
import { TemplateName } from '../type'

export const copyTemplateWithTextToDefaultLanguageFile = ({
  defaultLanguage,
}: {
  defaultLanguage: string
}) => {
  console.log(
    `copy the mainTranslationTemplateWithText.json to ${baseDirectory}/${defaultLanguage}.json`,
  )
  executeCommand(
    `cp ${templateDirectory}/${TemplateName.mainTranslationTemplateWithText} ${baseDirectory}/${defaultLanguage}.json`,
  )

  console.log(
    `copy the homeScreenTemplateWithContext.json to ${homeScreenDirectory}/${defaultLanguage}.json`,
  )

  executeCommand(`
        cp ${templateDirectory}/${TemplateName.homeScreenTemplateWithText} ${homeScreenDirectory}/${defaultLanguage}.json
    `)
}
