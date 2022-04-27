# find-similar

Finds similar word(s) in a list of words.

## Install

```bash
npm i find-similar
```

## Usage

This package is pure ESM, please read the
[esm-package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

```js
import { findSimilar, didYouMean } from 'find-similar'

console.log(findSimilar('foos', ['bar', 'baz', 'foo']))
// => ['foo']

// Suggests similar words
console.log(didYouMean('foos', ['bar', 'baz', 'foo']))
// => 'Did you mean "foo"?'
```

## API

### findSimilar

▸ **findSimilar**(`word`, `candidates`, `options?`): string[]

Finds similar word(s) in a list of words.

#### Parameters

| Name         | Type     | Description                           |
| :----------- | :------- | :------------------------------------ |
| `word`       | string   | The word to find similar words for.   |
| `candidates` | string[] | An array of words to compare against. |
| `options`    | Options  | Options for the function.             |

#### Returns

string[]

An array of similar words.

---

### didYouMean

▸ **didYouMean**(`word`, `candidates`, `options?`): string

Suggests similar words in a list of words.

#### Parameters

| Name         | Type     | Description                           |
| :----------- | :------- | :------------------------------------ |
| `word`       | string   | The word to find similar words for.   |
| `candidates` | string[] | An array of words to compare against. |
| `options`    | Options  | Options for the function.             |

#### Returns

string

A string of suggested words.

## Type aliases

### Options

Ƭ **Options**: `Object`

#### Type declaration

| Name        | Type   | Description                                                           |
| :---------- | :----- | :-------------------------------------------------------------------- |
| `maxScore?` | number | Maximum levenshtein distance threshold. **`default`** 3               |
| `criteria?` | number | The similarity threshold, a number between 0 and 1. **`default`** 0.5 |
| `prefix?`   | string | A string to prepend to the suggested word. **`default`** ''           |

## Contributing

We 💛&nbsp; issues.

When committing, please conform to [the semantic-release commit standards](https://www.conventionalcommits.org/). Please install `commitizen` and the adapter globally, if you have not already.

```bash
npm i -g commitizen cz-conventional-changelog
```

Now you can use `git cz` or just `cz` instead of `git commit` when committing. You can also use `git-cz`, which is an alias for `cz`.

```bash
git add . && git cz
```

## Thank you

A project by [Stilearning](https://stilearning.com) &copy; 2022.
