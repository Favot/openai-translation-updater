import { generateOpenAiAssistantContent } from './generateOpenAiAssistantContent'
import { updatedItemToString } from './updatedItemsToString'

describe('generateOpenAiAssistantContent', () => {
  it('should generate the correct content with the provided languages and data', () => {
    const mockLanguagesList = ['en', 'es', 'fr']
    const mockUpdatedTranslationData = {
      appContext: 'Some App Context',
      updatedItems: {
        context: 'greeting',
        updatedTranslation: 'Welcome!',
      },
    }

    const expectedResult = `
    In the next data translate each updatedTranslation key into  this list of language ISO 639-1 Code:
      - ${mockLanguagesList.join('\n- ')}
          
    - Use appContext and screenContext to improve the translation
  
    -localize the translation from the country example :
        - en: football , en-us: soccer
        - en : colour , en-us: color
        - en : behaviour , en-us: behavior
  
    data :
      appContext = ${mockUpdatedTranslationData.appContext}
      appKey = ${updatedItemToString(mockUpdatedTranslationData.updatedItems)}
  `

    const result = generateOpenAiAssistantContent({
      updatedTranslationData: mockUpdatedTranslationData.updatedItems,
      appContext: mockUpdatedTranslationData.appContext,
      languagesList: mockLanguagesList,
    })

    expect(result).toEqual(expectedResult)
  })
})
