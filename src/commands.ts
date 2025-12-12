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


abstract class BaseCommand {
  public readonly name: string;
  public args: string;
  public is_valid: boolean;
  public uses_args: boolean;

  constructor(name = "", uses_args = false) {
    this.name = name;
    this.args = "";
    this.is_valid = true;
    this.uses_args = uses_args;
  }

  public set_args(args: string) {
    this.args = args;
  }

  public abstract execute(game: Game, args: string): void;
}


class PlaceCommand extends BaseCommand {

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

        game.robot.pos_x = x_pos;
        game.robot.pos_y = y_pos;
        game.robot.direction = direction;
        game.robot.is_placed = true;
        // need to validate the robot can be placed
    }
    return
  }
}


class CommandRegistry {

  private commandDict = new Map<string, BaseCommand>;

  public getDict(): Map<string, BaseCommand> {
    return this.commandDict
  }

  public register(commandInstance: BaseCommand): void {
    this.commandDict.set(commandInstance.name, commandInstance);
  }

  public getCommand(name: string): BaseCommand | undefined {
    return this.commandDict.get(name);
  }
}



export class Command {
  command: string;
  args: string;
  is_valid: boolean;

  constructor(command = "") {
    this.is_valid = true;
    this.command = command;
    this.args = "";
  }

  set_args(args: string) {
    this.args = args;
  }
}

export default Command
