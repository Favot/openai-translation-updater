import { getIsRespondsValid } from '../generalUtils';
import { Responds, TranslationItemWithContext } from '../type';
import { requestOpenIA } from './requestOpenIA';

export const getTranslationsFromOpenAI = async ({
  updatedItem,
  appContext,
  otherLanguage,
  openAiApiKey,
}: {
  updatedItem: TranslationItemWithContext;
  appContext: string | null;
  otherLanguage: string[];
  openAiApiKey: string;
}) => {
  const respondContent = await requestOpenIA({
    updatedItem,
    appContext,
    otherLanguage,
    openAiApiKey,
  });

  if (!respondContent) return;

  const responds: Responds = JSON.parse(
    Buffer.from(respondContent, 'utf-8').toString('utf-8'),
  );

  const isRespondsValid = getIsRespondsValid(responds, otherLanguage);

  if (!isRespondsValid) {
    console.warn(
      'OpenAI did not return the expected content, the content returned was :',
      responds,
    );

    return;
  }

  return responds;
};
