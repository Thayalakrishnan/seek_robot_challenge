import { Command } from "../../src/commands/abstracts/command.js";
import { PlaceCommand } from "../../src/commands/place_command/place_command.js";
import { Game } from "../../src/core/game/game.js";
import { CLILexer } from "../../src/infrastructure/readers/cli/cli_lexer.js";
import { CLIParser } from "../../src/infrastructure/readers/cli/cli_parser.js";
import { CLIReader } from "../../src/infrastructure/readers/cli/cli_reader.js";


describe('Infrastructure Integration Tests', () => {
  
  let game: Game;

  beforeEach(() => {
    game = new Game(); 
  });

  describe('CLIReader Flow', () => {
    let reader: CLIReader;
    const mockLexer = new CLILexer();

    beforeEach(() => {
      reader = new CLIReader(game, new CLIParser(game), mockLexer);
      jest.clearAllMocks();
    });

    it('should correctly read input, parse it, and return a Command object', () => {
      // Mock input from the reader
      jest.spyOn(mockLexer, 'lex').mockReturnValue(["PLACE", "3,3,SOUTH"]);

      const command = reader.read("PLACE 3,3,SOUTH");

      // verify read method was called
      expect(mockLexer.lex).toHaveBeenCalledTimes(1);

      // verify the returned object is the correct command type
      expect(command).toBeInstanceOf(PlaceCommand);

      // verify the command was initialised with the correct arguments
      expect(command.args).toBe("3,3,SOUTH");
    });
  });
});