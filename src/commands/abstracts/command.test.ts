import { createMockGame } from "../../../tests/mocks/game.mock.js";
import { Game } from "../../core/game/game.js";
import { Command } from "./command.js";
import { UnexpectedArgumentsUserInputError } from "../../errors/core_errors.js";


// Create a subclass for testing purposes
// throwing an 
export class TestCommand extends Command {
  execute(game: Game): void {
    throw new UnexpectedArgumentsUserInputError("TESTING")
  }
}

describe('Command Class Unit Tests', () => {

  it('should initialise with an empty string for args by default', () => {
    const command = new TestCommand("");
    expect(command.args).toBe("");
  });
  
  
  it('should throw an UnexpectedArgumentsUserInputError when intialised with arguments', () => {
    expect(() => {
      new TestCommand("1,2,NORTH");
    }).toThrow(UnexpectedArgumentsUserInputError);
  });
  
  it('should NOT throw an UnexpectedArgumentsUserInputError when intialised with arguments with supportsArgs=true', () => {
    expect(() => {
      new TestCommand("1,2,NORTH", true);
    }).not.toThrow(UnexpectedArgumentsUserInputError);
  });

  
  it('should expose the abstract execute method that accepts a Game instance', () => {
    const command = new TestCommand();
    expect(typeof command.execute).toBe('function');
    });
  
  
  it('should NOT interact with the Game object before throwing the error', () => {
    const game = createMockGame();
    try {
      const command = new TestCommand();
      command.execute(game);
    } catch (error) {
      expect(game.getRobotPosition).not.toHaveBeenCalled();
      expect(game.setRobotPosition).not.toHaveBeenCalled();
      expect(game.moveRobot).not.toHaveBeenCalled();
      expect(game.rotateRobotLeft).not.toHaveBeenCalled();
      expect(game.rotateRobotRight).not.toHaveBeenCalled();
    }
  });
});