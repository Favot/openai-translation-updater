import { NestedObject, TranslationItemWithContext } from '../type'
import { getKeyPathItemAndContext } from './getKeyPathItemAndContext'

export const collectUpdatedItems = ({
  stagedContent,
  headContent,
}: {
  stagedContent: NestedObject
  headContent: NestedObject
}): TranslationItemWithContext[] => {
  const updatedItems: TranslationItemWithContext[] = []
  getKeyPathItemAndContext({
    currentStaged: stagedContent,
    currentHead: headContent,
    collectedUpdates: updatedItems,
    originalStaged: stagedContent,
  })
  return updatedItems
}
