import { Game } from "../../core/game/game.js";
import { UnplacedCommand } from "./unplaced_command.js";
import { UnPlacedRobotError } from "../../errors/core_errors.js";


describe('UnplacedCommand Unit Tests', () => {
  
  it('should throw an UnPlacedRobotError when executed', () => {
    const game = new Game();
    const command = new UnplacedCommand();
    expect(() => {
      command.execute(game);
    }).toThrow(UnPlacedRobotError);
    
    expect(() => {
      command.execute(game);
    }).toThrow(Error);
  });

});