import { executeCommand } from '../generalUtils';
export const noTranslationUpdatesFound =
  'No base translation file updates found, skipping';
export const getTranslationFiles = async ({ command }: { command: string }) => {
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
