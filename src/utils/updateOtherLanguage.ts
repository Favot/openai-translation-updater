import fs from 'fs'
import path from 'path'
import { NestedObject, Responds, UpdatedTranslatedItem } from '../type'
export const updateOtherLanguage = ({
  otherLanguage,
  responds,
  translationDirectory,
}: {
  otherLanguage: string[]
  responds: Responds
  translationDirectory: string
}) => {
  function isNestedObject(value: unknown): value is NestedObject {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
  }

  otherLanguage.forEach((lang) => {
    console.log(`Updating ${lang} translation file...`)

    const filePath = path.join(translationDirectory, `${lang}.json`)

    const existingTranslations = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      : {}

    responds[lang].forEach((item: UpdatedTranslatedItem) => {
      const { updatedTranslation, listOfKeys } = item

      function updateOrCreateKey(
        obj: NestedObject,
        keys: string[],
        index: number,
      ) {
        const key = keys[index]

        if (key === 'context' || key === 'appContext') return

        if (index === keys.length - 1) {
          console.log(
            `In the ${lang} file, updating key: "${key}" with the text: ${updatedTranslation}`,
          )
          obj[key] = updatedTranslation
        } else {
          if (!obj[key] || typeof obj[key] !== 'object') {
            console.log(`In the ${lang} file, creating new key ${key}`)
            obj[key] = {}
          }
          if (isNestedObject(obj[key])) {
            updateOrCreateKey(obj[key] as NestedObject, keys, index + 1)
          } else {
            console.error(
              `Expected a NestedObject but got a ${typeof obj[key]}`,
            )
          }
        }
      }

      updateOrCreateKey(existingTranslations, listOfKeys, 0)
    })

    fs.writeFileSync(
      filePath,
      JSON.stringify(existingTranslations, null, 2),
      'utf-8',
    )
  })
}
