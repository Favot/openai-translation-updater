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
    console.log(`Updating ${lang} translation file...`);
    const filePath = path.join(translationDirectory, `${lang}.json`);

    const existingTranslations = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
      : {};

    responds[lang].forEach((item: UpdatedTranslationItem) => {
      const { updatedTranslation, listOfKeys } = item;

      function updateOrCreate(obj: any, keys: string[], index: number) {
        const key = keys[index];

        if (key === "context") return;

        if (index === keys.length - 1) {
          obj[key] = updatedTranslation;
        } else {
          if (!obj[key] || typeof obj[key] !== "object") {
            obj[key] = {};
          }
          updateOrCreate(obj[key], keys, index + 1);
        }
      }

      updateOrCreate(existingTranslations, listOfKeys, 0);
    });

    fs.writeFileSync(
      filePath,
      JSON.stringify(existingTranslations, null, 2),
      "utf-8"
    );
  });
};
