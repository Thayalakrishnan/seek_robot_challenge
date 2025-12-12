export type DirArgs = [number, number, string];


export class Robot {
  public pos_x: number;
  public pos_y: number;
  public direction: DirArgs;
  public is_placed: boolean;

  constructor(x = -1, y = -1, direction:DirArgs = [0, 0, "🟦"]) {
    this.is_placed = false;
    this.pos_x = x;
    this.pos_y = y;
    this.direction = direction;

    console.log(`[Robot][constructor] pos_x: ${this.pos_x} pos_y: ${this.pos_y}`);
  }

  get_tile(): string {
    return this.direction[2]
  }
}


export default Robot
