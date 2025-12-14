import { Game } from "../../core/game/game.js";
import { Command } from "../abstracts/command.js";



export class ReportCommand extends Command {
  public execute(game: Game): string {
    const position = game.getRobotPosition();
    const out = `Output: ${position.x},${position.y},${position.direction}\n`;
    return out
  }
}