import { Reader } from "../../application/ports/reader/reader.js"
import { Command } from "../../commands/abstracts/command.js"
import { NoCommandUserInputError } from "../../errors/core_errors.js";
import { CommandManager } from "../../command_manager/command_manager.js";


export class CLIReader extends Reader {
  
  constructor(
    private commandManager: CommandManager = commandManager
  ) {
    super()
  }
  
  private lex(rawInput: string): [string, string] {
    const splitInput = rawInput.trim().split(" ");
    const command = splitInput.at(0);
    if (command) {
      const args = splitInput.slice(1).join(" ");
      return [command, args];
    }
    throw new NoCommandUserInputError(`${rawInput}`); 
  }
  
  private parse(commandName: string, args = ""): Command {
    return this.commandManager.getAndCreateCommand(commandName, args.trim());
  }
  
  public read(rawInput: string): Command {
    const [rawCommand, rawArgs] = this.lex(rawInput);
    const command = this.parse(rawCommand, rawArgs);
    return command
  }
}