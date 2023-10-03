import {
  NestedObject,
  TranslationSegment,
  UpdatedTranslationData,
  UpdatedTranslationItem,
} from "../type";

export const compareAndCaptureUpdates = ({
  stagedContent,
  headContent,
}: {
  stagedContent: TranslationSegment;
  headContent: TranslationSegment;
}): UpdatedTranslationData => {
  const updatedItems: UpdatedTranslationItem[] = [];

  function getKeyContext(
    obj: NestedObject,
    keys: string[]
  ): string | undefined {
    if (keys.length === 0) return obj.context;
    const key = keys[0];
    if (typeof obj[key] === "object") {
      return getKeyContext(obj[key] as NestedObject, keys.slice(1));
    }
    return undefined;
  }

  function traverse(
    staged: NestedObject | string,
    head: NestedObject | string,
    keys: string[] = []
  ) {
    if (typeof staged === "object" && typeof head === "object") {
      for (const key in staged) {
        if (Object.prototype.hasOwnProperty.call(staged, key)) {
          traverse(staged[key], head[key], keys.concat(key));
        }
      }
    } else if (
      typeof staged === "string" &&
      (typeof head !== "string" || staged !== head)
    ) {
      updatedItems.push({
        listOfKeys: keys,
        itemContext: getKeyContext(stagedContent, keys.slice(0, -1)),
        updatedTranslation: staged,
      });
    }
  }

  traverse(stagedContent, headContent);

  return {
    appContext: stagedContent.appContext || null,
    updatedItems,
  };
};
