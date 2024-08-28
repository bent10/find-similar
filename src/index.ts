/**
 * Finds similar word(s) in a list of words.
 *
 * ## Install
 *
 * ```bash
 * npm i find-similar
 * ```
 *
 * ## Usage
 *
 * This package is pure ESM, please read the
 * [esm-package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
 *
 * ```js
 * import { findSimilar, didYouMean } from 'find-similar'
 *
 * console.log(findSimilar('foos', ['bar', 'baz', 'foo']))
 * // => ['foo']
 *
 * // Suggests similar words
 * console.log(didYouMean('foos', ['bar', 'baz', 'foo']))
 * // => 'Did you mean "foo"?'
 * ```
 *
 * @module
 */

import leven from 'leven'

export type Options = {
  /**
   * Maximum levenshtein distance threshold.
   *
   * @default 3
   */
  maxScore?: number

  /**
   * The similarity threshold, a number between 0 and 1.
   *
   * @default 0.5
   */
  criteria?: number

  /**
   * A string to prepend to the suggested word.
   *
   * @default ''
   */
  prefix?: string
}

/**
 * Finds similar word(s) in a list of words.
 *
 * @param word - The word to find similar words for.
 * @param candidates - An array of words to compare against.
 * @param options - Options for the function.
 * @returns An array of similar words.
 */
export function findSimilar(
  word: string,
  candidates: readonly string[] | string[],
  options: Options = {}
): string[] {
  if (typeof word !== 'string') {
    throw new TypeError('Expected word to be a string')
  }

  let { maxScore = 3 } = options
  const { criteria = 0.5, prefix = '' } = options

  const matches = []
  for (const candidate of candidates) {
    if (typeof candidate !== 'string') {
      throw new TypeError('Candidates must be strings')
    }

    const length = Math.max(word.length, candidate.length)
    const score = leven(word, candidate)
    const similarity = (length - score) / length

    if (similarity >= criteria && score <= maxScore) {
      if (score < maxScore) {
        maxScore = score
        matches.length = 0
      }

      matches.push(prefix + candidate)
    }
  }

  return matches
}

/**
 * Suggests similar words in a list of words.
 *
 * @param word - The word to find similar words for.
 * @param candidates - An array of words to compare against.
 * @param options - Options for the function.
 * @returns A string of suggested words.
 */
export function didYouMean(
  word: string,
  candidates: readonly string[] | string[],
  options: Options = {}
): string {
  const matches = findSimilar(word, candidates, options)
  let message = 'Did you mean '

  if (matches.length > 0) {
    message += matches.length > 1 ? 'one of ' : ''
    message += `"${matches.join(', ')}"?`

    return message
  }

  return ''
}
