import { readFile } from "fs/promises";
import path from "path";
import { DEFAULT_CHARSET } from "./constants.js";

const parseContent = (content, type) => {
  if (type === "json") {
    return JSON.parse(content);
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

const readFiles = async (...filePaths) => {
  const files = filePaths.slice(0, 2);
  const [fileOneType, fileTwoType] = files.map((file) =>
    file.split(".").at(-1)
  );
  try {
    const filePromises = files.map((filePath) =>
      readFile(path.resolve(filePath), DEFAULT_CHARSET)
    );
    const [fileOne, fileTwo] = await Promise.all(filePromises);
    console.log(
      diff(
        parseContent(fileOne, fileOneType),
        parseContent(fileTwo, fileTwoType)
      )
    );
  } catch (e) {
    console.log(e.message);
  }
};

export default async (program) => {
  await program
    .argument("<filepath1>")
    .argument("<filepath2>")
    .option("-f --format [type]", "output format")
    .action(readFiles);
};
