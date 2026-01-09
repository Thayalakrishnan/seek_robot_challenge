import { Coordinate } from "../../core/entities/coordinate/coordinate.js";

import { Game } from "../../core/game/game.js";
import { InvalidArgumentSyntaxUserInputError } from "../../errors/core_errors.js";
import { Command } from "../abstracts/command.js";


export class PathtoCommand extends Command {
  static regexPattern = new RegExp(`^(?<x>\\d+),(?<y>\\d+)$`);
  public supportsArgs = true;
  
  constructor(args = "") {
    super(args, true);
  }
  
  public parseArgs(args: string): Coordinate {
    const m = PathtoCommand.regexPattern.exec(args);
    if (m && m?.groups) {
      const x = parseInt(m?.groups.x);
      const y = parseInt(m?.groups.y);
      return new Coordinate(x, y);
    }
    throw new InvalidArgumentSyntaxUserInputError(`${args}`); 
  }
  
  public execute(game: Game): string {
    const coordinate = this.parseArgs(this.args);
    const path = game.findPath(coordinate);
    return path
  }
  
}