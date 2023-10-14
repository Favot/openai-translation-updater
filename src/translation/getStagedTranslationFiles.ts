import { getTranslationFiles } from './getTranslationFiles';

export const getStagedTranslationFiles = ({
  defaultLanguage,
}: {
  defaultLanguage: string;
}): Promise<string[] | string> => {
  const command = `git diff-index --name-only --cached --diff-filter=d HEAD | grep '${defaultLanguage}.json'`;

  const stagedTranslationFiles = getTranslationFiles({ command });

  return stagedTranslationFiles;
};
