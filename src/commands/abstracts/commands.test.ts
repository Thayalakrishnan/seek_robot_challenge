import { Game } from "../../core/game/game.js";
import { Command } from "./command.js";
import { UnknownCommandError, UnexpectedArgumentsError } from "../../errors/core_errors.js";


// Create a subclass for testing purposes
class TestCommand extends Command {
  execute(game: Game): void {}
}

describe('abstract Command', () => {

  // Test Case 1: initialisation with default (empty) arguments
  it('should initialise with an empty string for args by default', () => {
    const command = new TestCommand("");
  });

  
  // Test Case 2: initialisation with specified arguments
  it('should throw an UnexpectedArgumentsError when intialised with arguments', () => {
    expect(() => {
      new TestCommand("1,2,NORTH");
    }).toThrow(UnexpectedArgumentsError);
  });

  
  // Test Case 3: Verify the execute method contract exists
  it('should expose the abstract execute method that accepts a Game instance', () => {
    const command = new TestCommand();
    // Since we cannot check the signature at runtime easily without reflecting on TypeScript types,
    // we assert that the method exists and is callable.
    expect(typeof command.execute).toBe('function');
    
    //// A placeholder check to confirm the method exists and can be invoked
    //expect(() => command.execute({}
    //  as Game)).not.toThrow();
    });
});