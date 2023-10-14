import { getCurrentDirectory } from '../generalUtils';
import { processTranslatedFile } from './processTranslatedFile';
import { processUpdatedItem } from './processUpdatedItems';

export const processTranslationsFile = async ({
  changedTranslationFile,
  openAiApiKey,
  otherLanguages,
}: {
  changedTranslationFile: string;
  openAiApiKey: string;
  otherLanguages: string[];
}) => {
  const currentTranslationDirectory = getCurrentDirectory(
    changedTranslationFile,
  );

  console.log('process translated file');

  const updatedTranslationData = processTranslatedFile(changedTranslationFile);

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
    processUpdatedItem({
      updatedItem,
      appContext,
      otherLanguages: otherLanguages,
      openAiApiKey,
      currentTranslationDirectory,
    });
  });
};
