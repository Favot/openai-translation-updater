import env from "dotenv";
import OpenAI from "openai";
import {
  generateOpenAiAssistantContent,
  generateOpenAiSystemContent,
  getChangedTranslationFile,
  processTranslatedFile,
  updateOtherLanguage,
} from "./utils";
const LANGUAGES = ["de", "fr", "en-us", "th"];

const TRANSLATION_DIR = "./src/localization/translations";

const openAiApiKey = env.config().parsed?.OPENAI_API_KEY;

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

    const changedTranslationFile = await getChangedTranslationFile({
      pathToDefaultLanguage: translationDirectory,
      defaultLanguage,
    });

    if (changedTranslationFile instanceof Error) {
      console.log(changedTranslationFile.message);
      return;
    }

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

    const assistantContent = generateOpenAiAssistantContent({
      updatedTranslationData,
      languagesList: LANGUAGES,
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

    const respondContent = chatCompletion.choices[0].message.content;

    if (!respondContent) {
      console.log("OpenAI dit not return the expected content");
      return;
    }

    const responds = JSON.parse(
      Buffer.from(respondContent, "utf-8").toString("utf-8")
    );

    updateOtherLanguage({
      otherLanguage,
      responds,
      translationDirectory: translationDirectory,
    });
  } catch (error) {
    console.log("Error:", error);
    return;
  }
};
