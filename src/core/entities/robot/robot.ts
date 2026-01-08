import { Position } from "../position/position.js";


export class Robot {
  /**
   * Robot Class 
   * the main entity of the game
   * nothing more than a class to hold its position and 
   * placed state
   *
   * @param position - position the robot is placed at
   * @param isPlaced - flag holding the placed status of the robot
   * @returns none
   */
  constructor(
    public position: Position = new Position(-1, -1, "NORTH"),
    public isPlaced = false
  ) {}
  
  /**
   * Update position 
   * helper function to set the robots position
   * updates the robots placed status
   *
   * @param position - position the robot is placed at
   * @returns none
   */
  updatePosition(position: Position): void {
    this.position = position;
    this.isPlaced = true;
  }
}
