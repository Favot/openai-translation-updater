import { executeCommand } from './executeCommand'
import {
  getChangedTranslationFile,
  noTranslationUpdatesFound,
} from './getChangedTranslationFile'

// Mock the executeCommand module
jest.mock('./executeCommand')

describe('getChangedTranslationFile', () => {
  afterEach(() => {
    // Reset all mock function behaviors after each test
    jest.clearAllMocks()
  })

  it('should skip if no translation file updates are found', async () => {
    // Mock behavior for executeCommand to return null
    ;(executeCommand as jest.Mock).mockReturnValue(null)

    await expect(
      getChangedTranslationFile({ defaultLanguage: 'en' }),
    ).resolves.toEqual(noTranslationUpdatesFound)
  })

  it('should reject if multiple translation files are updated', async () => {
    // Mock behavior for executeCommand to return two filenames
    ;(executeCommand as jest.Mock).mockReturnValue('en1.json\nen2.json')

    await expect(
      getChangedTranslationFile({ defaultLanguage: 'en' }),
    ).rejects.toThrow(
      'Multiple translation files updated. Please commit one file at a time',
    )
  })

  it('should resolve with the filename if one translation file is updated', async () => {
    const filename = 'en.json'

    // Mock behavior for executeCommand to return one filename
    ;(executeCommand as jest.Mock).mockReturnValue(filename)

    await expect(
      getChangedTranslationFile({ defaultLanguage: 'en' }),
    ).resolves.toEqual(filename)
  })
})
