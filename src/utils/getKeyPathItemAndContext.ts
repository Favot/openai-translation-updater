import { NestedObject, UpdatedTranslationItem } from "../type";
import { getContextFromKeysPath } from "./getContextFromKeysPath";

export const getKeyPathItemAndContext = ({
  currentStaged,
  currentHead,
  collectedUpdates,
  originalStaged,
  keyPath = [],
}: {
  currentStaged: NestedObject | string;
  currentHead: NestedObject | string;
  collectedUpdates: UpdatedTranslationItem[];
  originalStaged: NestedObject;
  keyPath?: string[];
}) => {
  if (typeof currentStaged === "object" && typeof currentHead === "object") {
    for (const key in currentStaged) {
      if (Object.prototype.hasOwnProperty.call(currentStaged, key)) {
        getKeyPathItemAndContext({
          currentStaged: currentStaged[key],
          currentHead: currentHead[key],
          collectedUpdates,
          originalStaged,
          keyPath: keyPath.concat(key),
        });
      }
    }
  } else if (
    typeof currentStaged === "string" &&
    (typeof currentHead !== "string" || currentStaged !== currentHead)
  ) {
    collectedUpdates.push({
      listOfKeys: keyPath,
      itemContext: getContextFromKeysPath({
        nestedObject: originalStaged,
        keyPath: keyPath.slice(0, -1),
      }),
      updatedTranslation: currentStaged,
    });
  }
};
