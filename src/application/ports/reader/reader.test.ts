import { createMockCommand } from "../../../../tests/mocks/command.mock.js";
import { Command } from "../../../commands/abstracts/command.js";
import { Reader } from "./reader.js";


class TestReader extends Reader {
  constructor() { super() }
  public read(rawInput: string): Command {
    return createMockCommand()
  };
}


describe('Reader Abstract Class Unit Tests', () => {

  it('should initialise', () => {
    const reader = new TestReader();
    expect(reader).toBeInstanceOf(Reader);
  });
  
  
  it('should expose the read method', () => {
    const reader = new TestReader();
    expect(typeof reader.read).toBe('function');
    });
    
});

