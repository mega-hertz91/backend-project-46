import {diffObjects, parseFiles, readFiles} from "../utils/index.js";
import {Format} from "../constants.js";
import {plainFormatter, stylishFormatter} from "../formatters/index.js";

export default async (source, comparable, format = Format.STYLISH) => {
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
