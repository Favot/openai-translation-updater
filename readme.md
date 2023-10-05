# Translation Hook Assistant

An npm package that automates the process of updating translation files on every git commit using OpenAI.

## Overview

When working on projects that support multiple languages, keeping track of updated translations can be a challenge. The `Translation Hook Assistant` helps you automate this process by leveraging the power of OpenAI's language model, integrating directly into your Git workflow. Every time you make a commit, the `updateTranslationFileOnCommit` function ensures that your translation files are up-to-date, making internationalization seamless and efficient.

## Enhancing Translations with Context

To achieve more accurate and contextually appropriate translations from OpenAI, you can optionally include `appContext` and `context` keys in your translation files. The `appContext` key can provide general information or context about the application, while the `context` key can provide context about a specific section or key within the translation file. This additional context can help OpenAI better understand the intended meaning and usage, leading to improved translation quality.

```json
{
  "appContext": "A finance management app",
  "screen": {
    "dashboard": {
      "context": "Main dashboard displaying financial overview",
      "balance": "Balance",
      ...
    },
    ...
  },
  ...
}
```

## Installation

```bash
npm install translation-hook-assistant
```

## Prerequisites

1. Obtain an OpenAI API key. If you don’t have one, sign up [here](https://beta.openai.com/signup/).

2. Set up a default translation language and any number of other languages you're targeting for your project. Make sure to have these files already created before setting up the `updateTranslationFileOnCommit` function.

---

## Usage

1. Set up the function in a pre-commit script, ensuring you pass the required parameters.

```typescript
import { updateTranslationFileOnCommit } from 'translation-hook-assistant'

updateTranslationFileOnCommit({
  openAiApiKey: 'YOUR_OPENAI_API_KEY',
  defaultLanguage: 'en',
  otherLanguage: ['es', 'fr', 'de'],
})
```

2. Create a script that runs the pre-commit script.

```json
{
  "scripts": {
    "updateTranslationOnCommit": "ts-node path/to/pre-commit/script.ts"
  }
}
```

You can use a package like [`husky`](https://www.npmjs.com/package/husky) to easily set up commit hooks.

3. Add the script on your pre-commit hook.

```bash
npm run updateTranslationOnCommit
```

4. Whenever you make changes to your translation files and commit them, the `updateTranslationFileOnCommit` function will automatically detect translation changes or new keys created and update translations for other languages as needed.

---

## Configuration

| Parameter         | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `openAiApiKey`    | Your OpenAI API key.                                   |
| `defaultLanguage` | The default language of your project (e.g., 'en').     |
| `otherLanguage`   | An array of other languages you want translations for. |

---

## Limitations

1. Make sure your OpenAI API key remains confidential. Never hard-code it directly in your scripts.

## Contributing

Contributions, issues, and feature requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

## License

MIT

---

By leveraging the power of OpenAI and Git hooks, the Translation Hook Assistant ensures your project's translations remain consistent and updated, helping you cater to a global audience effortlessly.
