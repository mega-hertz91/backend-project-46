export const DEFAULT_CHARSET = 'utf-8'
export const Extension = {
  JSON: 'json',
  YAML: 'yaml',
  YML: 'yml',
}

export const Action = {
  ADD: 'add',
  DELETE: 'delete',
  UPDATE: 'update',
  SAVE: 'save',
}

export const Symbol = {
  [Action.ADD]: '+ ',
  [Action.DELETE]: '- ',
}

export const Format = {
  STYLISH: 'stylish',
  PLAIN: 'plain',
}

export const PIPELINE_TESTS = [
  {
    from: Extension.YAML,
    to: Extension.YAML,
  },
  {
    from: Extension.JSON,
    to: Extension.JSON,
  },
  {
    from: Extension.JSON,
    to: Extension.YAML,
  },
]
