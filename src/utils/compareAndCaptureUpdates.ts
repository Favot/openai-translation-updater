import {
  ScreenValue,
  TranslationContent,
  UpdatedTranslationData,
} from "../type";

export const compareAndCaptureUpdates = (
  stagedContent: TranslationContent,
  headContent: TranslationContent
): UpdatedTranslationData => {
  const updatedTranslationData: UpdatedTranslationData = {
    appContext: null,
    updatedItems: [],
  };

  for (const [context, contextValue] of Object.entries(stagedContent)) {
    if (context === "appContext") {
      if (
        !headContent.hasOwnProperty(context) ||
        headContent[context] !== contextValue
      ) {
        updatedTranslationData.appContext = contextValue as string;
      }
    }
    if (typeof contextValue === "object") {
      for (const [screenName, screenValue] of Object.entries(
        contextValue as Record<string, ScreenValue>
      )) {
        if (typeof screenValue === "object" && screenValue !== null) {
          const screenContext = screenValue["screenContext"] as string;
          for (const [key, value] of Object.entries(screenValue)) {
            if (
              !headContent[context]?.[screenName]?.hasOwnProperty(key) ||
              headContent[context][screenName][key] !== value
            ) {
              updatedTranslationData.updatedItems.push({
                screenName,
                context: screenContext,
                translationKey: key,
                updatedTranslation: value as string,
              });
            }
          }
        }
      }
    }
  }

  // If there are any updated items, update appContext from stagedContent if available
  if (
    updatedTranslationData.updatedItems.length > 0 &&
    stagedContent.hasOwnProperty("appContext")
  ) {
    updatedTranslationData.appContext = stagedContent.appContext ?? null;
  }

  return updatedTranslationData;
};
