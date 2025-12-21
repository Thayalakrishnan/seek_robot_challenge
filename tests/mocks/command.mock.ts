import { Command } from "../../src/commands/abstracts/command.js";
import { Game } from "../../src/core/game/game.js";


class TestCommand extends Command {
  public execute(game: Game): void | string {
    return
  };
}

export function createMockCommand(): jest.Mocked <TestCommand> {
  const mockCommand: jest.Mocked <TestCommand> = {
    execute: jest.fn(),
    supportsArgs: false,
    args: "",
  } as unknown as jest.Mocked <TestCommand>;
  return mockCommand
}