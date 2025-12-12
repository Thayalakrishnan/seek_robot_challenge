import Game from "./game.js";

export type DirArgs = [number, number, string];
export type CommandsType = Record<string, number>;
type DirectionField = Record<string, DirArgs>;


const DirectionDict: DirectionField = {
  NONE: [0, 0, "🟦"],
  NORTH: [0, 1, "⏫"],
  WEST: [-1, 0, "⏪"],
  SOUTH: [0, -1, "⏬"],
  EAST: [1, 0, "⏩"],
}

export class Direction {
  public name: string;
  public i: number;
  public j: number;
  public tile: string;

  constructor(name = "", i = 0, j = 0, tile = "") {
    this.name = name;
    this.i = i;
    this.j = j;
    this.tile = tile;
  }
}

export class DirectionManager {

  private dirDict = new Map<string, Direction>;
  private nullDirection = new Direction("NONE", 0, 0, "🟦");

  constructor() {
    this.dirDict.set("NORTH", new Direction("NORTH", 0, 1, "⏫"));
    this.dirDict.set("WEST", new Direction("WEST", -1, 0, "⏪"));
    this.dirDict.set("SOUTH", new Direction("SOUTH", 0, -1, "⏫"));
    this.dirDict.set("EAST", new Direction("EAST", 1, 0, "⏩"));
    this.dirDict.set(this.nullDirection.name, this.nullDirection);
  }

  //public register(commandInstance: BaseCommand): void {
  //  this.dirDict.set(commandInstance.name, commandInstance);
  //}

  public getDirection(name = "NULL"): Direction {
    const direction: Direction = this.dirDict.get(name) ?? this.nullDirection;
    return direction
  }
}



export const ValidCommands: CommandsType = {
  PLACE: 0,
  MOVE: 1,
  REPORT: 2,
  LEFT: 3,
  RIGHT: 4,
  EXIT: 5,
}


export abstract class BaseCommand {
  public readonly name: string;
  public uses_args: boolean;

  constructor(name = "", uses_args = false) {
    this.name = name;
    this.uses_args = uses_args;
  }

  public abstract execute(args: string, game: Game): void;
}


export class NullCommand extends BaseCommand {

  constructor() {
      super('NULL');
  }

  public execute(): void {
    return
  }
}

export class ReportCommand extends BaseCommand {

  constructor() {
      super('REPORT', false);
  }

  public execute(args: string, game: Game): void {
    const pos_x_cur = game.robot.pos_x;
    const pos_y_cur = game.robot.pos_y;
    const dir_cur = game.robot.direction
    console.log(`[REPORT] position: ${pos_x_cur}, ${pos_y_cur} direction: ${dir_cur}`);
    return
  }
}

export class PlaceCommand extends BaseCommand {

  constructor() {
      super('PLACE', true);
  }

  public execute(args: string, game: Game): void {
    const strings = args.split(",");
    if (strings.length === 3) {
        const x_pos = Number(strings[0]);
        const y_pos = Number(strings[1]);
        const direction = strings[2];

        // need to validate the robot can be placed
        if (game.table.is_within_table(x_pos, y_pos)) {
          game.robot.pos_x = x_pos;
          game.robot.pos_y = y_pos;
          game.robot.direction = direction;
          game.robot.is_placed = true;
        }
    }
    return
  }
}


export class MoveCommand extends BaseCommand {

  constructor() {
      super('MOVE', false);
  }

  public execute(args: string, game: Game): void {
    const move_amount = 1;

    const pos_x_cur = game.robot.pos_x;
    const pos_y_cur = game.robot.pos_y;

    const dir_cur = DirectionDict[game.robot.direction] ?? [0, 0, "🟦"];
    const dir_x_cur = dir_cur[0];
    const dir_y_cur = dir_cur[1];

    const pos_x_new = pos_x_cur + dir_x_cur*move_amount;
    const pos_y_new = pos_y_cur + dir_y_cur*move_amount;

    if (game.table.is_within_table(pos_x_new, pos_y_new)) {
      game.robot.pos_x = pos_x_new;
      game.robot.pos_y = pos_y_new;
      console.log(`[MOVE] moving  ${pos_x_cur}, ${pos_y_cur} --> ${pos_x_new}, ${pos_y_new}`);
    } else {
      console.log(`[MOVE] cant move ${pos_x_cur}, ${pos_y_cur} --> ${pos_x_new}, ${pos_y_new}`);
    }
    return
  }
}


export class CommandRegistry {

  private commandDict = new Map<string, BaseCommand>;
  private nullCommand = new NullCommand();

  public getDict(): Map<string, BaseCommand> {
    return this.commandDict
  }

  public register(commandInstance: BaseCommand): void {
    this.commandDict.set(commandInstance.name, commandInstance);
  }

  public getCommand(name = "NULL"): BaseCommand {
    const command: BaseCommand = this.commandDict.get(name) ?? this.nullCommand;
    return command
  }
}


export default BaseCommand
