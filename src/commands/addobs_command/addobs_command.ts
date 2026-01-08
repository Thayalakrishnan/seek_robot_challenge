import { Coordinate } from "../../core/entities/coordinate/coordinate.js";
import { Obstacle } from "../../core/entities/obstacle/obstacles.js";

import { Game } from "../../core/game/game.js";
import { InvalidArgumentSyntaxUserInputError } from "../../errors/core_errors.js";
import { Command } from "../abstracts/command.js";


export class AddobsCommand extends Command {
  static regexPattern = new RegExp(`^(?<x>\\d+),(?<y>\\d+)$`);
  public supportsArgs = true;
  
  constructor(args = "") {
    super(args, true);
  }
  
  public parseArgs(args: string): Obstacle {
    const m = AddobsCommand.regexPattern.exec(args);
    if (m && m?.groups) {
      const x = parseInt(m?.groups.x);
      const y = parseInt(m?.groups.y);
      return new Obstacle(new Coordinate(x, y));
    }
    throw new InvalidArgumentSyntaxUserInputError(`${args}`); 
  }
  
  public execute(game: Game): void {
    const obstacle = this.parseArgs(this.args);
    game.addObstacle(obstacle);
  }
  
}