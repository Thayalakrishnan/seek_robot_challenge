import Game from "./game.js";
import { DirectionManager } from "./directions.js";


export abstract class BaseCommand {
  public readonly name: string;
  public uses_args: boolean;

  constructor(name = "", uses_args = false) {
    this.name = name;
    this.uses_args = uses_args;
  }

  public abstract execute(args: string, game: Game): void;
}


export class NullCommand extends BaseCommand {

  constructor() {
      super('NULL');
  }

  public execute(): void {
    return
  }
}

export class ReportCommand extends BaseCommand {

  constructor() {
      super('REPORT', false);
  }

  public execute(args: string, game: Game): void {
    const pos_x_cur = game.robot.pos_x;
    const pos_y_cur = game.robot.pos_y;
    const dir_cur = game.robot.direction
    console.log(`[REPORT] position: ${pos_x_cur}, ${pos_y_cur} direction: ${dir_cur}`);
    console.log(`Output: ${pos_x_cur},${pos_y_cur},${dir_cur}`);
    return
  }
}

export class PlaceCommand extends BaseCommand {

  public directionManager = new DirectionManager();

  constructor() {
      super('PLACE', true);
  }

  public execute(args: string, game: Game): void {
    const strings = args.split(",");
    if (strings.length === 3) {
        const x_pos = Number(strings[0]);
        const y_pos = Number(strings[1]);
        const direction = strings[2];

        // need to validate the robot can be placed
        if (game.table.is_within_table(x_pos, y_pos)) {
          game.robot.pos_x = x_pos;
          game.robot.pos_y = y_pos;
          game.robot.direction = direction;
          game.robot.is_placed = true;
          // get rid of this
          game.robot.tile = this.directionManager.getDirection(game.robot.direction).tile;

        }
    }
    return
  }
}


export class MoveCommand extends BaseCommand {

  public directionManager = new DirectionManager();

  constructor() {
      super('MOVE', false);
  }

  public execute(args: string, game: Game): void {
    const move_amount = 1;

    const pos_x_cur = game.robot.pos_x;
    const pos_y_cur = game.robot.pos_y;

    const [pos_x_new, pos_y_new] = this.directionManager.movePosition(
      move_amount, game.robot.pos_x, game.robot.pos_y, game.robot.direction
    );

    if (game.table.is_within_table(pos_x_new, pos_y_new)) {
      game.robot.pos_x = pos_x_new;
      game.robot.pos_y = pos_y_new;
      console.log(`[MOVE] moving  ${pos_x_cur}, ${pos_y_cur} --> ${pos_x_new}, ${pos_y_new}`);
    } else {
      console.log(`[MOVE] cant move ${pos_x_cur}, ${pos_y_cur} --> ${pos_x_new}, ${pos_y_new}`);
    }
    return
  }
}

export class RightCommand extends BaseCommand {

  public directionManager = new DirectionManager();

  constructor() {
      super('RIGHT', false);
  }

  public execute(args: string, game: Game): void {
    const dir_new = this.directionManager.rotateRight(game.robot.direction);
    console.log(`[RIGHT] ${game.robot.direction} --> ${dir_new.name}`);
    game.robot.direction = dir_new.name;
    game.robot.tile = dir_new.tile;
    return
  }
}

export class LeftCommand extends BaseCommand {

  public directionManager = new DirectionManager();

  constructor() {
      super('LEFT', false);
  }

  public execute(args: string, game: Game): void {
    const dir_new = this.directionManager.rotateLeft(game.robot.direction);
    console.log(`[LEFT] ${game.robot.direction} --> ${dir_new.name}`);
    game.robot.direction = dir_new.name;
    game.robot.tile = dir_new.tile;
    return
  }
}



export class CommandRegistry {

  private commandDict = new Map<string, BaseCommand>;
  private nullCommand = new NullCommand();

  public getDict(): Map<string, BaseCommand> {
    return this.commandDict
  }

  public register(commandInstance: BaseCommand): void {
    this.commandDict.set(commandInstance.name, commandInstance);
  }

  public getCommand(name = "NULL"): BaseCommand {
    const command: BaseCommand = this.commandDict.get(name) ?? this.nullCommand;
    return command
  }
}


export default BaseCommand
