// @ts-check

import { expect, test, describe } from '@jest/globals'
import { genDiff } from '../src/services/index.js'

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

describe('Flat structure test', () => {
  test('Test files format yaml, flat structure', () => {
    const result = genDiff('__fixtures__/1.yaml', '__fixtures__/2.yaml')

    expect(result).toBe(stylishResult)
  })

  test('Test files format yaml, flat structure', () => {
    const result = genDiff('__fixtures__/1.yaml', '__fixtures__/2.yaml', 'plain')

    expect(result).toBe(plainResult)
  })
})
