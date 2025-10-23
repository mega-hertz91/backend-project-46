// @ts-check

import { expect, test, describe } from '@jest/globals'
import { genDiff } from '../src/services/index.js'
import { Format } from '../src/constants.js'

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
  test('Test yaml > yaml', () => {
    const result = genDiff('__fixtures__/1.yaml', '__fixtures__/2.yaml')

    expect(result).toBe(stylishResult)
  })

  test('Test json > json', () => {
    const result = genDiff('__fixtures__/1.json', '__fixtures__/2.json')

    expect(result).toBe(stylishResult)
  })

  test('Test json > yaml', () => {
    const result = genDiff('__fixtures__/1.json', '__fixtures__/2.yaml')

    expect(result).toBe(stylishResult)
  })
})

describe('Flat structure plain format', () => {
  test('Test yaml > yaml', () => {
    const result = genDiff('__fixtures__/1.yaml', '__fixtures__/2.yaml', Format.PLAIN)

    expect(result).toBe(plainResult)
  })

  test('Test json > json', () => {
    const result = genDiff('__fixtures__/1.json', '__fixtures__/2.json', Format.PLAIN)

    expect(result).toBe(plainResult)
  })

  test('Test json > yaml', () => {
    const result = genDiff('__fixtures__/1.json', '__fixtures__/2.yaml', Format.PLAIN)

    expect(result).toBe(plainResult)
  })
})
