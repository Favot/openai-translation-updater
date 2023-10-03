export type UpdatedTranslationItem = {
  listOfKeys: string[];
  itemContext?: string;
  updatedTranslation: string;
};

export type UpdatedTranslationItemFromOpenAi = {
  listOfKeys: string[];
  updatedTranslation: string;
};

export type UpdatedTranslationItemForOpenAi = {
  itemContext?: string;
  updatedTranslation: string;
};

export type UpdatedTranslationData = {
  appContext: string | null;
  updatedItems: UpdatedTranslationItem[];
};

type BaseNestedObject = {
  [key: string]: string | NestedObject;
};

export type NestedObject = BaseNestedObject & {
  context?: string;
};

type BaseTranslationSegment = {
  [key: string]: string | NestedObject;
};

export type TranslationSegment = BaseTranslationSegment & {
  appContext?: string;
};

export type TranslationFile = {
  [segment: string]: TranslationSegment;
};

export type ScreenValue = {
  context: string;
  [key: string]: any;
};
