import { UpdatedTranslationItem } from "../type";

export const updatedItemToString = (
  updatedItems: UpdatedTranslationItem
): string => {
  return (
    `primaryKey: ${updatedItems.primaryKey}\n` +
    `secondaryKey: ${updatedItems.secondaryKey}\n` +
    `context: ${updatedItems.context}\n` +
    `translatedItemKey: ${updatedItems.translationKey}\n` +
    `updatedTranslation: ${updatedItems.updatedTranslation}\n`
  );
};
