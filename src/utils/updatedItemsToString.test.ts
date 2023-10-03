import { updatedItemToString } from "./updatedItemsToString";

describe("updatedItemsToString", () => {
  it("should return formatted string for a single item", () => {
    const singleItem = {
      primaryKey: "primary1",
      secondaryKey: "secondary1",
      context: "context1",
      translationKey: "translation1",
      updatedTranslation: "updated1",
    };
    const expectedOutput =
      "primaryKey: primary1\n" +
      "secondaryKey: secondary1\n" +
      "context: context1\n" +
      "translatedItemKey: translation1\n" +
      "updatedTranslation: updated1\n";

    expect(updatedItemToString(singleItem)).toBe(expectedOutput);
  });
});
