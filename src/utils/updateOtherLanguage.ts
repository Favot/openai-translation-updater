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
    // Construct the file path for the language JSON file
    const filePath = path.join(translationDirectory, `${lang}.json`);

    // Load the existing translations
    const existingTranslations = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
      : {};

    // Iterate through the response and update/add translations
    responds[lang].forEach((item: UpdatedTranslationItem) => {
      const context = item.screenName;
      const key = item.translationKey;
      const updatedTranslation = item.updatedTranslation;

      if (!existingTranslations[context]) {
        existingTranslations[context] = {};
      }

      // Update or add the translation
      existingTranslations[context][key] = updatedTranslation;
    });

    // Write the updated translations back to the file
    fs.writeFileSync(
      filePath,
      JSON.stringify(existingTranslations, null, 2),
      "utf-8"
    );
  });
};
