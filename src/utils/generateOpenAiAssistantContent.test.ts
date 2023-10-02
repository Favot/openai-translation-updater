import { generateOpenAiAssistantContent } from "./generateOpenAiAssistantContent";
import { updatedItemsToString } from "./updatedItemsToString";

describe("generateOpenAiAssistantContent", () => {
  it("should generate the correct content with the provided languages and data", () => {
    const mockLanguagesList = ["en", "es", "fr"];
    const mockUpdatedTranslationData = {
      appContext: "Some App Context",
      updatedItems: [
        {
          primaryKey: "screen1",
          secondaryKey: "welcome",
          context: "greeting",
          translationKey: "title",
          updatedTranslation: "Welcome!",
        },
        {
          primaryKey: "screen2",
          secondaryKey: "main",
          context: "info",
          translationKey: "description",
          updatedTranslation: "Main screen",
        },
      ],
    };

    const expectedResult = `
    In the next data translate each updatedTranslation key into  this list of language ISO 639-1 Code:
      - ${mockLanguagesList.join("\n- ")}
          
    - Use appContext and screenContext to improve the translation
  
    -localize the translation from the country example :
        - en: football , en-us: soccer
        - en : colour , en-us: color
        - en : behaviour , en-us: behavior
  
    data :
      appContext = ${mockUpdatedTranslationData.appContext}
      appKey = ${updatedItemsToString(mockUpdatedTranslationData.updatedItems)}
  `;

    const result = generateOpenAiAssistantContent({
      updatedTranslationData: mockUpdatedTranslationData,
      languagesList: mockLanguagesList,
    });

    expect(result).toEqual(expectedResult);
  });
});
