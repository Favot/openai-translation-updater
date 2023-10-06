import OpenAI from 'openai';
import {
  generateOpenAiAssistantContent,
  generateOpenAiSystemContent,
} from '../generalUtils';
import { TranslationItemWithContext } from '../type';

export const requestOpenIA = async ({
  updatedItem,
  appContext,
  otherLanguage,
  openAiApiKey,
}: {
  updatedItem: TranslationItemWithContext;
  appContext: string | null;
  otherLanguage: string[];
  openAiApiKey: string;
}) => {
  const assistantContent = generateOpenAiAssistantContent({
    updatedTranslationData: updatedItem,
    appContext,
    languagesList: otherLanguage,
  });

  const systemContent = generateOpenAiSystemContent();
  const openai = new OpenAI({
    apiKey: openAiApiKey,
  });

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: systemContent,
      },
      {
        role: 'assistant',
        content: assistantContent,
      },
    ],
    model: 'gpt-4',
  });

  console.log('update response from open ai');
  const respondContent = chatCompletion.choices[0].message.content;

  if (!respondContent) {
    console.warn(
      `OpenAI dit not return the expected content, the data returned was: ${respondContent}`,
    );

    return;
  }

  return respondContent;
};
