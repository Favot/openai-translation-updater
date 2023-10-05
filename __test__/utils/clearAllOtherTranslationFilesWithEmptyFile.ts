import { executeCommand } from '../../src/generalUtils'
import { baseDirectory, homeScreenDirectory } from '../type'

export const clearAllOtherTranslationFilesWithEmptyFile = ({
  translationFiles,
}: {
  translationFiles: string[]
}) => {
  translationFiles.forEach((fileName) => {
    console.log(`clearing ${fileName} file...`)

    executeCommand(`echo "{}" > ${baseDirectory}/${fileName}.json`)
    executeCommand(`echo "{}" > ${homeScreenDirectory}/${fileName}.json`)
  })
}
