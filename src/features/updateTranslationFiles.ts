import { executeCommand } from '../generalUtils';
import {
  getUpdatedTranslationFiles,
  processTranslationsFile,
} from '../translation';

export const updateTranslationFiles = async ({
  defaultLanguage,
  otherLanguages,
  openAiApiKey,
}: {
  defaultLanguage: string;
  otherLanguages: string[];
  openAiApiKey: string | undefined;
}) => {
  try {
    if (!openAiApiKey) {
      console.log('OpenAI API key is required');
      return;
    }

    const changedTranslationFiles = await getUpdatedTranslationFiles({
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
      executeCommand(`git add ${changedTranslationFile}`);

      processTranslationsFile({
        changedTranslationFile,
        openAiApiKey,
        otherLanguages,
      });

      executeCommand(`git reset HEAD ${changedTranslationFile}`);
    });
  } catch (error) {
    console.log(error);
    return;
  }
};
