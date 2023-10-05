import { Responds } from '../type';

export const getIsRespondsValid = (
  responds: Responds,
  isoCodes?: string[],
): boolean => {
  // If isoCodes are provided, check if all keys in responds are valid isoCodes
  if (
    isoCodes &&
    !Object.keys(responds).every((lang) => isoCodes.includes(lang))
  ) {
    return false;
  }

  // Check if every value in responds is an array of objects with a string property 'updatedTranslation'
  return Object.values(responds).every(
    (items) =>
      Array.isArray(items) &&
      items.every(
        (item) =>
          typeof item === 'object' &&
          typeof item.updatedTranslation === 'string',
      ),
  );
};
