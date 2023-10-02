import env from "dotenv";
import { updateTranslationFileOnCommit } from "../src";

const openAiApiKey = env.config().parsed?.OPENAI_API_KEY;
const translationDirectory = "./test/localization/translations";
const otherLanguage = ["en-US", "de-DE", "fr-FR", "zh-CN"];

updateTranslationFileOnCommit({
  openAiApiKey,
  translationDirectory,
  defaultLanguage: "en-GB",
  otherLanguage,
});
