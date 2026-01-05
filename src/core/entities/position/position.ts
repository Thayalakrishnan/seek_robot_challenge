import { InvalidDirectionUserInputError } from "../../../errors/core_errors.js";
import { VALID_DIRECTIONS } from "../../core.constants.js";


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
  static directions = VALID_DIRECTIONS;
  
  constructor(
    readonly x = -1, 
    readonly y = -1, 
    readonly direction = "NORTH"
    ) {
      this.direction = this.validateDirection(direction)
    }
  
    
  /**
   * validate the direction string against
   * our valid directioons
   * returns the direction if its valid
   * throws an InvalidDirectionUserInputError
   *
   * @param direction - facing direction
   * @returns directoin
   */
  private validateDirection(direction: string): string {
    if (Position.directions.includes(direction)) {
      return direction
    }
    throw new InvalidDirectionUserInputError(`${direction}`);
  }
}