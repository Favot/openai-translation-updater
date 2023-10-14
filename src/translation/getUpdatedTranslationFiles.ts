import { getTranslationFiles } from './getTranslationFiles';

export const getUpdatedTranslationFiles = async ({
  defaultLanguage,
}: {
  defaultLanguage: string;
}) => {
  const command = `git diff --name-only | grep ${defaultLanguage}.json`;

  const updatedTranslationFiles = getTranslationFiles({ command });

  return updatedTranslationFiles;
};
