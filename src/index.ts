import OpenAI from "openai";
import {
  generateOpenAiAssistantContent,
  generateOpenAiSystemContent,
  getChangedTranslationFile,
  processTranslatedFile,
  updateOtherLanguage,
} from "./utils";
import { noTranslationUpdatesFound } from "./utils/getChangedTranslationFile";

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

    console.log("open ai chat completion");

    const appContext = updatedTranslationData.appContext;

    updatedTranslationData.updatedItems.forEach(async (updatedItem) => {
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
      console.log("🚀 ~ file: index.ts:89 ~ respondContent:", respondContent);

      if (!respondContent) {
        console.log("OpenAI dit not return the expected content");
        return;
      }

      console.log("Parse respond content");
      const responds = JSON.parse(
        Buffer.from(respondContent, "utf-8").toString("utf-8")
      );

      console.log("update other language");
      updateOtherLanguage({
        otherLanguage,
        responds,
        translationDirectory: translationDirectory,
      });
    });
  } catch (error) {
    console.log(error);
    return;
  }
};
