import { Game } from "../../core/game/game.js";


export abstract class Renderer {
  public abstract game: Game;
  
  public abstract render(out: string | void): void;
}
