import { findSimilar, didYouMean } from '../dist/index.js'

test('singgle suggestions', () => {
  const suggestions = didYouMean('foos', ['bar', 'baz', 'foo'])
  expect(suggestions).toBe('Did you mean "foo"?')
})

test('multiple suggestions', () => {
  const suggestions = didYouMean('foos', ['bar', 'baz', 'foo', 'fool'])
  expect(suggestions).toBe('Did you mean one of "foo, fool"?')
})

test('no suggestions', () => {
  const suggestions = didYouMean('xoo', ['bar', 'baz', 'foo', 'fool'], {
    criteria: 1
  })
  expect(suggestions).toBe('')
})

test('maxScore', () => {
  const exac = findSimilar('foo', ['bar', 'baz', 'foo', 'fool'], {
    maxScore: 0
  })
  const similar = findSimilar('foos', ['bar', 'baz', 'foo', 'fool'], {
    maxScore: 0
  })

  expect(String(exac)).toBe('foo')
  expect(String(similar)).toBe('')
})

test('criteria', () => {
  const exac = findSimilar('foo', ['bar', 'baz', 'foo', 'fool'], {
    criteria: 1
  })
  const similar = findSimilar('foos', ['bar', 'baz', 'foo', 'fool'], {
    criteria: 1
  })

  expect(String(exac)).toBe('foo')
  expect(String(similar)).toBe('')
})

test('prefix', () => {
  const similar = findSimilar('foos', ['bar', 'baz', 'foo', 'fool'], {
    prefix: '--'
  })
  expect(String(similar)).toBe('--foo,--fool')
})
