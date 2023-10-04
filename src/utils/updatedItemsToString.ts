import { TranslationItemForOpenAi } from "../type";

export const updatedItemToString = (
  updatedItems: TranslationItemForOpenAi
): string => {
  return (
    `context: ${updatedItems.itemContext}\n` +
    `updatedTranslation: ${updatedItems.updatedTranslation}\n`
  );
};
