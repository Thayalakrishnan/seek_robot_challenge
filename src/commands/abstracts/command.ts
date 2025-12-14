import { Game } from "../../core/game/game.js";
import { UnexpectedArgumentsError } from "../../errors/core_errors.js";


export abstract class Command {
  /**
   * abstract class Command
   * abstract Command class that all Commands shoul d
   * inherit from 
   * an error is thrown if args are assigned to the 
   * class and it doesnt take args
   *  
   * @param supportsArgs: boolean value whether this command takes args
   * @param args: args assigned to command
   * @returns none
   */
  public supportsArgs: boolean;
  public args: string;
  
  constructor(args = "", supportsArgs = false) {
    this.args = args;
    this.supportsArgs = supportsArgs;
    if (args.length && !this.supportsArgs) {
      throw new UnexpectedArgumentsError(`Unexpected Arguments ${args}`); 
    } 
  }

  /**
   * abstract execute
   * must be implemented for the comamnds functionality
   *   
   * @param game: takes the game engine
   * @param args: args assigned to command
   * @returns none
   */
  abstract execute(game: Game): void | string;
}