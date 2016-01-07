# textlint-rule-one-white-space-between-zenkaku-and-hankaku-eiji

全角文字と半角英字の間に半角スペースを必要とする [textlint](https://github.com/textlint/textlint) のルールです。ただし句読点を含む以下の全角文字の前後には必要はありません。

```
、。「 」（）｛｝【】『』
```

## Installation

```
$ npm install textlint-rule-one-white-space-between-zenkaku-and-hankaku-eiji
```

## Usage

```
$ textlint --rule one-white-space-between-zenkaku-and-hankaku-eiji
```

## License

MIT
