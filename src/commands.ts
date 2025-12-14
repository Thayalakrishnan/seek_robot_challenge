import { Game } from "./game.js";
import { DirectionManager } from "./directions.js";
import { Position } from "./position.js";


export abstract class BaseCommand {
  public readonly name: string;
  public usesArgs: boolean;
  public args: string;

  constructor(name = "", usesArgs = false) {
    this.name = name;
    this.usesArgs = usesArgs;
    this.args = "";
  }
  
  public abstract execute(args: string, game: Game): void;

  public parseArgs(args: string): string {
    return args
  };
  
  public setArgs(args: string): void {
    // throw an error here for invalid args?
    if (this.usesArgs) {
      this.args = this.parseArgs(args);
    }
  };
  
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
    const position = game.robot.position;
    console.log(`Output: ${position.x},${position.y},${position.direction}`);
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
      
        const xPos = Number(strings[0]);
        const yPos = Number(strings[1]);
        const direction = strings[2];
        
        const newPosition = new Position(xPos, yPos, direction);

        if (game.validMovement(newPosition)) {
          game.robot.updatePosition(newPosition);
          
          // get rid of this
          game.robot.tile = this.directionManager.getDirection(game.robot.position.direction).tile;
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
    const newPosition = this.directionManager.move(game.robot.position);
    game.updateIfValidMovement(newPosition);
  }
}


export class RightCommand extends BaseCommand {

  public directionManager = new DirectionManager();

  constructor() {
      super('RIGHT', false);
  }

  public execute(args: string, game: Game): void {
    const newPosition = this.directionManager.rotateRight(game.robot.position);
    game.robot.updatePosition(newPosition);
  }
}


export class LeftCommand extends BaseCommand {

  public directionManager = new DirectionManager();

  constructor() {
      super('LEFT', false);
  }

  public execute(args: string, game: Game): void {
    const newPosition = this.directionManager.rotateLeft(game.robot.position);
    game.robot.updatePosition(newPosition);
  }
}


export class CommandRegistry {

  private commandDict = new Map<string, BaseCommand>;
  private nullCommand = new NullCommand();

  public register(commandInstance: BaseCommand): void {
    this.commandDict.set(commandInstance.name, commandInstance);
  }

  public getCommand(name = "NULL"): BaseCommand {
    return this.commandDict.get(name) ?? this.nullCommand
  }
}
