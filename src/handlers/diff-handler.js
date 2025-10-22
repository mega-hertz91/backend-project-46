import {Format} from "../constants.js";
import {genDiff}  from "../services/index.js";

const run = async (source, comparable, { format = Format.STYLISH }) => {
  await genDiff(source, comparable, format);
}

export default async (program) => {
  await program
    .argument("<filepath1>")
    .argument("<filepath2>")
    .option("-f --format [type]", "output format", "stylish")
    .action(run)
};
