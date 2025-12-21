import { Game } from "../core/game/game.js";
import { Reader } from "./ports/reader.js";
import { Evaluator } from "./ports/evaluator.js";
import { Renderer } from "./ports/renderer.js";


export abstract class Application {
  public abstract game: Game;
  
  protected abstract reader: Reader;
  protected abstract evaluator: Evaluator;
  protected abstract renderer: Renderer;
  
  public abstract run(): void;
  
  public abstract close(): void;
  
}