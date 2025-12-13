import { Position  } from "./position.js";


export class Robot {
  public position: Position;
  public is_placed: boolean;
  public tile: string;

  constructor() {
    this.tile = "🟦";
    this.position = new Position(-1, -1, "");
    this.is_placed = false;
  }

  get_tile(): string {
    return this.tile
  }

  set_tile(tile: string): void {
    this.tile = tile;
  }
  
  updatePosition(position: Position): void {
    this.position = position;
    this.is_placed = true;
  }
}
