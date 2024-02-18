import { Responds } from '../type';

export const addListOfKeysToRespondContent = ({
  listOfKeys,
  responds,
}: {
  listOfKeys: string[];
  responds: Responds;
}): Responds => {
  // Iterate through each language in the responds object
  Object.keys(responds).forEach((lang) => {
    // Iterate through each item in the array for this language
    responds[lang].forEach((item) => {
      // Add the listOfKeys property to each item
      item.listOfKeys = listOfKeys;
    });
  });

  // Return the updated responds object
  return responds;
};
