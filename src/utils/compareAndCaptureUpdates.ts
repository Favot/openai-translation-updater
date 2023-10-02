import {
  TranslationContent,
  UpdatedTranslationData,
  UpdatedTranslationItem,
} from "../type";

export const compareAndCaptureUpdates = ({
  stagedContent,
  headContent,
}: {
  stagedContent: TranslationContent;
  headContent: TranslationContent;
}): UpdatedTranslationData => {
  const updatedTranslationData: UpdatedTranslationData = {
    appContext: null,
    updatedItems: [],
  };

  // Handle appContext outside the loop since it's a special case.
  if (
    stagedContent.appContext &&
    stagedContent.appContext !== headContent.appContext
  ) {
    updatedTranslationData.appContext = stagedContent.appContext;
  }

  for (const [primaryKey, primaryValue] of Object.entries(stagedContent)) {
    // We already handled appContext, skip to the next iteration
    if (primaryKey === "appContext") continue;

    if (typeof primaryValue !== "object") {
      throw new Error(
        `🚨 ${primaryKey} is not an object. Please check your translation file.`
      );
    }

    for (const [secondaryKey, secondaryValue] of Object.entries(primaryValue)) {
      if (
        !secondaryValue ||
        (typeof secondaryValue !== "object" && secondaryKey !== "context")
      ) {
        throw new Error(
          `🚨 ${secondaryKey} is not an object. Please check your translation file.`
        );
      }

      for (const [translationKey, updatedTranslation] of Object.entries(
        secondaryValue
      )) {
        const isTranslationAbsentInHeadContent =
          !headContent[primaryKey]?.[secondaryKey]?.hasOwnProperty(
            translationKey
          );
        const isTranslationDifferentFromHeadContent =
          headContent[primaryKey]?.[secondaryKey]?.[translationKey] !==
          updatedTranslation;

        if (
          isTranslationAbsentInHeadContent ||
          isTranslationDifferentFromHeadContent
        ) {
          const context = headContent[primaryKey]?.[secondaryKey]?.context;

          if (typeof context !== "string" && secondaryKey !== "context") {
            console.log(
              `🚨 There is not context implemented for the key: ${secondaryKey}, make sure it's not required.`
            );
          }

          const updatedItem: UpdatedTranslationItem = {
            primaryKey,
            secondaryKey,
            context: context || "",
            translationKey: translationKey,
            updatedTranslation: updatedTranslation as string,
          };
          updatedTranslationData.updatedItems.push(updatedItem);
        }
      }
    }
  }

  return updatedTranslationData;
};
