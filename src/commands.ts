import Game from "./game.js";

export type DirArgs = [number, number, string];
export type CommandsType = Record<string, number>;
type DirectionField = Record<string, DirArgs>;


const DirectionDict: DirectionField = {
  NORTH: [0, 1, "⏫"],
  WEST: [-1, 0, "⏪"],
  SOUTH: [0, -1, "⏬"],
  EAST: [1, 0, "⏩"],
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

export class PlaceCommand extends BaseCommand {

  constructor() {
      super('PLACE', true);
  }

  public execute(args: string, game: Game): void {
    const strings = args.split(",");
    if (strings.length === 3) {
        const x_pos = Number(strings[0]);
        const y_pos = Number(strings[1]);
        const dir_str = strings[2];
        const default_dir: [number, number, string] = [0, 0, "🟦"];
        const direction = dir_str in DirectionDict ? DirectionDict[dir_str] : default_dir;

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
