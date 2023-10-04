export interface BaseTranslationSegment {
  [key: string]: string | NestedObject;
}

export type NestedObject = BaseTranslationSegment & {
  context?: string;
};

export type TranslationSegment = BaseTranslationSegment & {
  appContext?: string;
};
