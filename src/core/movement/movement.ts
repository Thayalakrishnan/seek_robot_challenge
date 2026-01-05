import { Position } from "../entities/position/position.js";
import { RotationType } from "../core.types.js";
import { ROTATIONS, DIRECTIONS, DIRECTION_KEYS, MOVEMENT_CONF } from "../core.constants.js";
import { UnKnownDirectionError } from "../../errors/core_errors.js";


export class Movement {
  /**
   * class Movement 
   * getter for the robots position 
   * 
   * @constant directions: enum holding the directions. enforces correct turning order
   * @constant numDirections: value to keep track of the total number of directions 
   * @constant rotationStep: size of rotation
   * @constant translationStep: size of translation
   * @returns none
   */
  static readonly directions = DIRECTIONS;
  
  private numDirections = MOVEMENT_CONF.NUM_DIRECTIONS; 
  private rotationStep = MOVEMENT_CONF.STEP_SIZE_ROTATION;
  private translationStep = MOVEMENT_CONF.STEP_SIZE_TRANSLATION;

  /**
   * translate 
   * switch functin to quickly match the direciton 
   * with the correct translation 
   * 
   * @param position
   * @returns new position
   */
  public translate(position: Position): Position {
    switch(position.direction) {
      case DIRECTION_KEYS.EAST:
        return this.translateEast(position);
      case DIRECTION_KEYS.NORTH:
        return this.translateNorth(position); 
      case DIRECTION_KEYS.WEST:
        return this.translateWest(position);
      case DIRECTION_KEYS.SOUTH:
        return this.translateSouth(position);
    }
    throw new UnKnownDirectionError();
  }

  /**
   * rotate 
   * getter for the robots position 
   * 
   * @param position
   * @returns new position
   */
  private rotate(position: Position, rotationDirection: RotationType): Position {
    const directionAsNum = Movement.directions[position.direction as keyof typeof Movement.directions];
    const newDirection = (directionAsNum + this.rotationStep*rotationDirection) % this.numDirections;
    const wrappedDirection = newDirection < 0 ? this.numDirections - 1 : newDirection;
    return new Position(position.x, position.y, Movement.directions[wrappedDirection]);
  }

  /**
   * rotateRight 
   * rotates the positin in place clock wise 
   * uses the implemented rotate function
   * 
   * @param position
   * @returns new position
   */
  public rotateRight(position: Position): Position {
    return this.rotate(position, ROTATIONS.RIGHT)
  }
  
  /**
   * rotateLeft 
   * rotates the positin in place counter clock wise
   * uses the implemented rotate function 
   * 
   * @param position
   * @returns new position
   */
  public rotateLeft(position: Position): Position {
    return this.rotate(position, ROTATIONS.LEFT)
  }

  /**
   * translateEast 
   * translate position in given direction 
   * 
   * @param position
   * @returns new position
   */
  private translateEast(position: Position): Position {
    return new Position(position.x + this.translationStep, position.y, position.direction);
  }
  
  /**
   * translateNorth 
   * translate position in given direction 
   * 
   * @param position
   * @returns new position
   */
  private translateNorth(position: Position): Position {
    return new Position(position.x, position.y + this.translationStep, position.direction);
  }
  
  /**
   * translateWest 
   * translate position in given direction 
   * 
   * @param position
   * @returns new position
   */
  private translateWest(position: Position): Position {
    return new Position(position.x - this.translationStep, position.y, position.direction);
  }
  
  /**
   * translateSouth 
   * translate position in given direction 
   * 
   * @param position
   * @returns new position
   */
  private translateSouth(position: Position): Position {
    return new Position(position.x, position.y - this.translationStep, position.direction);
  }
}