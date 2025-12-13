
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

  public movePosition(moveAmount = 0, currentPositionX = -1, currentPositionY = -1, currentDirectionName = ""): [number, number] {
    const dir_cur = this.getDirection(currentDirectionName);
    const dir_x_cur = dir_cur.i;
    const dir_y_cur = dir_cur.j;
    const pos_x_new = currentPositionX + dir_x_cur*moveAmount;
    const pos_y_new = currentPositionY + dir_y_cur*moveAmount;
    return [pos_x_new, pos_y_new]
  }
}


export default DirectionManager
