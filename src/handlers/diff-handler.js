import {JsonFormatter} from "../formatters/index.js";
import {diffObjects, parseFiles, readFiles} from "../utils/index.js";

const run = async (source, comparable) => {
  const contents = await readFiles(source, comparable);

  const [src, compare] = await Promise.all(
    contents.map(
      ({file, extension}) =>
        parseFiles(file, extension)
    )
  );

  const result = JsonFormatter(diffObjects(src, compare), ' ', 4);

  console.log(result);
}

export default async (program) => {
  await program
    .argument("<filepath1>")
    .argument("<filepath2>")
    .option("-f --format [type]", "output format")
    .action(run)
};
