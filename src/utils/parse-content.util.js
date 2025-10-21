import {Extension} from "../constants.js";
import jsYaml from "js-yaml";

export default (content, type) => {
  if (type === Extension.JSON) {
    return JSON.parse(content);
  }

  if (type === Extension.YAML || type === Extension.YML) {
    return jsYaml.load(content);
  }

  return "";
};
