import * as shell from 'shelljs';
import { getFileContent } from '../generalUtils/getFileContent';
import { compareAndCaptureUpdates } from './compareAndCaptureUpdates';

export const processCommittedFile = (file: string) => {
  if (!shell.test('-f', file)) {
    return null;
  }

  const stagedContent = getFileContent('HEAD', file);
  const headContent = getFileContent('HEAD^', file);

  return compareAndCaptureUpdates({ stagedContent, headContent });
};
