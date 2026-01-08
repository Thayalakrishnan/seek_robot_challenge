import { Command } from "../commands/abstracts/command.js";
import { COMMANDS } from "../commands/commands.constants.js";
import { CommandType } from "../commands/commands.types.js";

import { RightCommand } from "../commands/right_command/right_command.js";
import { LeftCommand } from "../commands/left_command/left_command.js";
import { MoveCommand } from "../commands/move_command/move_command.js";
import { PlaceCommand } from "../commands/place_command/place_command.js";
import { ReportCommand } from "../commands/report_command/report_command.js";
import { ExitCommand } from "../commands/exit_command/exit_command.js";
import { AddobsCommand } from "../commands/addobs_command/addobs_command.js";

import { UnknownCommandUserInputError } from "../errors/core_errors.js";
import { CommandConstructor, CommandRegistry } from "./command_manager.types.js"


export class CommandManager {
  private registry: CommandRegistry = new Map();
  
  constructor() {
    this.register(COMMANDS.EXIT, ExitCommand);
    this.register(COMMANDS.PLACE, PlaceCommand);
    this.register(COMMANDS.LEFT, LeftCommand);
    this.register(COMMANDS.RIGHT, RightCommand);
    this.register(COMMANDS.MOVE, MoveCommand);
    this.register(COMMANDS.REPORT, ReportCommand);
    this.register(COMMANDS.ADDOBS, AddobsCommand);
  }
  
  /**
   * Register 
   * registers command klasses
   *
   * @param commandName - command as CommandType
   * @param klass - klass object
   * @returns none
   */
  public register(commandName: CommandType, klass: CommandConstructor): void {
    this.registry.set(commandName, klass);
  }
  
  /**
   * getAndCreateCommand
   *  
   * gets and creates the command instance
   * will return the default command if no command is supplied
   * @param commandName - name of command as a string
   * @param args - command args as string
   * @returns Command
   */
  public getAndCreateCommand(commandName: string, args: string): Command {
    const klass = this.registry.get(commandName);
    if (!klass) {
      throw new UnknownCommandUserInputError(commandName);
    }
    return new klass(args);  
  }
}
