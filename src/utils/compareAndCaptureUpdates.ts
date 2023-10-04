import { TranslationSegment, UpdatedTranslationData } from "../type";
import { collectUpdatedItems } from "./collectUpdatedItems";

export const compareAndCaptureUpdates = ({
  stagedContent,
  headContent,
}: {
  stagedContent: TranslationSegment;
  headContent: TranslationSegment;
}): UpdatedTranslationData => {
  const updatedItems = collectUpdatedItems({ stagedContent, headContent });

  return {
    appContext: stagedContent.appContext || null,
    updatedItems,
  };
};
