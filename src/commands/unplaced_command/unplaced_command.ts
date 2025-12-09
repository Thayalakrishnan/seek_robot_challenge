import { Game } from "../../core/game/game.js";
import { UnPlacedRobotError } from "../../errors/core_errors.js";
import { Command } from "../abstracts/command.js";


export class UnplacedCommand extends Command {
  constructor(args = "") {
    super(args, true);
  }
  
  public execute(game: Game): void {
    throw new UnPlacedRobotError(`Robot needs to be placed`);
  }
}