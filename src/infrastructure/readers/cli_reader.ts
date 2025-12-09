import { Game } from "../../core/game/game.js"
import { Reader } from "../../application/ports/reader.js"
import { Command } from "../../commands/abstracts/command.js"
import { NoCommandError } from "../../errors/core_errors.js";

import { CommandFactoryActiveState } from "../../commands/factories/command_factory_active_state.js";
import { CommandFactoryIdleState } from "../../commands/factories/command_factory_idle_state.js";
import { CommandFactory } from "../../commands/factories/abstracts/command_factory.js";





export class CLIReader extends Reader {
  private idleStateCommands: CommandFactory = CommandFactoryIdleState;
  private activeStateCommands: CommandFactory = CommandFactoryActiveState;
  
  constructor(
    public game: Game = game,
  ) {
    super()
  }
  
  private lex(rawInput: string): [string, string] {
    const splitInput = rawInput.trim().split(" ");
    if (splitInput.length) {
      const command = splitInput.at(0) ?? "";
      const args = splitInput.slice(1).join(" ");
      return [command, args];
    }
    throw new NoCommandError(`No command to parse.`); 
  }
  
  private parse(commandName: string, args = ""): Command {
    if (this.game.isActive) {
      return this.activeStateCommands.create(commandName, args.trim())
    }
    return this.idleStateCommands.create(commandName, args.trim())
  }
  
  public read(rawInput: string): Command {
    const [rawCommand, rawArgs] = this.lex(rawInput);
    const command = this.parse(rawCommand, rawArgs);
    return command
  }
}