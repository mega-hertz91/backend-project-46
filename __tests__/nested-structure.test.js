// @ts-check

import {expect, test, describe} from '@jest/globals'
import {readFiles, parseFiles, diffObjects} from '../src/utils/index.js';
import {plainFormatter, stylishFormatter} from "../src/formatters/index.js";

const stylishResult = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
  - replace: true
  + replace: false
    test: true
}`

const plainResult = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From  to so much
Property 'common.setting6.ops' was added with value: vops
Property 'group1.baz' was updated. From bas to bars
Property 'group1.nest' was updated. From [complex value] to str
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
Property 'replace' was updated. From true to false`

describe('Nested structure test', () => {
  test('Test files format json, nested structure', async () => {
    const files = await readFiles('__fixtures__/3.json', '__fixtures__/4.json');

    const [src, compare] = await Promise.all(
      files.map(
        ({file, extension}) =>
          parseFiles(file, extension)
      )
    );

    const result = stylishFormatter(diffObjects(src, compare), ' ', 4);

    expect(result).toBe(stylishResult)
  })

  test('Test files format yaml, nested structure', async () => {
    const files = await readFiles('__fixtures__/3.yaml', '__fixtures__/4.yaml');

    const [src, compare] = await Promise.all(
      files.map(
        ({file, extension}) =>
          parseFiles(file, extension)
      )
    );

    const result = stylishFormatter(diffObjects(src, compare), ' ', 4);

    expect(result).toBe(stylishResult)
  })

  test('Test files format yaml to json, nested structure', async () => {
    const files = await readFiles('__fixtures__/3.yaml', '__fixtures__/4.json');

    const [src, compare] = await Promise.all(
      files.map(
        ({file, extension}) =>
          parseFiles(file, extension)
      )
    );

    const result = stylishFormatter(diffObjects(src, compare), ' ', 4);

    expect(result).toBe(stylishResult)
  })

  test('Test files format json to yaml, nested structure', async () => {
    const files = await readFiles('__fixtures__/3.json', '__fixtures__/4.yaml');

    const [src, compare] = await Promise.all(
      files.map(
        ({file, extension}) =>
          parseFiles(file, extension)
      )
    );

    const result = stylishFormatter(diffObjects(src, compare), ' ', 4);

    expect(result).toBe(stylishResult)
  })

  test('Test files format json to yaml, nested structure', async () => {
    const files = await readFiles('__fixtures__/3.json', '__fixtures__/4.yaml');

    const [src, compare] = await Promise.all(
      files.map(
        ({file, extension}) =>
          parseFiles(file, extension)
      )
    );

    const result = plainFormatter(diffObjects(src, compare));

    expect(result).toBe(plainResult)
  })
})
