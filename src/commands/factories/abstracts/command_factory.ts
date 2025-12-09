import { Command } from "../../abstracts/command.js";
import { NullCommand } from "../../null_command/null_command.js";


export class CommandFactory {
  
  private defaultCommand: new (args: string) => Command = NullCommand;
  
  private registry: Map<string, new (args: string) => Command> = new Map();
  
  public register(commandName: string, klass: new (args: string) => Command, isDefault = false): void {
    this.registry.set(commandName, klass);
    if (isDefault) {
      this.defaultCommand = klass;
    }
  }
  
  public create(commandName: string, args: string): Command {
    const klass = this.registry.get(commandName) ?? this.defaultCommand;
    return new klass(args);
  }
}
