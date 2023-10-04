import OpenAI from "openai";
import {
  generateOpenAiAssistantContent,
  generateOpenAiSystemContent,
  getChangedTranslationFile,
  processTranslatedFile,
  updateOtherLanguage,
} from "./utils";
import { noTranslationUpdatesFound } from "./utils/getChangedTranslationFile";

export type RespondItem = {
  updatedTranslation: string;
  listOfKeys?: string[];
};

export type UpdatedTranslatedItem = {
  listOfKeys: string[];
  updatedTranslation: string;
};

export type Responds = {
  [lang: string]: UpdatedTranslatedItem[];
};

export const updateTranslationFileOnCommit = async ({
  openAiApiKey,
  translationDirectory,
  defaultLanguage,
  otherLanguage,
}: {
  openAiApiKey: string | undefined;
  translationDirectory: string;
  defaultLanguage: string;
  otherLanguage: string[];
}) => {
  try {
    if (!openAiApiKey) {
      console.log("OpenAI API key is required");
      return;
    }
    const openai = new OpenAI({
      apiKey: openAiApiKey,
    });

    console.log("get changed translation file");

    const changedTranslationFile = await getChangedTranslationFile({
      defaultLanguage,
    });

    if (changedTranslationFile === noTranslationUpdatesFound) {
      return;
    }

    if (changedTranslationFile instanceof Error) {
      console.log(changedTranslationFile.message);
      return;
    }

    console.log("process translated file");

    const updatedTranslationData = processTranslatedFile(
      changedTranslationFile
    );

    if (
      !updatedTranslationData ||
      !updatedTranslationData?.updatedItems ||
      updatedTranslationData?.updatedItems.length === 0
    ) {
      console.log(`No translation file updates found`);
      return;
    }

    console.log("generate open ai assistant content");

    console.log("generate open ai system content");

    const appContext = updatedTranslationData.appContext;

    updatedTranslationData.updatedItems.forEach(async (updatedItem) => {
      console.log(
        `Request open ai to translate the text: "${updatedItem.updatedTranslation}"`
      );

      const assistantContent = generateOpenAiAssistantContent({
        updatedTranslationData: updatedItem,
        appContext,
        languagesList: otherLanguage,
      });

      const systemContent = generateOpenAiSystemContent();

      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemContent,
          },
          {
            role: "assistant",
            content: assistantContent,
          },
        ],
        model: "gpt-4",
      });

      console.log("update response from open ai");
      const respondContent = chatCompletion.choices[0].message.content;

      if (!respondContent) {
        console.log("OpenAI dit not return the expected content");
        return;
      }

      console.log("Parse respond content");
      const responds = JSON.parse(
        Buffer.from(respondContent, "utf-8").toString("utf-8")
      );

      const isRespondsValid = getIsRespondsValid(responds, otherLanguage);

      if (!isRespondsValid) {
        console.log(
          "OpenAI did not return the expected content, the content returned was :",
          responds
        );

        return;
      }

      const updatedRespondContentWithListOfKeys = addListOfKeysToRespondContent(
        updatedItem.listOfKeys,
        responds
      );

      console.log("update other language");
      updateOtherLanguage({
        otherLanguage,
        responds: updatedRespondContentWithListOfKeys,
        translationDirectory: translationDirectory,
      });
    });
  } catch (error) {
    console.log(error);
    return;
  }
};

const addListOfKeysToRespondContent = (
  listOfKeys: string[],
  responds: Responds
): Responds => {
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

const getIsRespondsValid = (responds: any, isoCodes?: string[]): boolean => {
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
          typeof item === "object" &&
          typeof item.updatedTranslation === "string"
      )
  );
};
