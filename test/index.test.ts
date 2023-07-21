import { findSimilar, didYouMean } from '../src/index.js'

test('findSimilar', () => {
  const words = ['foo', 'bar', 'baz']

  const result1 = findSimilar('fo', words)
  expect(result1).toEqual(['foo'])

  const result2 = findSimilar('qux', words)
  expect(result2).toEqual([])
})

test('didYouMean', () => {
  const words = ['foo', 'bar', 'baz']

  const result1 = didYouMean('fo', words)
  expect(result1).toBe('Did you mean "foo"?')

  const result2 = didYouMean('qux', words)
  expect(result2).toBe('')
})

test('findSimilar with options', () => {
  const words = ['foo', 'bar', 'baz']

  const result1 = findSimilar('fo', words, { maxScore: 2 })
  expect(result1).toEqual(['foo'])

  const result2 = findSimilar('qux', words, { criteria: 0.2 })
  expect(result2).toEqual([])
})

test('prefix', () => {
  const result = findSimilar('foos', ['bar', 'baz', 'foo', 'fool'], {
    prefix: '--'
  })
  expect(result).toEqual(['--foo', '--fool'])
})

test('multiple matches', () => {
  const words = ['foo', 'foe', 'fop']

  const result = findSimilar('fo', words)
  expect(result).toEqual(['foo', 'foe', 'fop'])

  const result2 = didYouMean('fo', words)
  expect(result2).toBe('Did you mean one of "foo, foe, fop"?')
})

test('more candidates', () => {
  const words = ['foo', 'bar', 'baz', 'qux', 'quux']

  const result = findSimilar('qu', words)
  expect(result).toEqual(['qux'])
})

test('non-string input', () => {
  const words = ['foo', 'bar', 'baz']

  expect(() => findSimilar(123 as never, words)).toThrow()
  expect(() => findSimilar('foo', [1, 2, 3] as never)).toThrow()
})

test('empty inputs', () => {
  const words = ['foo', 'bar', 'baz']

  expect(findSimilar('', words)).toEqual([])
  expect(didYouMean('', words)).toBe('')

  expect(findSimilar('foo', [])).toEqual([])
  expect(didYouMean('foo', [])).toBe('')
})
