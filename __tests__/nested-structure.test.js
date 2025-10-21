// @ts-check

import {expect, test, describe} from '@jest/globals'
import {readFiles, parseFiles, diffObjects} from '../src/utils/index.js';
import {JsonFormatter} from "../src/formatters/index.js";

describe('Nested structure test', () => {
  const compareResult = `{
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

  test('Test files format json, nested structure', async () => {
    const files = await readFiles('__fixtures__/3.json', '__fixtures__/4.json');

    const [src, compare] = await Promise.all(
      files.map(
        ({file, extension}) =>
          parseFiles(file, extension)
      )
    );

    const result = JsonFormatter(diffObjects(src, compare), ' ', 4);

    expect(result).toBe(compareResult)
  })
})
