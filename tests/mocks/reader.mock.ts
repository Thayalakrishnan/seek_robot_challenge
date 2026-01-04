import { Reader } from "../../src/application/ports/reader/reader.js";
import { Command } from "../../src/commands/abstracts/command.js";
import { Game } from "../../src/core/game/game.js";
import { createMockCommand } from "./command.mock.js";
import { createMockGame } from "./game.mock.js";


class TestReader extends Reader {
  constructor(public game: Game = game) { super() }
  public read(rawInput: string): Command {
    return createMockCommand()
  };
}


export function createMockReader(): jest.Mocked <TestReader> {
  const mockReader: jest.Mocked <TestReader> = {
    game: createMockGame(),
    read: jest.fn(),
  } as unknown as jest.Mocked <TestReader>;
  return mockReader
}