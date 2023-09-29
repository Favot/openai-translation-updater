import { UpdatedTranslationItem } from "../type";

export const updatedItemsToString = (
  updatedItems: UpdatedTranslationItem[]
): string => {
  return updatedItems
    .map((item) => {
      return (
        `screenName: ${item.screenName}\n` +
        `context: ${item.context}\n` +
        `translationKey: ${item.translationKey}\n` +
        `updatedTranslation: ${item.updatedTranslation}\n`
      );
    })
    .join("\n");
};
