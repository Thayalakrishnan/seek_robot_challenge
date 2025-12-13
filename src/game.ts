import { Position  } from "./position.js";
import { Table } from "./table.js";
import { Robot } from "./robot.js";

//import { DirectionManager } from "./directions.js";


export class Game {
  public table: Table;
  public robot: Robot;
  //public directionManager = new DirectionManager();

  constructor(table: Table, robot: Robot) {
    this.table = table;
    this.robot = robot;
  }
  
  public validMovement(position: Position): boolean {
    return this.table.is_within_table(position.x, position.y)
  }
  
  public updateIfValidMovement(position: Position): void {
    if (this.table.is_within_table(position.x, position.y)) {
      this.robot.updatePosition(position);
    }
  }
}

export default Game
