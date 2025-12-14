import { Game } from "../../core/game/game.js";
import { Reader } from "../../infrastructure/readers/abstracts/reader.js";
import { Evaluator } from "../../infrastructure/evaluators/abstracts/evaluator.js";
import { Renderer } from "../../infrastructure/renderers/abstracts/renderer.js";


export abstract class Application {
  protected game!: Game;
  protected reader!: Reader;
  protected evaluator!: Evaluator;
  public renderer!: Renderer;
  
  abstract run(): Promise<void>;
}