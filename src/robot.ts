import { Position  } from "./position.js";


export class Robot {
  public position: Position;
  public isPlaced: boolean;
  public tile: string;

  constructor() {
    this.tile = "🟦";
    this.position = new Position(-1, -1, "");
    this.isPlaced = false;
  }

  getTile(): string {
    return this.tile
  }

  updatePosition(position: Position): void {
    this.position = position;
    this.isPlaced = true;
  }
}
