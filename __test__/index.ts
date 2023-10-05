import env from 'dotenv'
import { executeCommand } from '../src/generalUtils'
import { updateTranslationFileOnCommit } from '../src/index'
import { baseDirectory, homeScreenDirectory } from './type'
import {
  clearAllOtherTranslationFilesWithEmptyFile,
  clearEnGbFiles,
  copyTemplateWithContextToEnGb,
  copyTemplateWithTextToEnGB,
  stageEnGbFiles,
} from './utils'
const openAiApiKey = env.config().parsed?.OPENAI_API_KEY

const otherLanguage = ['en-US', 'de-DE', 'fr-FR', 'zh-CN']

clearEnGbFiles()

copyTemplateWithContextToEnGb()

// // clear all the other translation files by emptyTranslationModel to de-DE.json, fr-FR.json, zh-CN.json and en-US.json
// console.log('clear all the other translation files by emptyTranslationModel')
clearAllOtherTranslationFilesWithEmptyFile({
  translationFiles: otherLanguage,
})

// commit the changes
console.log('commit the changes')
executeCommand(`git add ${baseDirectory}/en-GB.json`)
executeCommand(`git add ${homeScreenDirectory}/en-GB.json`)

executeCommand(`git commit -m "test: update en-GB.json"`)

// copy the exampleTranslation.json to en-GB.json

copyTemplateWithTextToEnGB()

// stage the change

stageEnGbFiles()

// run the script
console.log('run the script')
updateTranslationFileOnCommit({
  openAiApiKey,
  defaultLanguage: 'en-GB',
  otherLanguage,
})
