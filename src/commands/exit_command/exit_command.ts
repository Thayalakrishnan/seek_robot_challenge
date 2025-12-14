import { Game } from "../../core/game/game.js";
import { ExitApplicationError } from "../../errors/core_errors.js";
import { Command } from "../abstracts/command.js";


export class ExitCommand extends Command {
  constructor(args = "") {
    super(args, false);
  }
  
  public execute(game: Game): void {
    throw new ExitApplicationError(`Exiting Application`);
  }
}