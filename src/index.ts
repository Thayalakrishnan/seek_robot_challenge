#!/usr/bin/env node

import { Table } from "./table.js";
import { Robot, DirArgs } from "./robot.js";
import { Game } from "./game.js";
import { Command } from "./commands.js";
import { CommandLineReader } from "./reader.js";
import { Renderer } from "./renderer.js";


type PlaceArgs = [number, number, DirArgs];
type DirectionField = Record<string, DirArgs>;


const DirectionDict: DirectionField = {
  NORTH: [0, 1, "⏫"],
  WEST: [-1, 0, "⏪"],
  SOUTH: [0, -1, "⏬"],
  EAST: [1, 0, "⏩"],
}

//
function parse_argument_place(command: Command): [boolean, PlaceArgs]  {
  const strings = command.args.split(",");
  if (strings.length === 3) {
      const x_pos = Number(strings[0]);
      const y_pos = Number(strings[1]);
      const dir_str = strings[2];
      const default_dir: [number, number, string] = [0, 0, "🟦"];
      const dir_int = dir_str in DirectionDict ? DirectionDict[dir_str] : default_dir;
      command.is_valid = true;
      return [true, [x_pos, y_pos, dir_int]]
  }
  command.is_valid = false;
  return [false, [-1, -1, [0, 0, "🟦"]]]
}


function evaluate_command_place(command: Command, game: Game): void {
  const [is_valid, porcessed_args] = parse_argument_place(command);

  if (is_valid) {
    const x_pos = porcessed_args[0];
    const y_pos = porcessed_args[1];
    const dir = porcessed_args[2];

    game.robot.pos_x = x_pos;
    game.robot.pos_y = y_pos;
    game.robot.direction = dir;
    game.robot.is_placed = true;

    // need to validate the robot can be placed
  }
}


function evaluate_command(command: Command, game: Game): void {
  if (command.command === "PLACE") {
    // validate placement
    evaluate_command_place(command, game);
    return
  }
  else if (game.robot.is_placed) {
    switch(command.command) {
      case "LEFT":
          return
      case "RIGHT":
          return
      case "MOVE":
          return
      case "REPORT":
          return
      case "EXIT":
          return
      case "NULL":
          return
    }
  }
}

function main() {
  const renderer = new Renderer();
  const reader = new CommandLineReader();
  const table = new Table();
  const robot = new Robot();
  const game = new Game(table, robot);

  const command = reader.read("PLACE 1,2,NORTH");
  evaluate_command(command, game);
  renderer.print_frame(game);
  console.log("Done");
}

main();
