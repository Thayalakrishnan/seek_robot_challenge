import { createMockCommand } from "../../../tests/mocks/command.mock.js";
import { Command } from "../../commands/abstracts/command.js";
import { Game } from "../../core/game/game.js";
import { Reader } from "./reader.js";


class TestReader extends Reader {
  constructor(public game: Game = game) { super() }
  public read(rawInput: string): Command {
    return createMockCommand()
  };
}


describe('Reader Abstract Class Unit Tests', () => {

  it('should initialise', () => {
    const game = new Game();
    const reader = new TestReader(game);
    expect(reader).toBeInstanceOf(Reader);
  });
  
  
  it('should expose the read method', () => {
    const game = new Game();
    const reader = new TestReader(game);
    expect(typeof reader.read).toBe('function');
    });
    
});

