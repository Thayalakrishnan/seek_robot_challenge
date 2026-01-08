import { Coordinate } from "../coordinate/coordinate.js";


export class Obstacle {
  /**
   * Obstacle Class 
   *
   * @param coordinate - position the robot is placed at
   * @returns none
   */
  constructor(
    public coordinate: Coordinate = new Coordinate(-1, -1),
  ) {
    
  }
}
