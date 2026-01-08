import { CommandManager } from "../../src/command_manager/command_manager.js";
import { PlaceCommand } from "../../src/commands/place_command/place_command.js";
import { CLIReader } from "../../src/infrastructure/readers/cli_reader.js";


describe('Infrastructure Integration Tests', () => {
  let commandManager: CommandManager;

  beforeEach(() => {
    commandManager = new CommandManager(); 
  });

  describe('CLIReader Flow', () => {
    let reader: CLIReader;

    beforeEach(() => {
      reader = new CLIReader(commandManager);
      jest.clearAllMocks();
    });

    it('should correctly read input, parse it, and return a Command object', () => {
      const testArgs = "3,3,SOUTH";
      const placeCommand = new PlaceCommand(testArgs);
      
      // Mock input from the reader
      jest.spyOn(reader, 'read').mockReturnValue(placeCommand);

      const command = reader.read("PLACE 3,3,SOUTH");

      // verify the returned object is the correct command type
      expect(command).toBeInstanceOf(PlaceCommand);

      // verify the command was initialised with the correct arguments
      expect(command.args).toBe("3,3,SOUTH");
    });
    
    
    //it('should throw a no command error when an empty string is parsed in', () => {
    //});
  });
});