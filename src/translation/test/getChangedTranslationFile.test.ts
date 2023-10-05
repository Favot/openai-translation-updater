import { executeCommand } from '../../generalUtils/executeCommand'
import {
  getChangedTranslationFiles,
  noTranslationUpdatesFound,
} from '../getChangedTranslationFiles'
// Mock the executeCommand module
jest.mock('../../generalUtils/executeCommand')

describe('getChangedTranslationFiles', () => {
  afterEach(() => {
    // Reset all mock function behaviors after each test
    jest.clearAllMocks()
  })

  it('should skip if no translation file updates are found', async () => {
    // Mock behavior for executeCommand to return null
    ;(executeCommand as jest.Mock).mockReturnValue(null)

    await expect(
      getChangedTranslationFiles({ defaultLanguage: 'en' }),
    ).resolves.toEqual(noTranslationUpdatesFound)
  })

  it('should reject if multiple translation files are updated', async () => {
    // Mock behavior for executeCommand to return two filenames
    ;(executeCommand as jest.Mock).mockReturnValue('en1.json\nen2.json')

    const result = ['en1.json', 'en2.json']
    await expect(
      getChangedTranslationFiles({ defaultLanguage: 'en' }),
    ).resolves.toEqual(result)
  })

  it('should resolve with the filename if one translation file is updated', async () => {
    const filename = 'en.json'

    // Mock behavior for executeCommand to return one filename
    ;(executeCommand as jest.Mock).mockReturnValue(['en.json'])

    await expect(
      getChangedTranslationFiles({ defaultLanguage: 'en' }),
    ).resolves.toEqual([filename])
  })
})
