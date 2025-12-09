//import * as readline from 'node:readline/promises';
import * as readline from 'node:readline';
import { Renderer } from "../../application/ports/renderer.js";
import { Game } from "../../core/game/game.js";


export class CLIRenderer extends Renderer{
  private receiver: readline.Interface;
  
  constructor(game: Game, receiver: readline.Interface) {
    super(game);
    this.receiver = receiver;
  }
  
  public render(out: string | void): void {
    if (out) {
      //this.receiver.write(`${out}\n`);
      process.stdout.write(`${out}\n`)
    }
  }
}
