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
export declare type Options = {
    /**
     * Maximum levenshtein distance threshold.
     *
     * @default 3
     */
    maxScore?: number;
    /**
     * The similarity threshold, a number between 0 and 1.
     *
     * @default 0.5
     */
    criteria?: number;
    /**
     * A string to prepend to the suggested word.
     *
     * @default ''
     */
    prefix?: string;
};
/**
 * Finds similar word(s) in a list of words.
 *
 * @param word - The word to find similar words for.
 * @param candidates - An array of words to compare against.
 * @param options - Options for the function.
 * @returns An array of similar words.
 */
export declare function findSimilar(word: string, candidates: readonly string[] | string[], options?: Options): string[];
/**
 * Suggests similar words in a list of words.
 *
 * @param word - The word to find similar words for.
 * @param candidates - An array of words to compare against.
 * @param options - Options for the function.
 * @returns A string of suggested words.
 */
export declare function didYouMean(word: string, candidates: readonly string[] | string[], options?: Options): string;
