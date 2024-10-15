import { readFile } from "fs/promises";
import path from "path";
import { DEFAULT_CHARSET } from "./constants.js";

const readFiles = async (filePathOne, filePathTwo) => {
  try {
    const fileOne = await readFile(path.resolve(filePathOne), DEFAULT_CHARSET);
    const fileTwo = await readFile(path.resolve(filePathTwo), DEFAULT_CHARSET);
    console.log(JSON.parse(fileOne), JSON.parse(fileTwo));
  } catch {
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
