export enum TemplateName {
  emptyFile = 'emptyFile.json',
  mainTranslationTemplateWithContext = 'mainTranslationTemplateWithContext.json',
  mainTranslationTemplateWithText = 'mainTranslationTemplateWithText.json',
  homeScreenTemplateWithContext = 'homeScreenTemplateWithContext.json',
  homeScreenTemplateWithText = 'homeScreenTemplateWithText.json',
}

export const baseDirectory = '__test__/localization/translations'
export const homeScreenDirectory = `${baseDirectory}/homeScreen`
export const templateDirectory = `__test__/jsonTemplate`
export enum LanguageForTest {
  enGB = 'en-GB',
  deDE = 'de-DE',
  frFR = 'fr-FR',
  zhCN = 'zh-CN',
  enUS = 'en-US',
}
