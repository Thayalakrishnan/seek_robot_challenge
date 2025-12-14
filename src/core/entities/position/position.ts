import { InvalidDirectionError } from "../../../errors/core_errors.js";


export class Position {
  /**
   * Position Class 
   * holds the x, y position and the direction
   * used through out the game engine when calculating movement
   * and rotation
   *
   * @param x - value along width of table
   * @param y - value along legnth of table
   * @param direction - facing direction
   * @returns none
   */
  static directions: string[] = ["EAST", "NORTH", "WEST", "SOUTH", ""];
  
  constructor(
    readonly x: number = 0, 
    readonly y: number = 0, 
    readonly direction: string = ""
    ) {
      this.direction = this.validateDirection(direction)
    }
  
    
  /**
   * validate the direction string against
   * our valid directioons
   * returns the direction if its valid
   * throws an InvalidDirectionError
   *
   * @param direction - facing direction
   * @returns directoin
   */
  private validateDirection(direction: string): string {
    if (Position.directions.includes(direction)) {
      return direction
    }
    throw new InvalidDirectionError(`${direction} is not a valid direction`);
  }
}