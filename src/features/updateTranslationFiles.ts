import { executeCommand } from '../generalUtils';
import { processTranslationsFile } from '../translation';
import { getUpdatedTranslationFiles } from '../translation/getUpdatedTranslationFiles';

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

    // find all the changed default language files

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

    // update translation
    changedTranslationFiles.forEach(async (changedTranslationFile) => {
      // temporary stage current default language file

      executeCommand(`git add ${changedTranslationFile}`);

      processTranslationsFile({
        changedTranslationFile,
        openAiApiKey,
        otherLanguages,
      });

      // un-staged current default language file
      executeCommand(`git reset HEAD ${changedTranslationFile}`);
    });
  } catch (error) {
    console.log(error);
    return;
  }
};
