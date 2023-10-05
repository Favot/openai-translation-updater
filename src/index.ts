import {
  addListOfKeysToRespondContent,
  getCurrentDirectory,
} from './generalUtils';
import {
  getChangedTranslationFiles,
  getTranslationsFromOpenAI,
  processTranslatedFile,
  updateOtherLanguage,
} from './translation';

export const updateTranslationFileOnCommit = async ({
  openAiApiKey,
  defaultLanguage,
  otherLanguage,
}: {
  openAiApiKey: string | undefined;
  defaultLanguage: string;
  otherLanguage: string[];
}) => {
  try {
    if (!openAiApiKey) {
      console.log('OpenAI API key is required');
      return;
    }

    console.log('get changed translation file');

    const changedTranslationFiles = await getChangedTranslationFiles({
      defaultLanguage,
    });

    if (typeof changedTranslationFiles === 'string') {
      console.log(changedTranslationFiles);
      return;
    }

    if (changedTranslationFiles instanceof Error) {
      console.log(changedTranslationFiles.message);
      return;
    }

    changedTranslationFiles.forEach((file) => {
      const currentTranslationDirectory = getCurrentDirectory(file);

      console.log('process translated file');

      const updatedTranslationData = processTranslatedFile(file);

      if (
        !updatedTranslationData ||
        !updatedTranslationData?.updatedItems ||
        updatedTranslationData?.updatedItems.length === 0
      ) {
        console.log(`No translation file updates found`);
        return;
      }

      const appContext = updatedTranslationData.appContext;

      const { updatedItems } = updatedTranslationData;

      updatedItems.forEach(async (updatedItem) => {
        const respondsContent = await getTranslationsFromOpenAI({
          updatedItem,
          appContext,
          otherLanguage,
          openAiApiKey,
        });

        if (!respondsContent) return;

        const updatedRespondContentWithListOfKeys =
          addListOfKeysToRespondContent(
            updatedItem.listOfKeys,
            respondsContent,
          );

        console.log('update other language');
        updateOtherLanguage({
          otherLanguage,
          responds: updatedRespondContentWithListOfKeys,
          translationDirectory: currentTranslationDirectory,
        });
      });
    });
  } catch (error) {
    console.log(error);
    return;
  }
};
