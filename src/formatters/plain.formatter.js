import {Action} from "../constants.js";

const normalizeValue = (value) => {
  switch (typeof value) {
    case "number":
      return parseInt(value);
    case "object":
      return value ? {...value, toString() { return '[complex value]' } } : value;
    case "boolean":
      return value;
    default:
      return `'${value}'`;
  }
}

const addMessage = ({key, pathKey, value}) => {
  return `Property '${(pathKey ? pathKey + '.' : '') + key}' was added with value: ${normalizeValue(value)}`
}

const removeMessage = ({key, pathKey}) => {
  return `Property '${(pathKey ? pathKey + '.' : '') + key}' was removed`
}

const updateMessage = ({key, pathKey, value, replaceValue}) => {
  return `Property '${(pathKey ? pathKey + '.' : '') + key}' was updated. From ${normalizeValue(value)} to ${normalizeValue(replaceValue)}`
}

const generateMessage = ({action, ...item}) => {
  switch (action) {
    case Action.ADD:
      return addMessage(item)
    case Action.UPDATE:
      return updateMessage(item)
    case Action.DELETE:
      return removeMessage(item)
    default: return  'Property is not defined'
  }
}

const plainFormatter = (arr, pathKey = '') => {
  return arr
    .filter(({ action, children, ...item }) => {
      if(children) {
        return plainFormatter(children)
      }

      if (!action) {
        return false
      }

      return { action, children, ...item}
    })
    .map((item) => {
      if (item.children) {
        return plainFormatter(item.children, pathKey + (pathKey ? '.' : '') + item.key)
      }

      return generateMessage({...item, pathKey})
    }).flat().join('\n')
}

export default plainFormatter
