#!/usr/bin/env node

import { Table } from "./table.js";
import { Robot } from "./robot.js";
import { Game } from "./game.js";
import { Reader, CommandLineReader } from "./reader.js";
import { Renderer } from "./renderer.js";
import { Evaluator } from "./evaluator.js";


function step(commandAsText:string, reader: Reader, evaluator: Evaluator, renderer: Renderer, game: Game) {
  // the reader, reads the input, returns a command
  const [command, args] = reader.read(commandAsText);
  console.log(`[step1] parsed command: ${command.name}`)
  // the evaluator evaluates the command
  evaluator.evaluate(command, args, game);
  // the renderer outputs the results
  renderer.print_frame(game);
}


function main() {
  const reader = new CommandLineReader();
  const evaluator = new Evaluator();

  const renderer = new Renderer();

  const table = new Table();
  const robot = new Robot();
  const game = new Game(table, robot);

  step("PLACE 1,2,NORTH", reader, evaluator, renderer, game);
  step("REPORT", reader, evaluator, renderer, game);
  step("MOVE", reader, evaluator, renderer, game);
  step("REPORT", reader, evaluator, renderer, game);

  console.log("Done");
}

main();
