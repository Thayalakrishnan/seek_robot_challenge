import { Game } from "../../core/game/game.js";
import { Reader } from "../ports/reader/reader.js";
import { Evaluator } from "../ports/evaluator/evaluator.js";
import { Renderer } from "../ports/renderer/renderer.js";


export abstract class Application {
  public abstract game: Game;
  
  protected abstract reader: Reader;
  protected abstract evaluator: Evaluator;
  protected abstract renderer: Renderer;
  
  public abstract run(): void;
  
  public abstract close(): void;
  
}