import { Game } from "../../core/game/game.js";
import { Command } from "../abstracts/command.js";


export class RightCommand extends Command {
  public execute(game: Game): void {
    game.rotateRobotRight();
  }
}