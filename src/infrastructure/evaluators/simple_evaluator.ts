import { Command } from "../../commands/abstracts/command.js";
import { Evaluator } from "./abstracts/evaluator.js";


export class SimpleEvaluator extends Evaluator{
  public evaluate(command: Command): void | string {
    return command.execute(this.game);
  }
}