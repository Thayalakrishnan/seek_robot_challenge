import { NoCommandError } from "../../../errors/core_errors.js";
import { Lexer } from "../abstracts/lexer.js"


export class CLILexer extends Lexer {
  
  public lex(rawInput: string): [string, string] {
    const splitInput = rawInput.split(" ");
    if (splitInput.length) {
      const command = splitInput.at(0) ?? "";
      const args = splitInput.slice(1).join(" ");
      return [command, args];
    }
    throw new NoCommandError(`No command to parse.`); 
  };
}
