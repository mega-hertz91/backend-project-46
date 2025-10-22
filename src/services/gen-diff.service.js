import { diffObjects, parseFiles, readFiles } from '../utils/index.js'
import { Format } from '../constants.js'
import { plainFormatter, stylishFormatter } from '../formatters/index.js'

export default (source, comparable, format = Format.STYLISH) => {
  const contents = readFiles(source, comparable)

  const [src, compare] = contents.map(
    ({ file, extension }) =>
      parseFiles(file, extension),
  )

  const diff = diffObjects(src, compare)

  switch (format) {
    case Format.STYLISH:
      return stylishFormatter(diff, ' ', 4)
    case Format.PLAIN:
      return plainFormatter(diff)
    default:
      return JSON.stringify(diff, null, 4)
  }
}
