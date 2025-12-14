import {
  CommandRegistry,
  BaseCommand,

  PlaceCommand,
  MoveCommand,
  ReportCommand,
  RightCommand,
  LeftCommand,
} from "./commands.js";


export abstract class Reader {
  public abstract read(rawInput: string): [BaseCommand, string];
}


export class CommandLineReader implements Reader {

  public registry = new CommandRegistry();

  constructor() {
    this.registry.register(new ReportCommand())
    this.registry.register(new PlaceCommand())
    this.registry.register(new MoveCommand())
    this.registry.register(new RightCommand())
    this.registry.register(new LeftCommand())
  }

  private cleanInput(rawInput: string): string {
    return rawInput
  }

  private validateInput(cleanInput: string): [boolean , string[]] {
    const splitInput = cleanInput.split(" ");
    if ((splitInput.length > 0) && (splitInput.length < 3)) {
      return [true, splitInput]
    }
    return [false, splitInput]
  }

  private processInput(validatedInput: string[]): [BaseCommand, string] {
    const commandName = validatedInput[0];
    const args = validatedInput.length > 1 ? validatedInput[1] : "";
    const command = this.registry.getCommand(commandName);
    return [command, args]
  }

  public read(rawInput: string): [BaseCommand, string] {
    const cleanedInput = this.cleanInput(rawInput);
    const [isValid, validatedInput] = this.validateInput(cleanedInput);

    if (isValid) {
      return this.processInput(validatedInput);
    }
    return [this.registry.getCommand("NULL"), ""]
  }
}


export class CommandRegexParser implements Reader {

  public registry = new CommandRegistry();

  constructor() {
    this.registry.register(new ReportCommand())
    this.registry.register(new PlaceCommand())
    this.registry.register(new MoveCommand())
    this.registry.register(new RightCommand())
    this.registry.register(new LeftCommand())
  }

  private cleanInput(rawInput: string): string {
    return rawInput
  }

  private validateInput(cleanInput: string): [boolean , string[]] {
    const splitInput = cleanInput.split(" ");
    if ((splitInput.length > 0) && (splitInput.length < 3)) {
      return [true, splitInput]
    }
    return [false, splitInput]
  }

  private processInput(validatedInput: string[]): [BaseCommand, string] {
    const commandName = validatedInput[0];
    const args = validatedInput.length > 1 ? validatedInput[1] : "";
    const command = this.registry.getCommand(commandName);
    return [command, args]
  }

  public read(rawInput: string): [BaseCommand, string] {
    const cleanedInput = this.cleanInput(rawInput);
    const [isValid, validatedInput] = this.validateInput(cleanedInput);

    if (isValid) {
      return this.processInput(validatedInput);
    }
    return [this.registry.getCommand("NULL"), ""]
  }
}