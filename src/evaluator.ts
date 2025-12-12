import { BaseCommand } from "./commands.js";
import { Game } from "./game.js";



//abstract class Evaluator {
//  public abstract evaluate(command: BaseCommand, game: Game): void;
//}


export class Evaluator {
  //private registry = new CommandRegistry();
  //constructor() {
  //  this.registry.register(new PlaceCommand())
  //}

  public evaluate(command: BaseCommand, args: string, game: Game): void {
    if (command.name === "PLACE") {
      command.execute(args, game);
    }
    else if (game.robot.is_placed) {
      command.execute(args, game);
    }
  }
}


export default Evaluator
