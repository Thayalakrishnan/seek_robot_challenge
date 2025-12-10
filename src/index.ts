#!/usr/bin/env node

const DirectionMap = {
  NORTH: [0, 1],
  WEST: [-1, 0],
  SOUTH: [0, -1],
  EAST: [1, 0],
}

type DirArgs = [number, number];
type PlaceArgs = [number, number, DirArgs];


class Map {
  width: number;
  height: number;

  constructor(x = 5, y = 5) {
    this.width = x;
    this.height = y;

    console.log(``);
    console.log(`New Map`);
    console.log(`Map size: width: ${this.width} height: ${this.height}`);
  }
}


class Robot {
  map: Map | undefined;
  pos_x: number;
  pos_y: number;
  direction: DirArgs;
  is_placed: boolean;

  constructor(map: Map | undefined, x = -1, y = -1, direction:DirArgs = [0, 0]) {
    this.is_placed = false;
    this.map = map;
    this.pos_x = x;
    this.pos_y = y;
    this.direction = direction;

    console.log(``);
    console.log(`New Robot`);
    console.log(`Robot At: pos_x: ${this.pos_x} pos_y: ${this.pos_y} map: width: ${this.map?.width} height: ${this.map?.height}`);
  }
}

class Game {
  map: Map;
  robot: Robot;

  constructor(map: Map, robot: Robot) {
    this.map = map;
    this.robot = robot;
  }

  update() {
    console.log(``);
    console.log(`Robot Position`);
    console.log(`pos_x: ${this.robot.pos_x}`);
    console.log(`pos_y: ${this.robot.pos_y}`);
    console.log(`direction: ${this.robot.direction}`);
  }
}


class Instruction {
  command: string;
  args: string;
  is_valid: boolean;
  place_args: PlaceArgs;

  constructor(command: string, args: string) {
    this.is_valid = true;
    this.command = command;
    this.args = args;
    this.place_args = [-1, -1, [0, 0]];
  }

  //validate_command() {}
  //validate_args() {}
  //process_args() {}
  //process_command() {}
}


//class PlaceCommand extends Command {
//  place_args: [number, number, [number, number]];
//
//  constructor(args: [number, number, [number, number]] = [-1, -1, [0, 0]]) {
//    super("PLACE", "");
//    this.place_args = args;
//  }
//}


//class Instruction {
//  command: string;
//  args: [];
//
//  constructor(key: string, args = []) {
//    this.command = key;
//    this.args = args;
//  }
//}


/**
 * processes the raw input from the command line
 * @param raw_input
 * @returns a tuple of the command and any args
 */
function validate_input(raw_input: string): [boolean , string[]] {
  const strings = raw_input.split(" ");
  if ((strings.length > 0) && (strings.length < 3)) {
    return [true, strings]
  }
  return [false, strings]
}


/**
 * processes the raw input from the command line
 * @param raw_input
 * @returns a tuple of the command and any args
 */
function process_input(valid_input_arr: string[]): Instruction {
  const args = valid_input_arr.length == 1 ? "" : valid_input_arr[1];
  const new_com = new Instruction(valid_input_arr[0], args)
  return new_com
}


/**
 * processes the command
 * @param raw_command
 * @returns a tuple of the command and any args
 */
function process_command(valid_command: Instruction): void {
  valid_command.is_valid = true;
}

function parse_argument_place(instruction: Instruction): void  {
    const strings = instruction.args.split(",");
    if (strings.length === 3) {
        const x_pos = Number(strings[0]);
        const y_pos = Number(strings[1]);
        const dir_str = strings[2];
        const dir_int = dir_str in DirectionMap ? DirectionMap[dir_str as keyof typeof DirectionMap] : [0, 0];

        instruction.is_valid = true;
        instruction.place_args = [x_pos, y_pos, dir_int];
    }
    instruction.is_valid = false;
}


/**
 * processes the argument
 * @param raw_argument
 * @returns a tuple of the command and any args
 * [boolean, [number, number, number[]]]
 */
function process_argument(instruction: Instruction): void {
    switch(instruction.command) {
        case "PLACE":
          parse_argument_place(instruction);
          break
        default:
            break
    }
}



function handle_command_place(args: [number, number, DirArgs], game: Game): void {
    const x_pos = args[0];
    const y_pos = args[1];
    const dir = args[2];

    game.robot.pos_x = x_pos;
    game.robot.pos_y = y_pos;
    game.robot.direction = dir;
    game.robot.is_placed = true;

}

function handle_command(instruction: Instruction, game: Game): void {
    switch(instruction.command) {
        case "PLACE":
            handle_command_place(instruction.place_args, game)
            return
        case "LEFT":
            return
        default:
            return
    }
}


function handle_input(game: Game, raw_input: string) {

  // check if the input is valid, correct length
  // correct number of elements after splitting
  const [is_valid, validated_input] = validate_input(raw_input);

  if (is_valid) {
    // if the nput is valid, we then process it
    const instruction = process_input(validated_input);
    process_command(instruction);

    // process the command
    //const [valid_command, command] = process_command(r_command);

    // valid command
    if (instruction.is_valid) {

        process_argument(instruction);

        // valid argument
        if (instruction.is_valid) {
            // if the robot is placed we process any command
            if (game.robot.is_placed) {
                handle_command(instruction, game);
            }
            else if (instruction.command === "PLACE") {
                // validate placement
                handle_command_place(instruction, game);
            }
        }
    }
  }
}


function main() {
    const map = new Map();
    const robot = new Robot(map);

    // create game
    const game = new Game(map, robot);

    handle_input(game, "PLACE 1,2,NORTH");
    game.update();

    handle_input(game, "PLACE 3,3,SOUTH");
    game.update();

    console.log("Done");
}


main();
