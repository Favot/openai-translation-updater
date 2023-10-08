import {
  getStagedTranslationFiles,
  processTranslationsFile,
} from '../translation';

export const updateTranslationFilesOnCommit = async ({
  openAiApiKey,
  defaultLanguage,
  otherLanguages: otherLanguage,
}: {
  openAiApiKey: string | undefined;
  defaultLanguage: string;
  otherLanguages: string[];
}) => {
  try {
    if (!openAiApiKey) {
      console.log('OpenAI API key is required');
      return;
    }

    console.log('get changed translation file');

    const changedTranslationFiles = await getStagedTranslationFiles({
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

    changedTranslationFiles.forEach(async (changedTranslationFile) => {
      processTranslationsFile({
        changedTranslationFile,
        openAiApiKey,
        otherLanguages: otherLanguage,
      });
    });
  } catch (error) {
    console.log(error);
    return;
  }
};
