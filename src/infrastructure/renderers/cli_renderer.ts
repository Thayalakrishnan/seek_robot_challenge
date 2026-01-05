//import * as readline from 'node:readline/promises';
import * as readline from 'node:readline';
import { Renderer } from "../../application/ports/renderer/renderer.js";
import { Game } from "../../core/game/game.js";


export class CLIRenderer extends Renderer {
  private receiver: readline.Interface;
  
  constructor(
    public game: Game, 
    receiver: readline.Interface
  ) {
    super();
    this.receiver = receiver;
  }
  
  public render(out: string | void): void {
    if (out) {
      process.stdout.write(`${out}\n`)
    } else {
      process.stdout.write(`\r`)
    }
  }
}
