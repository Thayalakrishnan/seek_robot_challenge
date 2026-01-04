import { Evaluator } from "../../src/application/ports/evaluator/evaluator.js";
import { Command } from "../../src/commands/abstracts/command.js";
import { createMockGame } from "./game.mock.js";


class TestEvaluator extends Evaluator {
  public evaluate(command: Command): void { return };
}

export function createMockEvaluator(): jest.Mocked <TestEvaluator> {
  const mockEvaluator: jest.Mocked <TestEvaluator> = {
    game: createMockGame(),
    evaluate: jest.fn(),
  } as unknown as jest.Mocked <TestEvaluator>;
  return mockEvaluator
}