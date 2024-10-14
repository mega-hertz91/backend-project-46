#!/usr/bin/env bash

import { Command } from "commander";

const program = new Command();

program
  .name("gendiff")
  .argument("<filepath1>")
  .argument("<filepath2>")
  .description("Compares two configuration files and shows a difference.")
  .version("0.0.1");

program.option("-f --format [type]", "output format");
program.helpOption("-h, --help", "output usage information");

program.parse(process.argv);
