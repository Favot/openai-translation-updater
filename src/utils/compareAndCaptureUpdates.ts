import {
  ScreenValue,
  TranslationContent,
  UpdatedTranslationData,
  UpdatedTranslationItem,
} from "../type";

export const compareAndCaptureUpdates = (
  stagedContent: TranslationContent,
  headContent: TranslationContent
): UpdatedTranslationData => {
  const updatedTranslationData: UpdatedTranslationData = {
    appContext: null,
    updatedItems: [],
  };

  for (const [primaryKey, primaryValue] of Object.entries(stagedContent)) {
    if (primaryKey !== "appContext" && typeof primaryValue === "object") {
      for (const [secondaryKey, secondaryValue] of Object.entries(
        primaryValue as Record<string, ScreenValue>
      )) {
        if (typeof secondaryValue === "object" && secondaryValue !== null) {
          for (const [translationKey, updatedTranslation] of Object.entries(
            secondaryValue
          )) {
            if (
              !headContent[primaryKey]?.[secondaryKey]?.hasOwnProperty(
                translationKey
              ) ||
              headContent[primaryKey][secondaryKey][translationKey] !==
                updatedTranslation
            ) {
              const updatedItem: UpdatedTranslationItem = {
                primaryKey,
                secondaryKey,
                context: headContent[primaryKey]?.[secondaryKey]?.context,
                translationKey: translationKey,
                updatedTranslation: updatedTranslation as string,
              };
              updatedTranslationData.updatedItems.push(updatedItem);
            }
          }
        }
      }
    } else if (
      primaryKey === "appContext" &&
      headContent[primaryKey] !== primaryValue
    ) {
      updatedTranslationData.appContext = primaryValue as string;
    }
  }

  return updatedTranslationData;
};
