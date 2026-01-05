import { CommandManager } from "../../command_manager/command_manager.js";
import { Command } from "../../commands/abstracts/command.js";
import { MoveCommand } from "../../commands/move_command/move_command.js";
import { Game } from "../../core/game/game.js";
import { NoCommandUserInputError, UnknownCommandUserInputError } from "../../errors/core_errors.js";
import { CLIReader } from "./cli_reader.js";

// Create a subclass for testing purposes
export class TestCommand extends Command {
  execute(game: Game): void {
    return
  }
}

describe('CLIReader Class Unit Tests', () => {
  
  let cm: CommandManager;
  let reader: CLIReader;
  
  beforeEach(() => {
    cm = new CommandManager();
    reader = new CLIReader(cm);
  });
  
  it('should initialise when a command manager instance is passed in', () => {
    const tempcm = new CommandManager();
    const tempreader = new CLIReader(tempcm);
    expect(tempreader).toBeInstanceOf(CLIReader);
  });
  
  it('should contain the read method that accepts a string instance', () => {
    expect(typeof reader.read).toBe('function');
  });
  
  it('should return a command when known command is passed in', () => {
    const rawInput = "MOVE";
    const command = reader.read(rawInput);
    expect(command).toBeInstanceOf(MoveCommand);
    
  });
  
  it('should throw NoCommandUserInputError, when no lexable command is passed in', () => {
    const rawInput = "";
    expect(() => {
      reader.read(rawInput);
    }).toThrow(NoCommandUserInputError);
  });
  
  it('should throw UnknownCommandUserInputError, when a lexable command is given, but not parsable', () => {
    const rawInput = "UNKNOWNCOMMAND";
    expect(() => {
      reader.read(rawInput);
    }).toThrow(UnknownCommandUserInputError);
  });
    
});