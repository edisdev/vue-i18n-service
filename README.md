# vue-i18n-service

The translation team (not developers) wants **a** file with all the keys to translate. But I love to use translations in **Single File Components**.

And I found a solution to make everyone happy: `vue-i18n-service export|import`

Vue I18n Service makes to manage SFC translations easier in a file. It collects all the `<i18n>` definitions in Single File Components and collects them into a file.

## What's the flow:
`Hello.vue`
```vue
<template>
  <div>{{ hello }}</div>
</template>

<i18n>
{
  "en": {
    "hello": "Hi 🙁"
  },
  "tr": {
    "hello": "Selam"
  }
}
</i18n>
```

⬇️`npx vue-i18n-service export > translations.json`
```json
{
  "src/components/Hello.vue": {
    "en": {
      "hello": "Hi 🙁"
    },
    "tr": {
      "hello": "Selam"
    }
  }
}
```

✏️`translations.edited.json`
```json
{
  "src/components/Hello.vue": {
    "en": {
      "hello": "Hello 🙂"
    },
    "tr": {
      "hello": "Merhaba"
    }
  }
}
```
⬇️`npx vue-i18n-service import < translations.edited.json`
```
updating file src/components/Hello.vue
```
```vue
<template>
  <div>{{ hello }}</div>
</template>

<i18n>
{
  "en": {
    "hello": "Hello 🙂"
  },
  "tr": {
    "hello": "Merhaba"
  }
}
</i18n>
```

And all is OK. Doesn't matter how many files you have, it simply distributes without any problem and any conflict.

## Exporting i18n's in SFCs

This will generate a `translations.json` file (or whatever you named).

```bash
npx vue-i18n-service export > translations.json
```

It has a simple format:

```json
{
  "<file path>": {
    "<locale>": {
      "<key>": "<value>"
    }
  }
}
```

Here is an example:

```json
{
  "src/components/Hello.vue": {
    "en": {
      "hello": "Hello"
    },
    "tr": {
      "hello": "Merhaba"
    }
  },
  "src/views/World.vue": {
    "en": {
      "world": "World"
    },
    "tr": {
      "world": "Dünya"
    }
  }
}
```

## Importing `translations.json` file to the SFCs

After bulk changing files, you can distribute import all the files calling `import` command.

```bash
npx vue-i18n-service import < translations.json
```

This will update `.vue` files and replace them with changes.

## License

MIT.
