import { executeCommand } from "./executeCommand";

export const getChangedTranslationFile = ({
  defaultLanguage,
  pathToDefaultLanguage,
}: {
  defaultLanguage: string;
  pathToDefaultLanguage: string;
}): Promise<string | Error> => {
  const command = `git diff-index --name-only --cached --diff-filter=d HEAD | grep -E "^${pathToDefaultLanguage}.${defaultLanguage}.json$"`;
  const output = executeCommand(command);

  if (!output) {
    return Promise.reject(new Error("No translation file updates found"));
  }

  const isMultipleFiles = output.split("\n").length > 1;

  if (isMultipleFiles) {
    return Promise.reject(
      new Error(
        "Multiple translation files updated. Please commit one file at a time"
      )
    );
  }

  return Promise.resolve(output);
};
