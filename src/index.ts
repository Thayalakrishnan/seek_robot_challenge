#!/usr/bin/env node

import { Table } from "./table.js";
import { Robot } from "./robot.js";
import { Game } from "./game.js";
import { CommandLineReader } from "./reader.js";
import { Renderer } from "./renderer.js";
import { Evaluator } from "./evaluator.js";



function main() {
  const reader = new CommandLineReader();
  const evaluator = new Evaluator();

  const renderer = new Renderer();

  const table = new Table();
  const robot = new Robot();
  const game = new Game(table, robot);

  // the reader, reads the input, returns a command
  const [command, args] = reader.read("PLACE 1,2,NORTH");
  console.log(`[main] parsed command: ${command.name}`)

  // the evaluator evaluates the command
  evaluator.evaluate(command, args, game);

  // the renderer outputs the results
  renderer.print_frame(game);
  console.log("Done");
}

main();
