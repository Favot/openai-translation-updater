import { updateOtherLanguage } from '.';
import { addListOfKeysToRespondContent } from '../generalUtils';
import { TranslationItemWithContext } from '../type';
import { getTranslationsFromOpenAI } from './getTranslationsFromOpenAI';

export const processUpdatedItem = async ({
  updatedItem,
  appContext,
  otherLanguages,
  openAiApiKey,
  currentTranslationDirectory,
}: {
  updatedItem: TranslationItemWithContext;
  appContext: string | null;
  otherLanguages: string[];
  openAiApiKey: string;
  currentTranslationDirectory: string;
}) => {
  const respondsContent = await getTranslationsFromOpenAI({
    updatedItem,
    appContext,
    otherLanguages,
    openAiApiKey,
  });

  if (!respondsContent) return;

  const updatedRespondContentWithListOfKeys = addListOfKeysToRespondContent({
    listOfKeys: updatedItem.listOfKeys,
    responds: respondsContent,
  });

  console.log('update other language');
  updateOtherLanguage({
    otherLanguages,
    responds: updatedRespondContentWithListOfKeys,
    translationDirectory: currentTranslationDirectory,
  });
};
