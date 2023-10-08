import { TranslationItemForOpenAi } from '../type';

export const generateOpenIaAssistantContent = ({
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
          
    - Use appContext and context to improve the translation
  
    -localize the translation from the country example :
        - en: football , en-us: soccer
        - en : colour , en-us: color
        - en : behaviour , en-us: behavior
  
    data :
      appContext = ${appContext}
      context: ${updatedTranslationData.itemContext}\n 
      updatedTranslation: ${updatedTranslationData.updatedTranslation}\n
  `;

  return content;
};
