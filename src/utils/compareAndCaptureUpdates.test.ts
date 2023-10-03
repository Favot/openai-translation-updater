import { TranslationSegment, UpdatedTranslationData } from "../type";
import { compareAndCaptureUpdates } from "./compareAndCaptureUpdates";

describe("compareAndCaptureUpdates", () => {
  test("should detect updated translations if the translation is at the third key", () => {
    const stagedContent: TranslationSegment = {
      screen: {
        welcomeScreen: {
          title: "New Welcome",
        },
      },
    };

    const headContent: TranslationSegment = {
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
    expect(result.updatedItems[0].listOfKeys).toEqual([
      "screen",
      "welcomeScreen",
      "title",
    ]);
    expect(result.updatedItems[0].itemContext).toBeUndefined();

    expect(result.updatedItems[0].updatedTranslation).toBe("New Welcome");
  });

  test("should not detect any update when contents are the same", () => {
    const stagedContent: TranslationSegment = {
      screen: {
        welcomeScreen: {
          title: "Welcome",
        },
      },
    };

    const headContent: TranslationSegment = {
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

  // test("should detect updated translations if the translation is at the secondary key", () => {
  //   const stagedContent: TranslationSegment = {
  //     screen: {
  //       title: "New Welcome",
  //     },
  //   };

  //   const headContent: TranslationSegment = {
  //     screen: {
  //       title: "Old Welcome",
  //     },
  //   };

  //   const result = compareAndCaptureUpdates({
  //     stagedContent,
  //     headContent,
  //   });

  //   expect(result.updatedItems).toHaveLength(1);
  //   expect(result.updatedItems[0].listOfKeys).toEqual(["screen", "title"]);
  //   expect(result.updatedItems[0].itemContext).toBeUndefined();
  //   expect(result.updatedItems[0].updatedTranslation).toBe("New Welcome");
  // });

  test("should detect updated translations if the translation is at the primary key", () => {
    const stagedContent: TranslationSegment = {
      title: "New Welcome",
    };

    const headContent: TranslationSegment = {
      title: "Old Welcome",
    };

    const result = compareAndCaptureUpdates({
      stagedContent,
      headContent,
    });

    expect(result.updatedItems).toHaveLength(1);
    expect(result.updatedItems[0].listOfKeys).toEqual(["title"]);
    expect(result.updatedItems[0].itemContext).toBeUndefined();
    expect(result.updatedItems[0].updatedTranslation).toBe("New Welcome");
  });

  test("should detect updated translations if the translation is at the secondary key and has context", () => {
    const stagedContent: TranslationSegment = {
      screen: {
        title: {
          context: "Welcome",
          title: "New Welcome",
        },
      },
    };

    const headContent: TranslationSegment = {
      screen: {
        title: {
          context: "Welcome",
          title: "Old Welcome",
        },
      },
    };

    const result = compareAndCaptureUpdates({
      stagedContent,
      headContent,
    });

    expect(result.updatedItems).toHaveLength(1);
    expect(result.updatedItems[0].listOfKeys).toEqual([
      "screen",
      "title",
      "title",
    ]);
    expect(result.updatedItems[0].itemContext).toBe("Welcome");
    expect(result.updatedItems[0].updatedTranslation).toBe("New Welcome");
  });

  test("should detect updated translations if the translation is at the primary key and has context", () => {
    const stagedContent: TranslationSegment = {
      title: {
        context: "Welcome",
        value: "New Welcome",
      },
    };

    const headContent: TranslationSegment = {
      title: {
        context: "Welcome",
        value: "Old Welcome",
      },
    };

    const result = compareAndCaptureUpdates({
      stagedContent,
      headContent,
    });

    expect(result.updatedItems).toHaveLength(1);
    expect(result.updatedItems[0].listOfKeys).toEqual(["title", "value"]);
    expect(result.updatedItems[0].itemContext).toBe("Welcome");
    expect(result.updatedItems[0].updatedTranslation).toBe("New Welcome");
  });

  test("should detect updated translations if the translation is at the third indentation and has context", () => {
    const stagedContent: TranslationSegment = {
      screen: {
        welcomeScreen: {
          title: {
            context: "Welcome",
            value: "New Welcome",
          },
        },
      },
    };

    const headContent: TranslationSegment = {
      screen: {
        welcomeScreen: {
          title: {
            context: "Welcome",
            value: "Old Welcome",
          },
        },
      },
    };

    const result: UpdatedTranslationData = compareAndCaptureUpdates({
      stagedContent,
      headContent,
    });

    expect(result.updatedItems).toHaveLength(1);
    expect(result.updatedItems[0].listOfKeys).toEqual([
      "screen",
      "welcomeScreen",
      "title",
      "value",
    ]);

    expect(result.updatedItems[0].itemContext).toBe("Welcome");
    expect(result.updatedItems[0].updatedTranslation).toBe("New Welcome");
  });

  test("should detect updated translations if the translation is at the secondary key and and other is at the third indentation", () => {
    const stagedContent: TranslationSegment = {
      screen: {
        title: "New Welcome",
        welcomeScreen: {
          title: "New Welcome",
        },
      },
    };

    const headContent: TranslationSegment = {
      screen: {
        title: "Old Welcome",
        welcomeScreen: {
          title: "Old Welcome",
        },
      },
    };

    const result = compareAndCaptureUpdates({
      stagedContent,
      headContent,
    });

    expect(result.updatedItems).toHaveLength(2);
    expect(result.updatedItems[0].listOfKeys).toEqual(["screen", "title"]);
    expect(result.updatedItems[0].itemContext).toBeUndefined();
    expect(result.updatedItems[0].updatedTranslation).toBe("New Welcome");

    expect(result.updatedItems[1].listOfKeys).toEqual([
      "screen",
      "welcomeScreen",
      "title",
    ]);
    expect(result.updatedItems[1].itemContext).toBeUndefined();
    expect(result.updatedItems[1].updatedTranslation).toBe("New Welcome");
  });
});
