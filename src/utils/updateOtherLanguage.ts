import fs from "fs";
import path from "path";
import { UpdatedTranslationItem } from "../type";
export const updateOtherLanguage = ({
  otherLanguage,
  responds,
  translationDirectory,
}: {
  otherLanguage: string[];
  responds: any;
  translationDirectory: string;
}) => {
  otherLanguage.forEach((lang) => {
    const filePath = path.join(translationDirectory, `${lang}.json`);

    const existingTranslations = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
      : {};

    responds[lang].forEach((item: UpdatedTranslationItem) => {
      const primaryKey = item.primaryKey;
      const secondaryKey = item.secondaryKey;
      const translatedItemKey = item.translationKey;
      const updatedTranslation = item.updatedTranslation;

      if (!existingTranslations[primaryKey]) {
        existingTranslations[primaryKey] = {};
      }

      if (!existingTranslations[primaryKey][secondaryKey]) {
        existingTranslations[primaryKey][secondaryKey] = {};
      }

      existingTranslations[primaryKey][secondaryKey][translatedItemKey] =
        updatedTranslation;
    });

    fs.writeFileSync(
      filePath,
      JSON.stringify(existingTranslations, null, 2),
      "utf-8"
    );
  });
};
