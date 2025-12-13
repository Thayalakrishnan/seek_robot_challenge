import Robot from "./robot.js";

export class Position {
  public x: number;
  public y: number;
  public direction: string;

  constructor(x = 0, y = 0, direction = "") {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }
}

export class Movement {
  public direction: string;
  public horizontal: number;
  public vertical: number;
  public tile: string;

  constructor(direction = "", horizontal = 0, vertical = 0, tile = "") {
    this.direction = direction;
    this.horizontal = horizontal;
    this.vertical = vertical;
    this.tile = tile;
  }
}


export class MovementManager {
  // consider getting setting direction length here
  private translateAmount: number;
  private movements: Movement[] = [];
  private nullMovement = new Movement("NULL", 0, 0, "🟦");
  
  constructor(
  ) {
    this.translateAmount = 1;
    this.addMovement("EAST", 1, 0, "⏩");
    this.addMovement("NORTH", 0, 1, "⏫");
    this.addMovement("WEST", -1, 0, "⏪");
    this.addMovement("SOUTH", 0, -1, "⏬");
  }

  public addMovement(moveMentName = "", i = 0, j = 0, tile = ""): void {
    this.movements.push(new Movement(moveMentName, i, j, tile));
  }

  public getMovement(moveMentName = ""): Movement {
    return this.movements.find((movement) => movement.direction === moveMentName) ?? this.nullMovement
  }
  
  public getMovementIndex(moveMentName = ""): number {
    return this.movements.findIndex((movement) => movement.direction === moveMentName) ?? -1
  }
  
  public rotate(position: Position, rotation: number): void {
    const curPos = this.getMovementIndex(position.direction);
    const newPosIndex = (curPos + rotation) % this.movements.length;
    const newPos = this.movements.at(newPosIndex) ?? this.nullMovement;
    position.direction = newPos.direction;
  }
  
  public rotateRight(position: Position): void {
    this.rotate(position, -1)
  }

  public rotateLeft(position: Position): void {
    this.rotate(position, 1)
  }
  
  public translate(position: Position): void {
    const currentTranslation = this.getMovement(position.direction);
    position.x = position.x + currentTranslation.horizontal*this.translateAmount;
    position.y = position.y + currentTranslation.vertical*this.translateAmount;
  }
}


export class RobotMovement {
  private robot: Robot;
  
  constructor(
    private movementManager: MovementManager,
    robot: Robot
    ) {
    this.robot = robot;
  }

  public rotateLeft(): void {
    this.movementManager.rotateLeft(this.robot.position);
  }
  
  public rotateRight(): void {
    this.movementManager.rotateRight(this.robot.position);
  }
  
  public translateRobot(): void {
    this.movementManager.translate(this.robot.position);
  }
}