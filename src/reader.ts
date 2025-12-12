import { Command, ValidCommands } from "./commands.js";


abstract class Reader {
  //abstract clean(): string;
  //abstract validate(): string;
  //abstract process(): string;

  public abstract read(raw_input: string): Command;
}


export class CommandLineReader implements Reader {

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

  private process_input(valid_input_arr: string[]): [boolean, Command] {
    const raw_command = valid_input_arr[0];
    const args = valid_input_arr.length > 1 ? valid_input_arr[1] : "";

    if (raw_command in ValidCommands) {
      const command = new Command(raw_command);
      if (raw_command === "PLACE") {
        command.set_args(args)
      }
      return [true, command]
    }
    return [false, new Command()]
  }


  public read(raw_input: string): Command {
    const [is_clean, cleaned_input] = this.clean_input(raw_input);

    if (is_clean) {

      const [is_valid, validated_input] = this.validate_input(cleaned_input);

      if (is_valid) {

        const [is_command, command] = this.process_input(validated_input);

        if (is_command) {
          return command;
        }
      }
    }
    //throw new Error("Invalid Input");
    return new Command("NULL")
  }
}

export default CommandLineReader;
