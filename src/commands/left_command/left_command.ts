import { Game } from "../../core/game/game.js";
import { Command } from "../abstracts/command.js";


export class LeftCommand extends Command {
  public execute(game: Game): void {
    game.rotateRobotLeft();
  }
}
