import { executeCommand } from '../generalUtils/executeCommand';

export const noTranslationUpdatesFound =
  'No base translation file updates found, skipping';

export const getStagedTranslationFiles = ({
  defaultLanguage,
}: {
  defaultLanguage: string;
}): Promise<string[] | string> => {
  const command = `git diff-index --name-only --cached --diff-filter=d HEAD | grep '${defaultLanguage}.json'`;
  const output = executeCommand(command);

  if (!output) {
    return Promise.resolve(noTranslationUpdatesFound);
  }

  const isMultipleFiles = output.includes('\n');

  if (isMultipleFiles) {
    const outputArray = output.split('\n');
    return Promise.resolve(outputArray);
  }

  return Promise.resolve(output);
};
