import env from 'dotenv'
import { updateTranslationFileOnCommit } from '../src/index'
import { executeCommand } from '../src/utils/executeCommand'

const openAiApiKey = env.config().parsed?.OPENAI_API_KEY
const translationDirectory = './__test__/localization/translations'
const otherLanguage = ['en-US', 'de-DE', 'fr-FR', 'zh-CN']

// Remove en-GB.json from translations folder
console.log('Remove en-GB.json from translations folder')
executeCommand(`rm ${translationDirectory}/en-GB.json`)

// copy the emptyTranslationModel.json to en-GB.json
console.log('copy the emptyTranslationModel.json to en-GB.json')
executeCommand(
  `cp ${translationDirectory}/translationTemplateWithContext.json ${translationDirectory}/en-GB.json`,
)

// clear all the other translation files by emptyTranslationModel to de-DE.json, fr-FR.json, zh-CN.json and en-US.json
console.log('clear all the other translation files by emptyTranslationModel')
executeCommand(
  `cp ${translationDirectory}/translationTemplateWithoutContext.json ${translationDirectory}/de-DE.json`,
)
executeCommand(
  `cp ${translationDirectory}/translationTemplateWithoutContext.json ${translationDirectory}/fr-FR.json`,
)
executeCommand(
  `cp ${translationDirectory}/translationTemplateWithoutContext.json ${translationDirectory}/zh-CN.json`,
)
executeCommand(
  `cp ${translationDirectory}/translationTemplateWithoutContext.json ${translationDirectory}/en-US.json`,
)

// commit the changes
console.log('commit the changes')
executeCommand(`git add ${translationDirectory}/en-GB.json`)

executeCommand(`git commit -m "test: update en-GB.json"`)

// copy the exampleTranslation.json to en-GB.json
console.log('copy the exampleTranslation.json to en-GB.json')
executeCommand(
  `cp ${translationDirectory}/translationTemplateWithText.json ${translationDirectory}/en-GB.json`,
)

// stage the change
console.log('stage the change')
executeCommand(`git add ${translationDirectory}/en-GB.json`)

// run the script
console.log('run the script')
updateTranslationFileOnCommit({
  openAiApiKey,
  translationDirectory,
  defaultLanguage: 'en-GB',
  otherLanguage,
})
