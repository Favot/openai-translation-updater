import { executeCommand } from './executeCommand'

export const noTranslationUpdatesFound =
  'No base translation file updates found, skipping'

export const getChangedTranslationFile = ({
  defaultLanguage,
}: {
  defaultLanguage: string
}): Promise<string | Error> => {
  const command = `git diff-index --name-only --cached --diff-filter=d HEAD | grep '${defaultLanguage}.json'`
  const output = executeCommand(command)

  if (!output) {
    return Promise.resolve(noTranslationUpdatesFound)
  }

  const isMultipleFiles = output.split('\n').length > 1

  if (isMultipleFiles) {
    return Promise.reject(
      new Error(
        'Multiple translation files updated. Please commit one file at a time',
      ),
    )
  }

  return Promise.resolve(output)
}
