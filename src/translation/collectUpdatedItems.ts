import { getKeyPathItemAndContext } from '../generalUtils/getKeyPathItemAndContext'
import { NestedObject, TranslationItemWithContext } from '../type'

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
