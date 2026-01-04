import { Application } from "../../src/application/abstracts/application.js";
import { createMockGame } from "./game.mock.js";
import { createMockEvaluator } from "./evaluator.mock.js";
import { createMockReader } from "./reader.mock.js";
import { createMockRenderer } from "./renderer.mock.js";
import { Game } from "../../src/core/game/game.js";
import { Reader } from "../../src/application/ports/reader/reader.js";
import { Evaluator } from "../../src/application/ports/evaluator/evaluator.js";
import { Renderer } from "../../src/application/ports/renderer/renderer.js";



class TestApplication extends Application {
  constructor(
    public game = createMockGame(),
    protected renderer = createMockRenderer(),
    protected evaluator = createMockEvaluator(),
    protected reader = createMockReader(),
  ) { super() }
  
  public run(): void { return };
  public close(): void { return };
}

export function createMockApplication(): jest.Mocked<TestApplication> {
  const mockApplication: jest.Mocked <TestApplication> = {
    game: createMockGame(),
    run: jest.fn(),
    close: jest.fn(),
  } as unknown as jest.Mocked<TestApplication>;
  return mockApplication
}


export class MockApplication extends Application {
  public override game: Game;
  protected override reader: Reader;
  protected override evaluator: Evaluator;
  protected override renderer: Renderer;
  
  constructor() { 
    super()
      this.game = createMockGame();
      this.reader = createMockReader();
      this.evaluator = createMockEvaluator();
      this.renderer = createMockRenderer();
  }
  
  public run(): void { return };
  public close(): void { return };
}