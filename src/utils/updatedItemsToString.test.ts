import { updatedItemsToString } from "./updatedItemsToString";

describe("updatedItemsToString", () => {
  it("should return an empty string for an empty array", () => {
    expect(updatedItemsToString([])).toBe("");
  });

  it("should return formatted string for a single item", () => {
    const singleItem = [
      {
        primaryKey: "primary1",
        secondaryKey: "secondary1",
        context: "context1",
        translationKey: "translation1",
        updatedTranslation: "updated1",
      },
    ];

    const expectedOutput =
      "primaryKey: primary1\n" +
      "secondaryKey: secondary1\n" +
      "context: context1\n" +
      "translatedItemKey: translation1\n" +
      "updatedTranslation: updated1\n";

    expect(updatedItemsToString(singleItem)).toBe(expectedOutput);
  });

  it("should return formatted string for multiple items", () => {
    const multipleItems = [
      {
        primaryKey: "primary1",
        secondaryKey: "secondary1",
        context: "context1",
        translationKey: "translation1",
        updatedTranslation: "updated1",
      },
      {
        primaryKey: "primary2",
        secondaryKey: "secondary2",
        context: "context2",
        translationKey: "translation2",
        updatedTranslation: "updated2",
      },
    ];

    const expectedOutput =
      "primaryKey: primary1\n" +
      "secondaryKey: secondary1\n" +
      "context: context1\n" +
      "translatedItemKey: translation1\n" +
      "updatedTranslation: updated1\n" +
      "\n" +
      "primaryKey: primary2\n" +
      "secondaryKey: secondary2\n" +
      "context: context2\n" +
      "translatedItemKey: translation2\n" +
      "updatedTranslation: updated2\n";

    expect(updatedItemsToString(multipleItems)).toBe(expectedOutput);
  });
});
