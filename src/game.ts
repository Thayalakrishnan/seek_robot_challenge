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
}

export default Game
