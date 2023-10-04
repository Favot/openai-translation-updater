import { TranslationKeyList } from "./coreTypes";

export interface BaseTranslationItem {
  listOfKeys: TranslationKeyList;
  updatedTranslation: string;
}

export interface TranslationItemWithContext extends BaseTranslationItem {
  itemContext?: string;
}

export interface TranslationItemForOpenAi {
  itemContext?: string;
  updatedTranslation: string;
}
