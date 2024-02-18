import { getTranslationFiles } from './getTranslationFiles';

export const getCommittedTranslationFiles = async ({
  defaultLanguage,
}: {
  defaultLanguage: string;
}): Promise<string[] | string> => {
  const command = `git diff --name-only HEAD^ HEAD | grep "${defaultLanguage}.json"`;

  return getTranslationFiles({ command });
};
