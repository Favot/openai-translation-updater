import { NestedObject } from '../type'

export const getIsNestedObject = (value: unknown): value is NestedObject => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
