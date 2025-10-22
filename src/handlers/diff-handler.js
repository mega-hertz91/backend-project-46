import {stylishFormatter, plainFormatter} from "../formatters/index.js";
import {diffObjects, parseFiles, readFiles} from "../utils/index.js";
import {Format} from "../constants.js";

const run = async (source, comparable, { format = Format.STYLISH }) => {
  const contents = await readFiles(source, comparable);

  const [src, compare] = await Promise.all(
    contents.map(
      ({file, extension}) =>
        parseFiles(file, extension)
    )
  );

  const diff = diffObjects(src, compare)

  switch (format) {
    case Format.STYLISH:
      return  console.log(
        stylishFormatter(diff, ' ', 4)
      )
    case Format.PLAIN:
      return  console.log(
        plainFormatter(diff)
      )
    default:
      return  console.log(
        JSON.stringify(diff, null, 4)
      )
  }
}

export default async (program) => {
  await program
    .argument("<filepath1>")
    .argument("<filepath2>")
    .option("-f --format [type]", "output format", "stylish")
    .action(run)
};
