import { Position } from "../../core/entities/position/position.js";
import { Game } from "../../core/game/game.js";
import { InvalidArgumentSyntaxUserInputError } from "../../errors/core_errors.js";
import { Command } from "../abstracts/command.js";


export class PlaceCommand extends Command {
  static regexPattern = new RegExp(`^(?<x>\\d+),(?<y>\\d+),(?<direction>[A-Z]+)$`);
  public supportsArgs = true;
  
  constructor(args = "") {
    super(args, true);
  }
  
  public parseArgs(args: string): Position {
    const m = PlaceCommand.regexPattern.exec(args);
    if (m && m?.groups) {
      const x = parseInt(m?.groups.x);
      const y = parseInt(m?.groups.y);
      const direction = m?.groups.direction;
      return new Position(x, y, direction);
    }
    throw new InvalidArgumentSyntaxUserInputError(`${args}`); 
  }
  
  public execute(game: Game): void {
    const position = this.parseArgs(this.args);
    game.setRobotPosition(position);
  }
}