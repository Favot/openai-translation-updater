import { NestedObject } from '../type'
import { getIsNestedObject } from './getIsNestedObject'

export const updateOrCreateKey = ({
  obj,
  keys,
  index,
  lang,
  updatedTranslation,
}: {
  obj: NestedObject
  keys: string[]
  index: number
  lang: string
  updatedTranslation: string
}) => {
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
    if (getIsNestedObject(obj[key])) {
      updateOrCreateKey({
        obj: obj[key] as NestedObject,
        keys,
        index: index + 1,
        lang,
        updatedTranslation,
      })
    } else {
      console.error(`Expected a NestedObject but got a ${typeof obj[key]}`)
    }
  }
}
