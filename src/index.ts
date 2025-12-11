#!/usr/bin/env node


type DirArgs = [number, number];
type PlaceArgs = [number, number, DirArgs];
type DirectionField = Record<string, DirArgs>;
type CommandsType = Record<string, number>;


const DirectionMap: DirectionField = {
  NORTH: [0, 1],
  WEST: [-1, 0],
  SOUTH: [0, -1],
  EAST: [1, 0],
}

const ValidCommands: CommandsType = {
  PLACE: 0,
  MOVE: 1,
  REPORT: 2,
  LEFT: 3,
  RIGHT: 4,
  EXIT: 5,
}


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

  //validate_placement() {}
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

  constructor(command = "") {
    this.is_valid = true;
    this.command = command;
    this.args = "";
    this.place_args = [-1, -1, [0, 0]];
  }

  set_args(args: string) {
    this.args = args;
  }
}


// clean the input
function clean_input(raw_input: string): [boolean , string] {
  return [true, raw_input]
}


// processes the raw input from the command line
function validate_input(raw_input: string): [boolean , string[]] {
  const strings = raw_input.split(" ");
  if ((strings.length > 0) && (strings.length < 3)) {
    return [true, strings]
  }
  return [false, strings]
}


// processes the raw input from the command line
function process_input(valid_input_arr: string[]): [boolean, Instruction] {
  const command = valid_input_arr[0];
  const args = valid_input_arr.length > 1 ? valid_input_arr[1] : "";

  if (command in ValidCommands) {
    const instruction = new Instruction(command);
    if (command === "PLACE") {
      instruction.set_args(args)
    }
    return [true, instruction]
  }
  return [false, new Instruction()]
}


//
//function process_command(valid_command: Instruction): void {
//  valid_command.is_valid = true;
//}


//
function parse_argument_place(instruction: Instruction): [boolean, PlaceArgs]  {
  const strings = instruction.args.split(",");
  if (strings.length === 3) {
      const x_pos = Number(strings[0]);
      const y_pos = Number(strings[1]);
      const dir_str = strings[2];
      const default_dir: DirArgs = [0,0];
      const dir_int = dir_str in DirectionMap ? DirectionMap[dir_str] : default_dir;
      instruction.is_valid = true;
      return [true, [x_pos, y_pos, dir_int]]
  }
  instruction.is_valid = false;
  return [false, [-1, -1, [0, 0]]]
}


//function handle_command_place(args: [number, number, DirArgs], game: Game): void {
function handle_command_place(instruction: Instruction, game: Game): void {
  const [is_valid, porcessed_args] = parse_argument_place(instruction);

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


function handle_command(instruction: Instruction, game: Game): void {
  if (instruction.command === "PLACE") {
    // validate placement

    handle_command_place(instruction, game);
    return
  }
  else if (game.robot.is_placed) {
    switch(instruction.command) {
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
      //default:
      //    return
    }
  }
}


function handle_input(game: Game, raw_input: string) {

  const [is_clean, cleaned_input] = clean_input(raw_input);

  if (is_clean) {

    // check if the input is valid, correct length
    // correct number of elements after splitting
    const [is_valid, validated_input] = validate_input(cleaned_input);

    if (is_valid) {

      // if the nput is valid, we then process it
      const [is_instruction, instruction] = process_input(validated_input);

      // valid instruction
      if (is_instruction) {

        // if the robot is placed we process any instruction
        handle_command(instruction, game);

        //if (game.robot.is_placed) {
        //}
        //else if (instruction.command === "PLACE") {
        //  // validate placement
        //  handle_command_place(instruction, game);
        //}
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
