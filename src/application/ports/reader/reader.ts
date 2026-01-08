import { Command } from "../../../commands/abstracts/command.js";


export abstract class Reader {
  public abstract read(rawInput: string): Command;
}