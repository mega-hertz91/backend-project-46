import {Action, Symbol} from "../constants.js";

const normalizeValue = (value, cb) => {
  switch (typeof value) {
    case "number": return parseInt(value);
    case "object": return value ? cb(Object.entries(value).map(([key, value]) => ({key, value}))) : value;
    default: return value;
  }
}

const stylishFormatter = (arr, replacer = ' ', repeater = 2, step = 1) => {
  const res = arr.map(({key, value, replaceValue, action, children}) => {
    if (children) {
      return replacer.repeat(repeater * step) +
        key +
        ': ' +
        stylishFormatter(children, replacer, repeater, step + 1)
    }

    if (action === Action.UPDATE) {
      return replacer.repeat((repeater * step) - 2) +
        Symbol[Action.DELETE] + key + ': ' +
        normalizeValue(value, (value) => stylishFormatter(value, replacer, repeater, step + 1)) +
        '\n' +
        replacer.repeat((repeater * step) - 2) +
        Symbol[Action.ADD] + key + ': ' + normalizeValue(replaceValue, (value) => stylishFormatter(value, replacer, repeater, step + 1))
    }


    return replacer.repeat(action ? (repeater * step) -2 : repeater * step) +
      (action ? Symbol[action] + key: key) + ': ' + normalizeValue(value, (value) => stylishFormatter(value, replacer, repeater, step + 1))
  })


  return [
    '{',
    ...res,
    replacer.repeat(
      (repeater * step) - repeater
    ) +
    '}'
  ]
    .join('\n')
};

export default stylishFormatter;


