import { Command } from "../../../commands/abstracts/command.js";
import { Game } from "../../../core/game/game.js";
import { Evaluator } from "./evaluator.js";


class TestEvaluator extends Evaluator {
  public evaluate(command: Command): void { return };
}


describe('Evaluator Abstract Class Unit Tests', () => {

  it('should initialise when a game instance is passed in', () => {
    const game = new Game();
    const evaluator = new TestEvaluator(game);
    expect(evaluator).toBeInstanceOf(Evaluator);
  });
  
  
  it('should expose the abstract evaluate method that accepts a Command Instance', () => {
    const game = new Game();
    const evaluator = new TestEvaluator(game);
    expect(typeof evaluator.evaluate).toBe('function');
    });
    
});