export type UpdatedTranslationItem = {
  screenName: string;
  context: string;
  translationKey: string;
  updatedTranslation: string;
};

export type UpdatedTranslationData = {
  appContext: string | null;
  updatedItems: UpdatedTranslationItem[];
};

export type TranslationContent = {
  appContext?: string;
  [context: string]: any;
};

export type ScreenValue = {
  screenContext: string;
  [key: string]: any;
};
