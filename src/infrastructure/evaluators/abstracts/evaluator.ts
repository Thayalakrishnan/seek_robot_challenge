import { Command } from "../../../commands/abstracts/command.js";
import { Game } from "../../../core/game/game.js";


export abstract class Evaluator {
  constructor(public game: Game = game) {} 
  abstract evaluate(command: Command): void | string;
}
