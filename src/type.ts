export type UpdatedTranslationItem = {
  primaryKey: string;
  secondaryKey: string;
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
  context: string;
  [key: string]: any;
};
