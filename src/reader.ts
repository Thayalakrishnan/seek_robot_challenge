import { CommandRegistry, PlaceCommand, BaseCommand, MoveCommand, ReportCommand } from "./commands.js";


export abstract class Reader {
  public abstract read(raw_input: string): [BaseCommand, string];
}


export class CommandLineReader implements Reader {

  public registry = new CommandRegistry();

  constructor() {
    this.registry.register(new ReportCommand())
    this.registry.register(new PlaceCommand())
    this.registry.register(new MoveCommand())
  }

  private clean_input(raw_input: string): [boolean , string] {
    return [true, raw_input]
  }

  private validate_input(raw_input: string): [boolean , string[]] {
    const strings = raw_input.split(" ");
    if ((strings.length > 0) && (strings.length < 3)) {
      return [true, strings]
    }
    return [false, strings]
  }

  private process_input(valid_input_arr: string[]): [BaseCommand, string] {
    const raw_command = valid_input_arr[0];
    const args = valid_input_arr.length > 1 ? valid_input_arr[1] : "";
    const command = this.registry.getCommand(raw_command);
    return [command, args]
  }

  public read(raw_input: string): [BaseCommand, string] {
    const [is_clean, cleaned_input] = this.clean_input(raw_input);

    if (is_clean) {

      const [is_valid, validated_input] = this.validate_input(cleaned_input);

      if (is_valid) {
        return this.process_input(validated_input);
      }
    }
    return [this.registry.getCommand("NULL"), ""]
  }
}

export default CommandLineReader;
