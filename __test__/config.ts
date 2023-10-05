import env from 'dotenv'

export const baseDirectory = '__test__/localization/translations'
export const homeScreenDirectory = `${baseDirectory}/homeScreen`
export const templateDirectory = `__test__/jsonTemplate`
export const openAiApiKey = env.config().parsed?.OPENAI_API_KEY
export const defaultLanguage = 'en-GB'
export const otherLanguage = ['en-US', 'de-DE', 'fr-FR', 'zh-CN']
