import { Command } from "../../../commands/abstracts/command.js";


export abstract class Parser {
  public abstract parse(commandName: string, args: string): Command;
}