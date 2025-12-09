import { Position } from "../entities/position/position.js";
import { Robot } from "../entities/robot/robot.js";
import { Table } from "../entities/table/table.js";
import { Movement } from "../movement/movement.js";


export class Game {
  /**
   * Game Class 
   * The game engine that governs gameplay
   * all game entities are spawned here
   * also employs a separate module for movement 
   *
   * @param isActive - boolean for if the robot has been placed or not
   * @param table - ref to the table instance
   * @param robot - ref to the robot instance
   * @param movement - ref to the movement manager
   * @returns none
   */
  constructor(
    public isActive = false,
    public table = new Table(), 
    public robot = new Robot(),
    private movement = new Movement(),
    ) {}

  /**
   * function isValidPosition 
   * proxy function to check if a position is within a tables boundry
   * 
   * @param position - position being checked
   * @returns boolean - for if the given position is within
   */
  private isValidPosition(position: Position): boolean {
    return this.table.isWithinTable(position);
  }
  
  /**
   * function updateIfValidPosition 
   * melds the valid postion function with the robots update positin method
   * allows us to check if the positin is valid and assign the position in 
   * one method. also updates the state to active
   * 
   * @param position - position being checked
   * @returns none
   */
  private updateIfValidPosition(position: Position): void {
    if (this.isValidPosition(position)) {
      this.robot.updatePosition(position);
      this.isActive = true;
    }
  }
  

  /**
   * function moveRobot 
   * move the robot a set amount
   * used the movement manager 
   * 
   * @param none
   * @returns none
   */
  public moveRobot(): void {
    const newPosition = this.movement.translate(this.robot.position);
    this.updateIfValidPosition(newPosition);
  }

  /**
   * rotateRobotLeft 
   * rotate the robot using the movement manager 
   * 
   * @param none
   * @returns none
   */
  public rotateRobotLeft(): void {
    const newPosition = this.movement.rotateLeft(this.robot.position);
    this.robot.updatePosition(newPosition);
  }

  /**
   * rotateRobotRight 
   * rotate the robot using the movement manager 
   * 
   * @param none
   * @returns none
   */
  public rotateRobotRight(): void {
    const newPosition = this.movement.rotateRight(this.robot.position);
    this.robot.updatePosition(newPosition);
  }
  
  /**
   * getRobotPosition 
   * getter for the robots position 
   * 
   * @param position
   * @returns none
   */
  public getRobotPosition(): Position {
    return this.robot.position
  }

  /**
   * setRobotPosition 
   * setter for the robots position 
   * 
   * @param position
   * @returns none
   */
  public setRobotPosition(position: Position): void {
    this.updateIfValidPosition(position);
  }
  
}