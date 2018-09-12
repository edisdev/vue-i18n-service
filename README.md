# vue-i18n-service

Vue I18n Service makes to manage SFC translations easier in a file. It collects all the `<i18n>` definitions in Single File Components and collects them into a file.

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
