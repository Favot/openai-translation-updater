import { executeCommand } from '../src/generalUtils';
import { updateTranslationFilesOnCommit } from '../src/index';
import { defaultLanguage, openAiApiKey, otherLanguages } from './config';
import {
  clearAllOtherTranslationFilesWithEmptyFile,
  clearDefaultFiles,
  copyTemplateWithContextToDefaultLanguage,
  copyTemplateWithTextToDefaultLanguageFile,
  stageDefaultLanguageFiles,
} from './utils';

clearDefaultFiles({ defaultLanguage });

copyTemplateWithContextToDefaultLanguage({ defaultLanguage });

clearAllOtherTranslationFilesWithEmptyFile({
  translationFiles: otherLanguages,
});

console.log('commit the changes');

stageDefaultLanguageFiles({ defaultLanguage });

executeCommand(`git commit -m "test: update en-GB.json"`);

copyTemplateWithTextToDefaultLanguageFile({ defaultLanguage });

stageDefaultLanguageFiles({ defaultLanguage });

console.log('run the script');
updateTranslationFilesOnCommit({
  openAiApiKey,
  defaultLanguage: 'en-GB',
  otherLanguages,
});
