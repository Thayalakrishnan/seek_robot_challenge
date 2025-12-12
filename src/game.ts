import { Table } from "./table.js";
import { Robot } from "./robot.js";
import { DirectionManager } from "./directions.js";


export class Game {
  public table: Table;
  public robot: Robot;
  public directionManager = new DirectionManager();

  constructor(table: Table, robot: Robot) {
    this.table = table;
    this.robot = robot;
  }

  update() {
    console.log(`\nRobot Position`);
    console.log(`pos_x: ${this.robot.pos_x}`);
    console.log(`pos_y: ${this.robot.pos_y}`);
    console.log(`direction: ${this.robot.direction}\n`);
  }
}

export default Game
