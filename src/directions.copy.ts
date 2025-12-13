import { Position } from "./position.js";

enum CompassDirections {
  EAST,
  NORTH,
  WEST,
  SOUTH,
}

export class Direction {
  public name: string;
  public toTheRight: string; 
  public toTheLeft: string; 
  
  constructor(
    public value: number, 
    public tile: string,
    public horizontalOffset: number,
    public verticalOffset: number,
    public sign: number,
    ) {
      this.name = CompassDirections[this.value];
      const toTheRight = (this.value + 1) % 3;
      const toTheLeft = this.value - 1 < 0 ? 3 : this.value - 1;
      this.toTheRight = CompassDirections[toTheRight];
      this.toTheLeft = CompassDirections[toTheLeft];
  }
  
  public move(position: Position, amount: number): Position {
    const newY = position.y + amount*this.horizontalOffset*this.sign;
    const newX = position.x + amount*this.horizontalOffset*this.sign;
    return new Position(newX, newY, position.direction);
  } 
  
  public rotateRight(position: Position): Position {
    return new Position(position.x, position.y, this.toTheRight);
  }
  
  public rotateLeft(position: Position): Position {
    return new Position(position.x, position.y, this.toTheLeft);
  }
}


class DirectionNorth extends Direction {
  constructor() {
    super(CompassDirections.NORTH, "", 0, 1, 1)
  }
}

class DirectionSouth extends Direction {
  constructor() {
    super(CompassDirections.SOUTH, "", 0, 1, -1)
    
  }
}

class DirectionEast extends Direction {
  constructor() {
    super(CompassDirections.EAST, "", 1, 0, 1)
  }
}

class DirectionWest extends Direction {
  constructor() {
    super(CompassDirections.WEST, "", 1, 0, -1)
  }
}



export class DirectionRegistry {

  private directionDict = new Map<string, Direction>;
  private nullDirection = new Direction(-1, "", 0, 0, 0);
  
  constructor() {
    this.register(new DirectionEast());
    this.register(new DirectionNorth());
    this.register(new DirectionWest());
    this.register(new DirectionSouth());
  }
  
  public register(directionInstance: Direction): void {
    this.directionDict.set(directionInstance.name, directionInstance);
  }

  public getCommand(name = ""): Direction {
    const direction: Direction = this.directionDict.get(name) ?? this.nullDirection;
    return direction
  }
}


// export class DirectionManager {

//   private moveAmount = 1;
//   private dirDict = new Map<string, Direction>;
//   private nullDirection = new Direction("NULL", 0, 0, 0, "🟦");

//   constructor() {
//     this.addDirection("EAST", 0, 1, 0, "⏩");
//     this.addDirection("NORTH", 1, 0, 1, "⏫");
//     this.addDirection("WEST", 2, -1, 0, "⏪");
//     this.addDirection("SOUTH", 3, 0, -1, "⏬");
//     //this.dirDict.set(this.nullDirection.name, this.nullDirection);
//   }

//   public addDirection(name = "", index = 0, i = 0, j = 0, tile = ""): void {
//     const newDirection = new Direction(name, index, i, j, tile)
//     this.dirDict.set(name, newDirection);
//   }

//   public getDirection(name = ""): Direction {
//     const direction: Direction = this.dirDict.get(name) ?? this.nullDirection;
//     return direction
//   }

//   public rotate(position: Position, rotation: number): Position {
//     const length = this.dirDict.size;
//     const keys = [...this.dirDict.keys()];
//     const cur_pos = keys.indexOf(position.direction);
//     const new_pos = (cur_pos + rotation) % length;
//     const cur_dir = this.dirDict.get(keys[new_pos]) ?? this.nullDirection;
//     return new Position(position.x, position.y, cur_dir.name)
//   }

//   public rotateRight(position: Position): Position {
//     return this.rotate(position, -1)
//   }

//   public rotateLeft(position: Position): Position {
//     return this.rotate(position, 1)
//   }

//   public move(moveAmount = 0, position: Position): Position {
//     const currentDirection = this.getDirection(position.direction);
//     const horizontalTranslation = currentDirection.i;
//     const verticalTranslation = currentDirection.j;
//     const newX = position.x + horizontalTranslation*moveAmount;
//     const newY = position.y + verticalTranslation*moveAmount;
//     return new Position(newX, newY, currentDirection.name);
//   }
  
  
//   public moveVertical(position: Position, sign: number): Position {
//     const newY = position.y + this.moveAmount*sign;
//     return new Position(position.x, newY, position.direction);
//   }
  
//   public moveHorizontal(position: Position, sign: number): Position {
//     const newX = position.x + this.moveAmount*sign;
//     return new Position(newX, position.y, position.direction);
//   }
  
//   public moveWest(position: Position): Position {
//     return this.moveHorizontal(position, -1);
//   }
  
//   public moveEast(position: Position): Position {
//     return this.moveHorizontal(position, 1);
//   }
  
//   public moveNorth(position: Position): Position {
//     return this.moveVertical(position, 1);
//   }
  
//   public moveSouth(position: Position): Position {
//     return this.moveVertical(position, -1);
//   }
  
//   public movePosition(position: Position): Position {
//     const currentDirection = this.getDirection(position.direction);
//     const horizontalTranslation = currentDirection.i;
//     const verticalTranslation = currentDirection.j;
//     const newX = position.x + horizontalTranslation*this.moveAmount;
//     const newY = position.y + verticalTranslation*this.moveAmount;
//     return new Position(newX, newY, currentDirection.name);
//   }
// }
