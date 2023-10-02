import { TranslationContent, UpdatedTranslationData } from "../type";
import { compareAndCaptureUpdates } from "./compareAndCaptureUpdates";

describe("compareAndCaptureUpdates", () => {
  test("should detect updated translations", () => {
    const stagedContent: TranslationContent = {
      screen: {
        welcomeScreen: {
          title: "New Welcome",
        },
      },
    };

    const headContent: TranslationContent = {
      screen: {
        welcomeScreen: {
          title: "Old Welcome",
        },
      },
    };

    const result: UpdatedTranslationData = compareAndCaptureUpdates({
      stagedContent,
      headContent,
    });

    expect(result.updatedItems).toHaveLength(1);
    expect(result.updatedItems[0].updatedTranslation).toBe("New Welcome");
  });

  test("should not detect any update when contents are the same", () => {
    const stagedContent: TranslationContent = {
      screen: {
        welcomeScreen: {
          title: "Welcome",
        },
      },
    };

    const headContent: TranslationContent = {
      screen: {
        welcomeScreen: {
          title: "Welcome",
        },
      },
    };

    const result: UpdatedTranslationData = compareAndCaptureUpdates({
      stagedContent,
      headContent,
    });

    expect(result.updatedItems).toHaveLength(0);
  });

  test("should return a error if the secondary key is not an object", () => {
    const stagedContent: TranslationContent = {
      screen: {
        title: "Welcome",
      },
    };

    const headContent: TranslationContent = {
      screen: {
        title: "Welcome",
      },
    };

    expect(() =>
      compareAndCaptureUpdates({
        stagedContent,
        headContent,
      })
    ).toThrowError();
  });

  test("should return a error if the primary key is not an object", () => {
    const stagedContent: TranslationContent = {
      title: "Welcome",
    };

    const headContent: TranslationContent = {
      title: "Welcome",
    };

    expect(() =>
      compareAndCaptureUpdates({
        stagedContent,
        headContent,
      })
    ).toThrowError();
  });
});
