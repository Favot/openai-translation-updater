import { NestedObject, UpdatedTranslationItem } from "../type";
import { getKeyPathItemAndContext } from "./getKeyPathItemAndContext";

export const collectUpdatedItems = ({
  stagedContent,
  headContent,
}: {
  stagedContent: NestedObject;
  headContent: NestedObject;
}): UpdatedTranslationItem[] => {
  const updatedItems: UpdatedTranslationItem[] = [];
  getKeyPathItemAndContext({
    currentStaged: stagedContent,
    currentHead: headContent,
    collectedUpdates: updatedItems,
    originalStaged: stagedContent,
  });
  return updatedItems;
};
