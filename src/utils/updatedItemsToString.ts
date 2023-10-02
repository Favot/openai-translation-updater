import { UpdatedTranslationItem } from "../type";

export const updatedItemsToString = (
  updatedItems: UpdatedTranslationItem[]
): string => {
  return updatedItems
    .map((item) => {
      return (
        `primaryKey: ${item.primaryKey}\n` +
        `secondaryKey: ${item.secondaryKey}\n` +
        `context: ${item.context}\n` +
        `translatedItemKey: ${item.translationKey}\n` +
        `updatedTranslation: ${item.updatedTranslation}\n`
      );
    })
    .join("\n");
};
