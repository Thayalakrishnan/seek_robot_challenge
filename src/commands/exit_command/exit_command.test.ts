import { Game } from "../../core/game/game.js";
import { ExitCommand } from "./exit_command.js";
import { ExitApplicationError } from "../../errors/core_errors.js";


describe('ExitCommand Unit Tests', () => {

  it('should throw an ExitApplicationError when executed', () => {
    const game = new Game();
    const command = new ExitCommand();
    
    expect(() => {
      command.execute(game);
    }).toThrow(ExitApplicationError);
    
    expect(() => {
      command.execute(game);
    }).toThrow(Error);
  });
});