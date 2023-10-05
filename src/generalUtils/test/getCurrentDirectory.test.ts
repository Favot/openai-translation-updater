import { getCurrentDirectory } from '../index'

describe('getCurrentDirectory', () => {
  test('should return the current directory', () => {
    const directory = 'src/translation/test/translationFile.json'

    const expected = 'src/translation/test'

    const result = getCurrentDirectory(directory)

    expect(result).toEqual(expected)
  })

  test('should return the current directory test 2', () => {
    const directory = 'src/translation/test/translation/en.json'

    const expected = 'src/translation/test/translation'

    const result = getCurrentDirectory(directory)

    expect(result).toEqual(expected)
  })
})
