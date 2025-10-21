import { readFile } from "fs/promises";
import jsYaml from "js-yaml";
import path from "path";
import {DEFAULT_CHARSET, Extension} from "../constants.js";

const parseContent = async (content, type) => {
  if (type === Extension.JSON) {
    return await JSON.parse(content);
  }

  if (type === Extension.YAML || type === Extension.YML) {
    return await jsYaml.load(content);
  }

  return "";
};

const diff = (left, right) => {
  const diff = Object.entries({ ...left, ...right }).sort();
  const res = ['{', '\n'];

  for (const [key, value] of diff) {
    if (Object.hasOwn(left, key) && !Object.hasOwn(right, key)) {
      res.push(` - ${key}: ${value}\n`);
    }

    if (!Object.hasOwn(left, key) && Object.hasOwn(right, key)) {
      res.push(` + ${key}: ${value}\n`);
    }

    if (Object.hasOwn(right, key) && Object.hasOwn(left, key)) {
      const item =
        left[key] === right[key]
          ? `   ${key}: ${value}\n`
          : ` - ${key}: ${right[key]}\n + ${key}: ${left[key]}\n`;
      res.push(item);
    }
  }

  res.push('}')

  return res.join('');
};

const readFiles = async (...files) => {
  try {
    const filePromises = files.map((filePath) =>
      readFile(path.resolve(filePath), DEFAULT_CHARSET)
        .then((file) => ({
          extension: filePath.split('.').at(-1),
          file
        }))
    );

    return await Promise.all(filePromises);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

const run = async (source, comparable) => {
  const contents = await readFiles(source, comparable);

  const [src, compare] = await Promise.all(contents.map(({ file, extension }) => parseContent(file, extension)));

  const result = diff(src, compare);

  console.log(result);
}

export default async (program) => {
  await program
    .argument("<filepath1>")
    .argument("<filepath2>")
    .option("-f --format [type]", "output format")
    .action(run)
};
