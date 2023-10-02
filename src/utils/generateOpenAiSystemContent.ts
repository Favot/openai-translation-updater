export const generateOpenAiSystemContent = () => {
  const systemContent = `You are an assistant how only translate the content and output in JSON format the translation for each updatedTranslation key in this format. Do not add text other than the JSON format.
    {
       language ISO 639-1 Code:[{
         primaryKey: do not translate this key just return the screenName value
         secondaryKey: do not translate this key just return the screenName value
         translationKey: do not translate this key just return the translationKey value 
         updatedTranslation :  translation first updatedTranslation key
       },
       {
         primaryKey: do not translate this key just return the screenName value
         secondaryKey: do not translate this key just return the screenName value
         translationKey: do not translate this key just return the translationKey value 
         updatedTranslation : translation seconde updatedTranslation key
       }
       ...],
     }
     `;

  return systemContent;
};
