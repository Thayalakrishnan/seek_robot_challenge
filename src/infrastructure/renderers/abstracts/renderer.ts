import { Game } from "../../../core/game/game.js";


export abstract class Renderer {
  constructor(public game: Game) {}
  
  abstract render(out: string | void): void;
}
