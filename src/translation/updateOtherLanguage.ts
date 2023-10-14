import fs from 'fs';
import path from 'path';
import { updateOrCreateKey } from '../generalUtils';
import { Responds, UpdatedTranslatedItem } from '../type';

export const updateOtherLanguage = ({
  otherLanguages,
  responds,
  translationDirectory,
}: {
  otherLanguages: string[];
  responds: Responds;
  translationDirectory: string;
}) => {
  otherLanguages.forEach((lang) => {
    console.log(`Updating ${lang} translation file...`);

    const filePath = path.join(translationDirectory, `${lang}.json`);

    const existingTranslations = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      : {};

    responds[lang].forEach((item: UpdatedTranslatedItem) => {
      const { updatedTranslation, listOfKeys } = item;

      updateOrCreateKey({
        obj: existingTranslations,
        keys: listOfKeys,
        index: 0,
        lang,
        updatedTranslation,
      });
    });

    fs.writeFileSync(
      filePath,
      JSON.stringify(existingTranslations, null, 2),
      'utf-8',
    );
  });
};
