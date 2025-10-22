import { readFileSync } from 'fs'
import path from 'path'
import { DEFAULT_CHARSET } from '../constants.js'

// {file, extension}
export default (...files) => {
  try {
    return files.map(filePath => ({
      extension: filePath.split('.').at(-1),
      file: readFileSync(path.resolve(filePath), DEFAULT_CHARSET),
    }))
  }
  catch (e) {
    console.error(e)
  }
}
