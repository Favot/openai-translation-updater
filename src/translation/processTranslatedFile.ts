import * as shell from 'shelljs';
import { getFileContent } from '../generalUtils/getFileContent';
import { compareAndCaptureUpdates } from './compareAndCaptureUpdates';

export const processTranslatedFile = (file: string) => {
  if (!shell.test('-f', file)) {
    return null;
  }

  const stagedContent = getFileContent('', file);
  const headContent = getFileContent('HEAD', file);

  return compareAndCaptureUpdates({ stagedContent, headContent });
};
