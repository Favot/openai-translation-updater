import { executeCommand } from '../../src/generalUtils'
import {
  baseDirectory,
  homeScreenDirectory,
  templateDirectory,
} from '../config'
import { TemplateName } from '../type'

export const copyTemplateWithContextToDefaultLanguage = ({
  defaultLanguage,
}: {
  defaultLanguage: string
}) => {
  console.log('copy the mainTranslationTemplateWithContext.json to en-GB.json')

  executeCommand(
    `cp ${templateDirectory}/${TemplateName.mainTranslationTemplateWithContext} ${baseDirectory}/${defaultLanguage}.json`,
  )

  console.log('copy the homeScreenTemplateWithContext.json to en-GB.json')

  executeCommand(`
        cp ${templateDirectory}/${TemplateName.homeScreenTemplateWithContext} ${homeScreenDirectory}/${defaultLanguage}.json
    `)
}
