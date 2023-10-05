import { TranslationKeyList } from './coreTypes'
import { BaseTranslationItem } from './translationItems'

export interface RespondItem {
  updatedTranslation: string
  listOfKeys?: TranslationKeyList
}

export interface UpdatedTranslatedItem extends BaseTranslationItem {}

export interface Responds {
  [lang: string]: UpdatedTranslatedItem[]
}
