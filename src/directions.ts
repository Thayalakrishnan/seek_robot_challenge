
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

  private dirDict = new Map<string, Direction>;
  private nullDirection = new Direction("NULL", 0, 0, 0, "🟦");

  constructor() {
    //this.dirDict.set("EAST", new Direction("EAST", 1, 0, "⏩"));
    //this.dirDict.set("NORTH", new Direction("NORTH", 0, 1, "⏫"));
    //this.dirDict.set("WEST", new Direction("WEST", -1, 0, "⏪"));
    //this.dirDict.set("SOUTH", new Direction("SOUTH", 0, -1, "⏬"));
    this.addDirection("EAST", 0, 1, 0, "⏩");
    this.addDirection("NORTH", 1, 0, 1, "⏫");
    this.addDirection("WEST", 2, -1, 0, "⏪");
    this.addDirection("SOUTH", 3, 0, -1, "⏬");
    //this.dirDict.set(this.nullDirection.name, this.nullDirection);
  }

  //public register(commandInstance: BaseCommand): void {
  //  this.dirDict.set(commandInstance.name, commandInstance);
  //}

  public addDirection(name = "", index = 0, i = 0, j = 0, tile = ""): void {
    const newDirection = new Direction(name, index, i, j, tile)
    this.dirDict.set(name, newDirection);
  }

  public getDirection(name = ""): Direction {
    const direction: Direction = this.dirDict.get(name) ?? this.nullDirection;
    return direction
  }

  public rotateDirection(currentDirectionName = "", rotation: number): Direction {
    const length = this.dirDict.size;
    const keys = [...this.dirDict.keys()];
    const cur_pos = keys.indexOf(currentDirectionName);
    const new_pos = (cur_pos + rotation) % length;
    const cur_dir = this.dirDict.get(keys[new_pos]) ?? this.nullDirection;
    return cur_dir
  }

  public rotateRight(currentDirectionName = ""): Direction {
    return this.rotateDirection(currentDirectionName, -1)
  }

  public rotateLeft(currentDirectionName = ""): Direction {
    return this.rotateDirection(currentDirectionName, 1)
  }
}


export default DirectionManager
