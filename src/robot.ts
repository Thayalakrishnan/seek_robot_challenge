
export class Robot {
  public pos_x: number;
  public pos_y: number;
  public direction: string;
  public is_placed: boolean;
  public tile: string;

  constructor() {
    this.is_placed = false;
    this.pos_x = -1;
    this.pos_y = -1;
    this.direction = "";
    this.tile = "🟦";

    console.log(`[Robot][constructor] pos_x: ${this.pos_x} pos_y: ${this.pos_y}`);
  }

  get_tile(): string {
    return this.tile
  }

  set_tile(tile: string): void {
    this.tile = tile;
  }
}


export default Robot
