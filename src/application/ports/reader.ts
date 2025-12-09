import { Command } from "../../commands/abstracts/command.js";
import { Game } from "../../core/game/game.js";


export abstract class Reader {
  public abstract game: Game;
  
  public abstract read(rawInput: string): Command;
}