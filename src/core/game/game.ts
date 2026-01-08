import { UnPlacedRobotError } from "../../errors/core_errors.js";
import { GAME_STATES } from "../core.constants.js";
import { GameStateType } from "../core.types.js";
import { Coordinate } from "../entities/coordinate/coordinate.js";
import { Obstacle } from "../entities/obstacle/obstacles.js";
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
  public currentState: GameStateType = GAME_STATES.IDLE;
  
  constructor(
    public isActive = false,
    public table = new Table(), 
    public robot = new Robot(),
    private movement = new Movement(),
    public obstacles: Obstacle[] = [], 
    ) {
    }

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
  
  
  private hasObstacles(coordinate: Coordinate): boolean {
    const isObstacle = this.obstacles.find((obs) => coordinate.x === obs.coordinate.x && coordinate.y === obs.coordinate.y);
    if (isObstacle) {
      process.stdout.write("obstacle in the way\n");
      return true
    }
    return false
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
    
    if (this.isValidPosition(position) && !this.hasObstacles(position)) {
      this.robot.updatePosition(position);
      this.isActive = true;
      this.currentState = GAME_STATES.ACTIVE;
    }
  }
  
  private checkIfActive(): void {
    if (!this.isActive) {
      throw new UnPlacedRobotError();
    }
  }

  /**
   * function moveRobot [MOVE]
   * move the robot a set amount
   * used the movement manager 
   * 
   * @param none
   * @returns none
   */
  public moveRobot(): void {
    this.checkIfActive();
    const newPosition = this.movement.translate(this.robot.position);
    this.updateIfValidPosition(newPosition);
  }

  /**
   * rotateRobotLeft [LEFT]
   * rotate the robot using the movement manager 
   * 
   * @param none
   * @returns none
   */
  public rotateRobotLeft(): void {
    this.checkIfActive();
    const newPosition = this.movement.rotateLeft(this.robot.position);
    this.robot.updatePosition(newPosition);
  }

  /**
   * rotateRobotRight [RIGHT]
   * rotate the robot using the movement manager 
   * 
   * @param none
   * @returns none
   */
  public rotateRobotRight(): void {
    this.checkIfActive();
    const newPosition = this.movement.rotateRight(this.robot.position);
    this.robot.updatePosition(newPosition);
  }
  
  /**
   * getRobotPosition [REPORT]
   * getter for the robots position 
   * 
   * @param none
   * @returns string value of the robots position
   */
  public getRobotPosition(): Position {
    this.checkIfActive();
    return this.robot.position
  }
  
  /**
   * getRobotPositionAsString [REPORT]
   * getter for the robots position 
   * 
   * @param none
   * @returns string value of the robots position
   */
  public getRobotPositionAsString(): string {
    this.checkIfActive();
    const position = this.getRobotPosition();
    const position_as_string = `${position.x},${position.y},${position.direction}`;
    return position_as_string
  }

  /**
   * setRobotPosition [PLACE]
   * setter for the robots position 
   * 
   * @param position
   * @returns none
   */
  public setRobotPosition(position: Position): void {
    this.updateIfValidPosition(position);
  }
  
  
  public addObstacle(obstacle: Obstacle): void {
    if ((!this.isActive) && (this.table.isWithinTable(obstacle.coordinate) && !this.hasObstacles(obstacle.coordinate))) {
      process.stdout.write("obstacle added!\n");
      this.obstacles.push(obstacle);
    }
  }
  
}