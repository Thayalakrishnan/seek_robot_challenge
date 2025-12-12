import Game from "./game.js";

export type CommandsType = Record<string, number>;

export const ValidCommands: CommandsType = {
  PLACE: 0,
  MOVE: 1,
  REPORT: 2,
  LEFT: 3,
  RIGHT: 4,
  EXIT: 5,
}


//abstract class BaseCommand {
//  public readonly name: string;
//  public args: string;
//  public is_valid: boolean;
//  public uses_args: boolean;
//
//  constructor(name = "", uses_args = false) {
//    this.name = name;
//    this.args = "";
//    this.is_valid = true;
//    this.uses_args = uses_args;
//  }
//
//  public set_args(args: string) {
//    this.args = args;
//  }
//
//  public abstract execute(game: Game, args: string): void;
//}
//
//
//class PlaceCommand extends BaseCommand {
//
//    constructor() {
//        super('PLACE');
//    }
//
//    public execute(data: any): void {
//
//    }
//}
//
//
//class CommandRegistry {
//
//  private commandDict = new Map<string, BaseCommand>;
//
//  //constructor() {
//  //  super('PLACE');
//  //  //this.commandDict = new Map<string, BaseCommand>();
//  //}
//
//  public getDict(): Map<string, BaseCommand> {
//    return this.commandDict
//  }
//
//  public register(commandInstance: BaseCommand): void {
//    this.commandDict.set(commandInstance.name, commandInstance);
//  }
//
//  public getCommand(name: string): BaseCommand | undefined {
//    return this.commandDict.get(name);
//  }
//}



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
