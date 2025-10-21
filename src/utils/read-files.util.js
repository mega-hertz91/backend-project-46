import {readFile} from "fs/promises";
import path from "path";
import {DEFAULT_CHARSET} from "../constants.js";

// {file, extension}
export default async (...files) => {
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
