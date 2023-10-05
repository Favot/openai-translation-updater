import * as shell from 'shelljs';
import { compareAndCaptureUpdates } from './compareAndCaptureUpdates';
import { getFileContent } from './getFileContent';

export const processTranslatedFile = (file: string) => {
  if (!shell.test('-f', file)) {
    return null;
  }

  const stagedContent = getFileContent('', file);
  const headContent = getFileContent('HEAD', file);

  return compareAndCaptureUpdates({ stagedContent, headContent });
};
