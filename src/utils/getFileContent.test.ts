import { executeCommand } from './executeCommand';
import { getFileContent } from './getFileContent';

// Mock the executeCommand module
jest.mock('./executeCommand');

describe('getFileContent', () => {
  afterEach(() => {
    // Reset all mock function behaviors after each test
    jest.clearAllMocks();
  });

  it('should return parsed JSON if the executeCommand outputs valid JSON', () => {
    // Mock behavior for executeCommand to return a JSON string
    const mockedJSON = '{"key": "value"}';
    (executeCommand as jest.Mock).mockReturnValue(mockedJSON);

    const result = getFileContent('HEAD', 'path/to/file.json');
    expect(result).toEqual(JSON.parse(mockedJSON));
  });

  it('should return an empty object if executeCommand outputs nothing', () => {
    // Mock behavior for executeCommand to return null
    (executeCommand as jest.Mock).mockReturnValue(null);

    const result = getFileContent('HEAD', 'path/to/file.json');
    expect(result).toEqual({});
  });

  it('should throw error if the executeCommand outputs invalid JSON', () => {
    // Mock behavior for executeCommand to return invalid JSON
    const mockedInvalidJSON = '{key: "value"}';
    (executeCommand as jest.Mock).mockReturnValue(mockedInvalidJSON);

    expect(() => {
      getFileContent('HEAD', 'path/to/file.json');
    }).toThrow(SyntaxError);
  });
});
