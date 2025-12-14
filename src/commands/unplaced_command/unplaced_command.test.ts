import { createMockGame } from "../../../tests/mocks/mock_game.js";
import { Game } from "../../core/game/game.js";
import { UnplacedCommand } from "./unplaced_command.js";
import { UnPlacedRobotError } from "../../errors/core_errors.js";


describe('UnplacedCommand Unit Tests', () => {
  let game: Game;

  beforeEach(() => {
    game = createMockGame();
  });

  it('should initialise with args', () => {
    const testArgs = "testArgs";
    const command = new UnplacedCommand(testArgs);
    expect(command.args).toBe(testArgs);
  });
  
  it('should intialise without args', () => {
    const command = new UnplacedCommand();
    expect(command.args).toBe("");
  });

  it('should throw an UnPlacedRobotError when executed', () => {
    const command = new UnplacedCommand();
    expect(() => {
      command.execute(game);
    }).toThrow(UnPlacedRobotError);
    
    expect(() => {
      command.execute(game);
    }).toThrow(Error);
  });

  it('should NOT interact with the Game object before throwing the error', () => {
    try {
      const command = new UnplacedCommand();
      command.execute(game);
    } catch (e) {
      expect(game.getRobotPosition).not.toHaveBeenCalled();
      expect(game.moveRobot).not.toHaveBeenCalled();
      expect(game.rotateRobotLeft).not.toHaveBeenCalled();
    }
  });
});