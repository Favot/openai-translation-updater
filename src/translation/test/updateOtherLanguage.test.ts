import fs from 'fs';
import mockFs from 'mock-fs';
import path from 'path';
import { updateOtherLanguage } from '../index';

describe('updateOtherLanguage', () => {
  afterEach(() => {
    mockFs.restore(); // Restore the normal fs behavior after each test
  });

  it('should update translation file with new values', () => {
    // Setup mock file system
    mockFs({
      '/translationDir': {
        'en.json': JSON.stringify({
          screen: {
            title: 'Hello',
          },
        }),
      },
    });

    const otherLanguage = ['en'];
    const responds = {
      en: [
        {
          listOfKeys: ['screen', 'title'],
          updatedTranslation: 'Welcome to the app',
        },
      ],
    };
    const translationDirectory = '/translationDir';

    updateOtherLanguage({ otherLanguage, responds, translationDirectory });

    const updatedFileContent = JSON.parse(
      fs.readFileSync(path.join(translationDirectory, 'en.json'), 'utf-8'),
    );

    expect(updatedFileContent.screen.title).toBe('Welcome to the app');
  });
});
