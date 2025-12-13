
export class Direction {
  public name: string;
  public i: number;
  public j: number;
  public tile: string;

  constructor(name = "", i = 0, j = 0, tile = "") {
    this.name = name;
    this.i = i;
    this.j = j;
    this.tile = tile;
  }
}


export class DirectionManager {
  // consider getting setting direction length here
  private directions: Direction[] = [];
  private nullDirection = new Direction("NULL", 0, 0, "🟦");
  
  constructor(
  ) {
    this.addDirection("EAST", 1, 0, "⏩");
    this.addDirection("NORTH", 0, 1, "⏫");
    this.addDirection("WEST", -1, 0, "⏪");
    this.addDirection("SOUTH", 0, -1, "⏬");
  }

  public addDirection(directionName = "", i = 0, j = 0, tile = ""): void {
    this.directions.push(new Direction(directionName, i, j, tile));
  }

  public getDirection(directionName = ""): Direction {
    return this.directions.find((dir) => dir.name === directionName) ?? this.nullDirection
  }
  
  public getDirectionIndex(directionName = ""): number {
    return this.directions.findIndex((dir) => dir.name === directionName) ?? -1
  }
  
  public rotateDirection(currentDirectionName = "", rotation: number): Direction {
    const curPos = this.getDirectionIndex(currentDirectionName);
    const newPos = (curPos + rotation) % this.directions.length;
    return this.directions.at(newPos) ?? this.nullDirection;
  }
  
  public rotateRight(currentDirectionName = ""): Direction {
    return this.rotateDirection(currentDirectionName, -1)
  }

  public rotateLeft(currentDirectionName = ""): Direction {
    return this.rotateDirection(currentDirectionName, 1)
  }
}


export class Translation {
  public name: string;
  public horizontal: number;
  public vertical: number;

  constructor(name = "", horizontal = 0, vertical = 0) {
    this.name = name;
    this.horizontal = horizontal;
    this.vertical = vertical;
  }
}


export class TranslationManager {
  private translateAmount: number;
  private translations: Translation[] = [];
  private nullTranslation = new Translation("NULL", 0, 0);
  
  constructor(
  ) {
    this.translateAmount = 1;
    this.addTranslation("EAST", 1, 0);
    this.addTranslation("NORTH", 0, 1);
    this.addTranslation("WEST", -1, 0);
    this.addTranslation("SOUTH", 0, -1);
  }

  public addTranslation(translationName = "", i = 0, j = 0): void {
    this.translations.push(new Translation(translationName, i, j));
  }

  public getTranslation(translationName = ""): Translation {
    return this.translations.find((dir) => dir.name === translationName) ?? this.nullTranslation
  }
  
  public getTranslationIndex(translationName = ""): number {
    return this.translations.findIndex((dir) => dir.name === translationName) ?? -1
  }
  
  public translate(currentPositionX = -1, currentPositionY = -1, currentDirectionName = ""): [number, number] {
    const currentTranslation = this.getTranslation(currentDirectionName);
    const newPositionX = currentPositionX + currentTranslation.horizontal*this.translateAmount;
    const newPositionY = currentPositionY + currentTranslation.vertical*this.translateAmount;
    return [newPositionX, newPositionY]
  }
}




export class MovementManager {
  constructor(
    private readonly directionManager: DirectionManager
  ) {
  }

  public rotateRight(currentDirectionName = ""): Direction {
    return this.directionManager.rotateRight(currentDirectionName)
  }

  public rotateLeft(currentDirectionName = ""): Direction {
    return this.directionManager.rotateLeft(currentDirectionName)
  }

  public movePosition(moveAmount = 0, currentPositionX = -1, currentPositionY = -1, currentDirectionName = ""): [number, number] {
    const currentDirection = this.directionManager.getDirection(currentDirectionName);
    const newPositionX = currentPositionX + currentDirection.i*moveAmount;
    const newPositionY = currentPositionY + currentDirection.j*moveAmount;
    return [newPositionX, newPositionY]
  }
}


export default MovementManager
