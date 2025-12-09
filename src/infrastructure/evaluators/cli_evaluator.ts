import { Command } from "../../commands/abstracts/command.js";
import { Evaluator } from "../../application/ports/evaluator.js";


export class CLIEvaluator extends Evaluator {
  public evaluate(command: Command): void | string {
    return command.execute(this.game);
  }
}