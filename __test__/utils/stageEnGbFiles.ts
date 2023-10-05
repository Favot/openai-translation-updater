import { executeCommand } from '../../src/generalUtils'
import { baseDirectory, homeScreenDirectory } from '../type'

export const stageEnGbFiles = () => {
  executeCommand(`git add ${baseDirectory}/en-GB.json`)
  executeCommand(`git add ${homeScreenDirectory}/en-GB.json`)
}
