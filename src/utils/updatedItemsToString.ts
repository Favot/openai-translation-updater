import { UpdatedTranslationItemForOpenAi } from "../type";

export const updatedItemToString = (
  updatedItems: UpdatedTranslationItemForOpenAi
): string => {
  return (
    `context: ${updatedItems.itemContext}\n` +
    `updatedTranslation: ${updatedItems.updatedTranslation}\n`
  );
};
