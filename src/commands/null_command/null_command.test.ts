import { Game } from "../../core/game/game.js";
import { NullCommand } from "./null_command.js";
import { UnknownCommandError } from "../../errors/core_errors.js";


describe('NullCommand Unit Tests', () => {

  it('should throw an UnknownCommandError when executed', () => {
    const game = new Game();
    const command = new NullCommand();
    
    expect(() => {
      command.execute(game);
    }).toThrow(UnknownCommandError);
    
    expect(() => {
      command.execute(game);
    }).toThrow(Error);
  });
});