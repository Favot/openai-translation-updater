import { AppContext } from "./coreTypes";
import { TranslationSegment } from "./nestedObjectsAndSegments";
import { TranslationItemWithContext } from "./translationItems";

export interface TranslationFile {
  [segment: string]: TranslationSegment;
}

export interface UpdatedTranslationData {
  appContext: AppContext;
  updatedItems: TranslationItemWithContext[];
}
