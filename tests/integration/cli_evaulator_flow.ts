import { Game } from "../../src/core/game/game.js";
import { PlaceCommand } from "../../src/commands/place_command/place_command.js";
import { MoveCommand } from "../../src/commands/move_command/move_command.js";
import { CLIEvaluator } from "../../src/infrastructure/evaluators/cli_evaluator.js";


describe('Infrastructure Integration Tests', () => {

  let game: Game;

  beforeEach(() => {
    game = new Game(); 
  });

  describe('CLIEvaluator evaluate method', () => {
    let evaluator: CLIEvaluator;

    beforeEach(() => {
      evaluator = new CLIEvaluator(game);
    });

    it('should return PLACE command in the initial (idle) state', () => {
      game.isActive = false;
      
      // Should succeed
      expect(evaluator.evaluate("PLACE", "1,1,NORTH")).toBeInstanceOf(PlaceCommand);

      // Should fail
      expect(() => {
        evaluator.evaluate("MOVE", "");
      }).toThrow('Command "MOVE" is not recognized or available in the current state.');
    });

    it('should return MOVE command after the game state becomes active', () => {
      // Simulate placement to transition to the active state
      game.isActive = true;

      // Should succeed
      expect(evaluator.evaluate("MOVE", "")).toBeInstanceOf(MoveCommand);

      // Should succeed
      expect(evaluator.evaluate("PLACE", "0,0,EAST")).toBeInstanceOf(PlaceCommand);
    });
  });
});