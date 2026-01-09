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
  
  /**
   * check if the current coodintate is valid
   * - check that it is within the table
   * - check that there is no obstructions
   */
  private isValid(coordinate: Coordinate, visited: Coordinate[]) {
    // If cell lies out of bounds
    if (!this.table.isWithinTable(coordinate)) {
      return false;
    }
    
    // if there are obstacles in the way
    if (this.hasObstacles(coordinate)) {
      return false;
    }
    
    // If cell is already visited
    const hasVisited = visited.find((coor) => coordinate.x === coor.x && coordinate.y === coor.y);
    if (hasVisited) {
      return false;
    }
    return true;
  }
  
  public findPath(to: Coordinate): string {
    const from = new Coordinate(this.robot.position.x, this.robot.position.y);
    const queue: Array<Coordinate[]> = [[from]];
    const visitedNodes: Coordinate[] = [from];
    let goodPath: Coordinate[] = [];
    
    while(queue.length > 0) {
      
      const previousNodes = queue.shift();
      
      if (!previousNodes) {
        break;
      }
      
      const currentNode = previousNodes.at(-1);
      if (!currentNode) {
        break;
      }
      
      // found a path
      if (currentNode.x === to.x && currentNode.y === to.y) {
        goodPath = [...previousNodes]
        break
      }
      
      // check each surrounding node
      const northNode = new Coordinate(currentNode.x, currentNode.y + 1);
      const eastNode = new Coordinate(currentNode.x + 1, currentNode.y);
      const southNode = new Coordinate(currentNode.x, currentNode.y - 1);
      const westNode = new Coordinate(currentNode.x - 1, currentNode.y);
      
      const nodes = [northNode, eastNode, southNode, westNode];
      
      nodes.forEach((nextNode) => {
        if (this.isValid(nextNode, visitedNodes)) {
          previousNodes.push(nextNode);
          queue.push([...previousNodes]);
          visitedNodes.push(nextNode);
        }
      })
    }
    
    if (goodPath.length) {
      let fullPath = `Path length: ${goodPath.length}\n`;
      fullPath += goodPath.map((node) => `(${node.x},${node.y})`).join(",")
      return fullPath
    }
    
    // no path found
    return "No path found"
  }
  
  
}