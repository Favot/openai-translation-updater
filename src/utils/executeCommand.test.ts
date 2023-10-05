import shell from 'shelljs';
import { executeCommand } from './executeCommand';

// Mocking shell.js
jest.mock('shelljs', () => ({
  exec: jest.fn(),
}));

describe('executeCommand', () => {
  afterEach(() => {
    // Clear the mock's data after each test
    (shell.exec as jest.Mock).mockClear();
  });

  it('should execute a command successfully and return the expected output', () => {
    const mockCommand = 'echo hello';
    const mockOutput = 'hello';
    (shell.exec as jest.Mock).mockReturnValue({
      code: 0,
      stdout: mockOutput,
      stderr: '',
    });

    const result = executeCommand(mockCommand);
    expect(result).toEqual(mockOutput);
  });

  it('should handle an erroneous command appropriately and log an error', () => {
    const mockCommand = 'invalid_command';
    const mockError = 'Command not found: invalid_command';
    (shell.exec as jest.Mock).mockReturnValue({
      code: 1,
      stdout: '',
      stderr: mockError,
    });

    // Mock console.error to check if the error gets logged
    const errorLogSpy = jest.spyOn(console, 'error').mockImplementation();

    const result = executeCommand(mockCommand);
    expect(result).toBeNull();
    expect(errorLogSpy).toHaveBeenCalledWith(
      `Error executing command: ${mockCommand}`,
      mockError,
    );

    // Restore the original console.error function
    errorLogSpy.mockRestore();
  });
});
