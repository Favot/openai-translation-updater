import { updatedItemToString } from '../updatedItemsToString'

describe('updatedItemsToString', () => {
  it('should return formatted string for a single item', () => {
    const singleItem = {
      itemContext: 'context1',
      updatedTranslation: 'updated1',
    }
    const expectedOutput =
      'context: context1\n' + 'updatedTranslation: updated1\n'

    expect(updatedItemToString(singleItem)).toBe(expectedOutput)
  })
})
