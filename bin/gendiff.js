#!/usr/bin/env node

import { Command } from 'commander'
import handlers from '../src/handlers/index.js'

const program = new Command()

// Base setting cli
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')

// Replace default help option
program.helpOption('-h, --help', 'output usage information')

// Depend handlers
handlers(program);

(async () => {
  await program.parse(process.argv)
})()
