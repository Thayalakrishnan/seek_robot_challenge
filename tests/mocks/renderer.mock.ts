import { Renderer } from "../../src/application/ports/renderer/renderer.js";
import { Game } from "../../src/core/game/game.js";
import { createMockGame } from "./game.mock.js";


class TestRenderer extends Renderer {
  constructor(public game: Game = game) { super() }
  public render(out: string | void): void {
    return
  };
}

export function createMockRenderer(): jest.Mocked <TestRenderer> {
  const mockRenderer: jest.Mocked <TestRenderer> = {
    game: createMockGame(),
    render: jest.fn(),
  } as unknown as jest.Mocked <TestRenderer>;
  return mockRenderer
}
