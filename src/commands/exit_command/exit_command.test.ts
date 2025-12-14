import { createMockGame } from "../../../tests/mocks/mock_game.js";
import { Game } from "../../core/game/game.js";
import { ExitCommand } from "./exit_command.js";
import { ExitApplicationError, UnexpectedArgumentsError } from "../../errors/core_errors.js";


describe('ExitCommand Unit Tests', () => {
  let game: Game;

  beforeEach(() => {
    game = createMockGame();
  });

  it('should not initialise with args', () => {
    const testArgs = "testArgs";
    expect(() => {
      const command = new ExitCommand(testArgs);
    }).toThrow(UnexpectedArgumentsError);
    
  });
  
  it('should intialise without args', () => {
    const command = new ExitCommand();
    expect(command.args).toBe("");
  });

  it('should throw an ExitApplicationError when executed', () => {
    const command = new ExitCommand();
    expect(() => {
      command.execute(game);
    }).toThrow(ExitApplicationError);
    
    expect(() => {
      command.execute(game);
    }).toThrow(Error);
  });

  it('should NOT interact with the Game object before throwing the error', () => {
    try {
      const command = new ExitCommand();
      command.execute(game);
    } catch (e) {
      expect(game.getRobotPosition).not.toHaveBeenCalled();
      expect(game.moveRobot).not.toHaveBeenCalled();
      expect(game.rotateRobotLeft).not.toHaveBeenCalled();
    }
  });
});