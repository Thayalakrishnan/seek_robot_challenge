import { Game } from "../../core/game/game.js";
import { UnknownCommandError } from "../../errors/core_errors.js";
import { Command } from "../abstracts/command.js";


export class NullCommand extends Command {
  constructor(args = "") {
    super(args, true);
  }
  
  public execute(game: Game): void {
    throw new UnknownCommandError(`Invalid Command`);
  }
}