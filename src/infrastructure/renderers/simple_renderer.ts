import * as readline from 'node:readline/promises';
import { Renderer } from "./abstracts/renderer.js";
import { Game } from "../../core/game/game.js";


export class SimpleRenderer extends Renderer{
  private receiver: readline.Interface;
  
  constructor(game: Game, receiver: readline.Interface) {
    super(game);
    this.receiver = receiver;
  }
  
  public render(out: string | void): void {
    if (out) {
      this.receiver.write(out);
    }
  }
}
