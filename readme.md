# Translation Hook Assistant

An npm package that automates the process of updating translation files on every git commit using OpenAI.

## Overview

When working on projects that support multiple languages, keeping track of updated translations can be a challenge. The `Translation Hook Assistant` helps you automate this process by using the power of OpenAI's language model, integrating directly into your Git workflow. Every time you make a commit, the `updateTranslationFileOnCommit` function ensures that your translation files are up-to-date, making internationalization seamless and efficient.

## Installation

```bash
npm install translation-hook-assistant
```

## Prerequisites

1. Obtain an OpenAI API key. If you don’t have one, sign up [here](https://beta.openai.com/signup/).

2. Set up a default translation language and any number of other languages you're targeting for your project.

3. Make sure your project follows a standardized structure for translation files, e.g., `en.json`, `es.json`, etc.

## Expected JSON Translation File Structure

Your JSON translation file should adhere to the following structure:

```json
{
  "appContext": "Description or context about the app",
  "screen": {
    "screenName": {
      "context": "Description or context about the specific screen",
      "title": "Screen's title translation",
      "description": "Screen's description translation"
    },
    ...
  },
  "component": {
    "componentName": {
      "context": "Description or context about the specific component",
      "title": "Component's title translation",
      "description": "Component's description translation"
    },
    ...
  },
  "common": {
    "commonElement": {
      "context": "Description or context about the common element used across the app",
      "specificElement": "Translation of the specific element"
    },
    ...
  }
}
```

This structure is pivotal for the current version of the `Translation Hook Assistant`. Future versions aim to be more flexible and will accommodate diverse path structures.

## Usage

1. Import the main function from the package:

```typescript
import { updateTranslationFileOnCommit } from "translation-hook-assistant";
```

2. Set up the function in a pre-commit hook, ensuring you pass the required parameters.

```typescript
updateTranslationFileOnCommit({
  openAiApiKey: "YOUR_OPENAI_API_KEY",
  translationDirectory: "path/to/your/translation/files/",
  defaultLanguage: "en",
  otherLanguage: ["es", "fr", "de"],
});
```

You can use a package like [`husky`](https://www.npmjs.com/package/husky) to easily set up commit hooks.

3. Whenever you make changes to your translation files and commit them, the `updateTranslationFileOnCommit` function will automatically detect changes and update translations for other languages as needed.

## Configuration

| Parameter              | Description                                            |
| ---------------------- | ------------------------------------------------------ |
| `openAiApiKey`         | Your OpenAI API key.                                   |
| `translationDirectory` | Path to your translation files directory.              |
| `defaultLanguage`      | The default language of your project (e.g., 'en').     |
| `otherLanguage`        | An array of other languages you want translations for. |

## Limitations

1. Ensure that only one translation file is updated per commit for accuracy.

2. Make sure your OpenAI API key remains confidential. Never hard-code it directly in your scripts.

## Contributing

Contributions, issues, and feature requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

## License

MIT

---

By leveraging the power of OpenAI and Git hooks, the Translation Hook Assistant ensures your project's translations remain consistent and updated, helping you cater to a global audience effortlessly.
