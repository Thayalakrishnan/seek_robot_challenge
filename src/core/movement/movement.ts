import { Position } from "../entities/position/position.js";


export enum Directions {
  EAST,
  NORTH,
  WEST,
  SOUTH,
}

export class Movement {
  /**
   * class Movement 
   * getter for the robots position 
   * 
   * @param directions: enum holding the directions. enforces correct turning order
   * @param numDirections: value to keep track of the total number of directions 
   * @param rotationStep: size of rotation
   * @param translationStep: size of translation
   * @returns none
   */
  static readonly directions = Directions;
  private numDirections = 4; 
  private rotationStep = 1;
  private translationStep = 1;

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
      case "EAST":
        return this.translateEast(position);
      case "NORTH":
        return this.translateNorth(position); 
      case "WEST":
        return this.translateWest(position);
      case "SOUTH":
        return this.translateSouth(position);
      default:
        return position;
    }
  }

  /**
   * getRobotPosition 
   * getter for the robots position 
   * 
   * @param position
   * @returns new position
   */
  private rotate(position: Position, rotationDirection: number): Position {
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
    return this.rotate(position, -1)
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
    return this.rotate(position, 1)
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