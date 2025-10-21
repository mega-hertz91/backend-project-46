import {Action} from "../constants.js";

const diff = (left, right) => {
  return Object.entries({...left, ...right})
    .sort()
    .map(([key, value]) => {

      // Source key exist key, compare key not exist
      if (Object.hasOwn(left, key) && !Object.hasOwn(right, key)) {
        return {key, value, action: Action.DELETE};
      }

      // Source key not exist, compare key exist
      if (!Object.hasOwn(left, key) && Object.hasOwn(right, key)) {
        return {key, value, action: Action.ADD};
      }

      // Source and compare keys exists
      if (Object.hasOwn(right, key) && Object.hasOwn(left, key)) {
        if(typeof left[key] === "object" && typeof right[key] === "object") {
          return {key, children: diff(left[key], right[key])};
        }

        return right[key] === left[key]
          ? {key, value}
          : {key, value: left[key], action: Action.UPDATE, replaceValue: right[key]};
      }
    })
};

export default diff;
