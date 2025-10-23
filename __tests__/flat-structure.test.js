// @ts-check

import { expect, test, describe } from '@jest/globals'
import { genDiff } from '../src/services/index.js'
import { Format, PIPELINE_TESTS } from '../src/constants.js'

const stylishResult = '{\n'
  + '  - follow: false\n'
  + '    host: hexlet.io\n'
  + '  - proxy: 123.234.53.22\n'
  + '  - timeout: 50\n'
  + '  + timeout: 20\n'
  + '  + verbose: true\n'
  + '}'

const plainResult = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`

describe('Flat structure stylish format', () => {
  for (const { from, to } of PIPELINE_TESTS) {
    test(`Test ${from} > ${to}`, () => {
      const result = genDiff(`__fixtures__/1.${from}`, `__fixtures__/2.${to}`)

      expect(result).toBe(stylishResult)
    })
  }
})

describe('Flat structure plain format', () => {
  for (const { from, to } of PIPELINE_TESTS) {
    test(`Test ${from} > ${to}`, () => {
      const result = genDiff(`__fixtures__/1.${from}`, `__fixtures__/2.${to}`, Format.PLAIN)

      expect(result).toBe(plainResult)
    })
  }
})
