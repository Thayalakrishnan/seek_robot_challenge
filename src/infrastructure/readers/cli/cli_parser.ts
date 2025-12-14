import { Command } from "../../../commands/abstracts/command.js";
import { Game } from "../../../core/game/game.js";
import { Parser } from "../abstracts/parser.js";
import { CommandFactoryActiveState } from "../../factories/command_factory_active_state.js";
import { CommandFactoryIdleState } from "../../factories/command_factory_idle_state.js";
import { CommandFactory } from "../../factories/abstracts/command_factory.js";


export class CLIParser extends Parser {
  
  constructor(
    public game: Game,
    public idleStateCommands: CommandFactory = CommandFactoryIdleState,
    public activeStateCommands: CommandFactory = CommandFactoryActiveState
  ) {
    super();
    this.game = game;
  }
  
  public parse(commandName: string, args = ""): Command {
    if (this.game.isActive) {
      return this.activeStateCommands.create(commandName, args.trim())
    }
    return this.idleStateCommands.create(commandName, args.trim())
  }
}