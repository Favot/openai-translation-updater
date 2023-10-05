import { generateOpenIaAssistantContent } from '../generateOpenIaAssistantContent';

describe('generateOpenIaAssistantContent', () => {
  it('should generate the correct content with the provided languages and data', () => {
    const mockLanguagesList = ['en', 'es', 'fr'];
    const mockUpdatedTranslationData = {
      appContext: 'Some App Context',
      updatedItems: {
        itemContext: 'greeting',
        updatedTranslation: 'Welcome!',
      },
    };

    const expectedResult = `
    In the next data translate each updatedTranslation key into  this list of language ISO 639-1 Code:
      - ${mockLanguagesList.join('\n- ')}
          
    - Use appContext and context to improve the translation
  
    -localize the translation from the country example :
        - en: football , en-us: soccer
        - en : colour , en-us: color
        - en : behaviour , en-us: behavior
  
    data :
      appContext = ${mockUpdatedTranslationData.appContext}
      context: ${mockUpdatedTranslationData.updatedItems.itemContext}\n 
      updatedTranslation: ${
        mockUpdatedTranslationData.updatedItems.updatedTranslation
      }\n
  `;

    const result = generateOpenIaAssistantContent({
      updatedTranslationData: mockUpdatedTranslationData.updatedItems,
      appContext: mockUpdatedTranslationData.appContext,
      languagesList: mockLanguagesList,
    });

    expect(result).toEqual(expectedResult);
  });
});
