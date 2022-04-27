import test from 'ava'
import { findSimilar, didYouMean } from '../dist/index.js'

test('singgle suggestions', t => {
  const suggestions = didYouMean('foos', ['bar', 'baz', 'foo'])
  t.is(suggestions, 'Did you mean "foo"?')
})

test('multiple suggestions', t => {
  const suggestions = didYouMean('foos', ['bar', 'baz', 'foo', 'fool'])
  t.is(suggestions, 'Did you mean one of "foo, fool"?')
})

test('no suggestions', t => {
  const suggestions = didYouMean('xoo', ['bar', 'baz', 'foo', 'fool'], {
    criteria: 1
  })
  t.is(suggestions, '')
})

test('maxScore', t => {
  const exac = findSimilar('foo', ['bar', 'baz', 'foo', 'fool'], {
    maxScore: 0
  })
  const similar = findSimilar('foos', ['bar', 'baz', 'foo', 'fool'], {
    maxScore: 0
  })

  t.is(String(exac), 'foo')
  t.is(String(similar), '')
})

test('criteria', t => {
  const exac = findSimilar('foo', ['bar', 'baz', 'foo', 'fool'], {
    criteria: 1
  })
  const similar = findSimilar('foos', ['bar', 'baz', 'foo', 'fool'], {
    criteria: 1
  })

  t.is(String(exac), 'foo')
  t.is(String(similar), '')
})

test('prefix', t => {
  const similar = findSimilar('foos', ['bar', 'baz', 'foo', 'fool'], {
    prefix: '--'
  })
  t.is(String(similar), '--foo,--fool')
})
