import { TranslationItemForOpenAi } from '../type';
import { updatedItemToString } from './updatedItemsToString';

export const generateOpenAiAssistantContent = ({
  updatedTranslationData,
  appContext,
  languagesList,
}: {
  updatedTranslationData: TranslationItemForOpenAi;
  appContext: string | null;
  languagesList: string[];
}) => {
  const content = `
    In the next data translate each updatedTranslation key into  this list of language ISO 639-1 Code:
      - ${languagesList.join('\n- ')}
          
    - Use appContext and screenContext to improve the translation
  
    -localize the translation from the country example :
        - en: football , en-us: soccer
        - en : colour , en-us: color
        - en : behaviour , en-us: behavior
  
    data :
      appContext = ${appContext}
      appKey = ${updatedItemToString(updatedTranslationData)}
  `;

  return content;
};
