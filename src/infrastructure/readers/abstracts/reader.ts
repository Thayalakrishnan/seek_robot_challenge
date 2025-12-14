import { Command } from "../../../commands/abstracts/command.js";
import { Game } from "../../../core/game/game.js";
import { Parser } from "./parser.js";
import { Lexer } from "./lexer.js";


export abstract class Reader {
  public abstract game: Game;
  public abstract parser: Parser;
  public abstract lexer: Lexer;
  
  public read(rawInput: string): Command {
    const [rawCommand, rawArgs] = this.lexer.lex(rawInput);
    const command = this.parser.parse(rawCommand, rawArgs);
    return command
  };
}