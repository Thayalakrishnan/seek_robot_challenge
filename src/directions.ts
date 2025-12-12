
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

  private dirDict = new Map<string, Direction>;
  private nullDirection = new Direction("NONE", 0, 0, "🟦");

  constructor() {
    this.dirDict.set("NORTH", new Direction("NORTH", 0, 1, "⏫"));
    this.dirDict.set("WEST", new Direction("WEST", -1, 0, "⏪"));
    this.dirDict.set("SOUTH", new Direction("SOUTH", 0, -1, "⏫"));
    this.dirDict.set("EAST", new Direction("EAST", 1, 0, "⏩"));
    this.dirDict.set(this.nullDirection.name, this.nullDirection);
  }

  //public register(commandInstance: BaseCommand): void {
  //  this.dirDict.set(commandInstance.name, commandInstance);
  //}

  public getDirection(name = "NULL"): Direction {
    const direction: Direction = this.dirDict.get(name) ?? this.nullDirection;
    return direction
  }
}


export default DirectionManager
