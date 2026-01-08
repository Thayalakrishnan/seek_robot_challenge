import { Command } from "../../commands/abstracts/command.js";
import { Game } from "../../core/game/game.js";
import { CLIEvaluator } from "./cli_evaluator.js";


// Create a subclass for testing purposes
export class TestCommand extends Command {
  execute(game: Game): void {
    return
  }
}

describe('CLIEvaluator Class Unit Tests', () => {

  it('should initialise when a game instance is passed in', () => {
    const game = new Game();
    const evaluator = new CLIEvaluator(game);
    expect(evaluator).toBeInstanceOf(CLIEvaluator);
  });
  
  it('should contain the evaluate method that accepts a Command Instance', () => {
    const game = new Game();
    const evaluator = new CLIEvaluator(game);
    expect(typeof evaluator.evaluate).toBe('function');
  });
  
  it('should return nothing', () => {
    const game = new Game();
    const command = new TestCommand();
    const evaluator = new CLIEvaluator(game);
    const result = evaluator.evaluate(command);
    expect(result).toBeUndefined()
  });
    
});