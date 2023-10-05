import OpenAI from 'openai'

import {
  addListOfKeysToRespondContent,
  generateOpenAiAssistantContent,
  generateOpenAiSystemContent,
  getCurrentDirectory,
  getIsRespondsValid,
} from './generalUtils'
import {
  getChangedTranslationFiles,
  processTranslatedFile,
  updateOtherLanguage,
} from './translation'
import { Responds } from './type'

export const updateTranslationFileOnCommit = async ({
  openAiApiKey,
  defaultLanguage,
  otherLanguage,
}: {
  openAiApiKey: string | undefined
  defaultLanguage: string
  otherLanguage: string[]
}) => {
  try {
    if (!openAiApiKey) {
      console.log('OpenAI API key is required')
      return
    }

    console.log('get changed translation file')

    const changedTranslationFiles = await getChangedTranslationFiles({
      defaultLanguage,
    })

    if (typeof changedTranslationFiles === 'string') {
      console.log(changedTranslationFiles)
      return
    }

    if (changedTranslationFiles instanceof Error) {
      console.log(changedTranslationFiles.message)
      return
    }

    changedTranslationFiles.forEach((file) => {
      const currentTranslationDirectory = getCurrentDirectory(file)
      console.log(
        '🚀 ~ file: index.ts:55 ~ changedTranslationFiles.forEach ~ currentTranslationDirectory:',
        currentTranslationDirectory,
      )

      console.log('process translated file')

      const updatedTranslationData = processTranslatedFile(file)

      if (
        !updatedTranslationData ||
        !updatedTranslationData?.updatedItems ||
        updatedTranslationData?.updatedItems.length === 0
      ) {
        console.log(`No translation file updates found`)
        return
      }

      console.log('generate open ai assistant content')

      console.log('generate open ai system content')

      const appContext = updatedTranslationData.appContext

      updatedTranslationData.updatedItems.forEach(async (updatedItem) => {
        console.log(
          `Request open ai to translate the text: "${updatedItem.updatedTranslation}"`,
        )

        const assistantContent = generateOpenAiAssistantContent({
          updatedTranslationData: updatedItem,
          appContext,
          languagesList: otherLanguage,
        })

        const systemContent = generateOpenAiSystemContent()
        const openai = new OpenAI({
          apiKey: openAiApiKey,
        })

        const chatCompletion = await openai.chat.completions.create({
          messages: [
            {
              role: 'system',
              content: systemContent,
            },
            {
              role: 'assistant',
              content: assistantContent,
            },
          ],
          model: 'gpt-4',
        })

        console.log('update response from open ai')
        const respondContent = chatCompletion.choices[0].message.content

        if (!respondContent) {
          console.log('OpenAI dit not return the expected content')
          return
        }

        console.log('Parse respond content')
        const responds: Responds = JSON.parse(
          Buffer.from(respondContent, 'utf-8').toString('utf-8'),
        )

        const isRespondsValid = getIsRespondsValid(responds, otherLanguage)

        if (!isRespondsValid) {
          console.log(
            'OpenAI did not return the expected content, the content returned was :',
            responds,
          )

          return
        }

        const updatedRespondContentWithListOfKeys =
          addListOfKeysToRespondContent(updatedItem.listOfKeys, responds)

        console.log('update other language')
        updateOtherLanguage({
          otherLanguage,
          responds: updatedRespondContentWithListOfKeys,
          translationDirectory: currentTranslationDirectory,
        })
      })
    })
  } catch (error) {
    console.log(error)
    return
  }
}
