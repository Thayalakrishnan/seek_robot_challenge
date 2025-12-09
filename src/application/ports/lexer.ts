export abstract class Lexer {
  public abstract lex(rawInput: string): [string, string];
}