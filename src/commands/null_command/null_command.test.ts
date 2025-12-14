import { createMockGame } from "../../../tests/mocks/mock_game.js";
import { Position } from "../../core/entities/position/position.js";
import { Game } from "../../core/game/game.js";
import { NullCommand } from "./null_command.js";
import { UnknownCommandError, UnexpectedArgumentsError } from "../../errors/core_errors.js";


describe('NullCommand Unit Tests', () => {
  let game: Game;
  let placePosition: Position;
  let nullCommand: NullCommand;

  beforeEach(() => {
    game = createMockGame();
    nullCommand = new NullCommand();
  });

  it('should initialise with args', () => {
    const testArgs = "testArgs";
    const command = new NullCommand(testArgs);
    expect(command.args).toBe(testArgs);
  });
  
  it('should intialise without args', () => {
    const command = new NullCommand();
    expect(command.args).toBe("");
  });

  it('should throw an UnknownCommandError when executed', () => {
    const command = new NullCommand();
    expect(() => {
      command.execute(game);
    }).toThrow(UnknownCommandError);
    
    // Assert that the error is an instance of Error
    expect(() => {
      command.execute(game);
    }).toThrow(Error);
  });

  // Test Case 3: No Interaction with Game
  it('should NOT interact with the Game object before throwing the error', () => {
    // We wrap the execution in a try/catch since it is expected to throw
    try {
      nullCommand.execute(game);
    } catch (e) {
      // Error was thrown, now check that no methods were called
      expect(game.getRobotPosition).not.toHaveBeenCalled();
      expect(game.moveRobot).not.toHaveBeenCalled();
      expect(game.rotateRobotLeft).not.toHaveBeenCalled();
      // Check that the isActive status wasn't modified either (if it were mutable on the mock)
    }
  });
});