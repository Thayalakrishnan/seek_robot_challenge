import { Position } from "./position.js";

export class Direction {
  static directionIndex = 0;

  public index: number;
  public name: string;
  public i: number;
  public j: number;
  public tile: string;

  constructor(name = "", index = 0, i = 0, j = 0, tile = "") {
    this.index = Direction.directionIndex;
    Direction.directionIndex++;
    this.name = name;
    this.index = index;
    this.i = i;
    this.j = j;
    this.tile = tile;
  }
}

export class DirectionManager {

  private moveAmount = 1;
  private dirDict = new Map<string, Direction>;
  private nullDirection = new Direction("NULL", 0, 0, 0, "🟦");

  constructor() {
    this.addDirection("EAST", 0, 1, 0, "⏩");
    this.addDirection("NORTH", 1, 0, 1, "⏫");
    this.addDirection("WEST", 2, -1, 0, "⏪");
    this.addDirection("SOUTH", 3, 0, -1, "⏬");
    //this.dirDict.set(this.nullDirection.name, this.nullDirection);
  }

  public addDirection(name = "", index = 0, i = 0, j = 0, tile = ""): void {
    const newDirection = new Direction(name, index, i, j, tile)
    this.dirDict.set(name, newDirection);
  }

  public getDirection(name = ""): Direction {
    const direction: Direction = this.dirDict.get(name) ?? this.nullDirection;
    return direction
  }

  public rotate(position: Position, rotation: number): Position {
    const length = this.dirDict.size;
    const keys = [...this.dirDict.keys()];
    const cur_pos = keys.indexOf(position.direction);
    const new_pos = (cur_pos + rotation) % length;
    const cur_dir = this.dirDict.get(keys[new_pos]) ?? this.nullDirection;
    return new Position(position.x, position.y, cur_dir.name)
  }

  public rotateRight(position: Position): Position {
    return this.rotate(position, -1)
  }

  public rotateLeft(position: Position): Position {
    return this.rotate(position, 1)
  }

  public move(moveAmount = 0, position: Position): Position {
    const currentDirection = this.getDirection(position.direction);
    const horizontalTranslation = currentDirection.i;
    const verticalTranslation = currentDirection.j;
    const newX = position.x + horizontalTranslation*moveAmount;
    const newY = position.y + verticalTranslation*moveAmount;
    return new Position(newX, newY, currentDirection.name);
  }
  
  
  public moveVertical(position: Position, sign: number): Position {
    const newY = position.y + this.moveAmount*sign;
    return new Position(position.x, newY, position.direction);
  }
  
  public moveHorizontal(position: Position, sign: number): Position {
    const newX = position.x + this.moveAmount*sign;
    return new Position(newX, position.y, position.direction);
  }
  
  public moveWest(position: Position): Position {
    return this.moveHorizontal(position, -1);
  }
  
  public moveEast(position: Position): Position {
    return this.moveHorizontal(position, 1);
  }
  
  public moveNorth(position: Position): Position {
    return this.moveVertical(position, 1);
  }
  
  public moveSouth(position: Position): Position {
    return this.moveVertical(position, -1);
  }
  
  public movePosition(position: Position): Position {
    const currentDirection = this.getDirection(position.direction);
    const horizontalTranslation = currentDirection.i;
    const verticalTranslation = currentDirection.j;
    const newX = position.x + horizontalTranslation*this.moveAmount;
    const newY = position.y + verticalTranslation*this.moveAmount;
    return new Position(newX, newY, currentDirection.name);
  }
}
