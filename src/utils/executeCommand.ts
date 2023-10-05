import shell from 'shelljs';

export const executeCommand = (command: string) => {
  const result = shell.exec(command, { silent: true });
  if (result.code !== 0) {
    console.error(`Error executing command: ${command}`, result.stderr);
    return null;
  }
  return result.stdout.trim();
};
