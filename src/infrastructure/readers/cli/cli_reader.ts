import { Game } from "../../../core/game/game.js"
import { Reader } from "../abstracts/reader.js"
import { CLIParser } from "./cli_parser.js"
import { CLILexer } from "./cli_lexer.js"


export class CLIReader extends Reader {
  constructor(
    public game: Game = game,
    public parser = new CLIParser(game),
    public lexer = new CLILexer()
  ) {
    super()
  }
}