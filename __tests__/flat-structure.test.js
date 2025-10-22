// @ts-check

import {expect, test, describe} from '@jest/globals'
import {readFiles, parseFiles, diffObjects} from '../src/utils/index.js';
import {stylishFormatter} from "../src/formatters/index.js";

describe('Flat structure test', () => {
  const compareResult = '{\n' +
    '  - follow: false\n' +
    '    host: hexlet.io\n' +
    '  - proxy: 123.234.53.22\n' +
    '  - timeout: 50\n' +
    '  + timeout: 20\n' +
    '  + verbose: true\n' +
    '}'

  test('Test files format yaml, flat structure', async () => {
    const files = await readFiles('__fixtures__/1.yaml', '__fixtures__/2.yaml');

    const [src, compare] = await Promise.all(
      files.map(
        ({file, extension}) =>
          parseFiles(file, extension)
      )
    );

    const result = stylishFormatter(diffObjects(src, compare), ' ', 4);

    expect(result).toBe(compareResult)
  })

  test('Test files format json, flat structure', async () => {
    const files = await readFiles('__fixtures__/1.json', '__fixtures__/2.json');

    const [src, compare] = await Promise.all(
      files.map(
        ({file, extension}) =>
          parseFiles(file, extension)
      )
    );

    const result = stylishFormatter(diffObjects(src, compare), ' ', 4);

    expect(result).toBe(compareResult)
  })

  test('Test files format json to yaml, flat structure', async () => {
    const files = await readFiles('__fixtures__/1.json', '__fixtures__/2.yaml');

    const [src, compare] = await Promise.all(
      files.map(
        ({file, extension}) =>
          parseFiles(file, extension)
      )
    );

    const result = stylishFormatter(diffObjects(src, compare), ' ', 4);

    expect(result).toBe(compareResult)
  })

  test('Test files format yaml to json, flat structure', async () => {
    const files = await readFiles('__fixtures__/1.yaml', '__fixtures__/2.json');

    const [src, compare] = await Promise.all(
      files.map(
        ({file, extension}) =>
          parseFiles(file, extension)
      )
    );

    const result = stylishFormatter(diffObjects(src, compare), ' ', 4);

    expect(result).toBe(compareResult)
  })
})
