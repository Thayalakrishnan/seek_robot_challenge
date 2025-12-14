import * as readline from 'node:readline/promises';
import { Renderer } from "./abstracts/renderer.js";
import { Game } from "../../core/game/game.js";


export class GraphicRenderer extends Renderer{
  private robotTile: string = "🤖";
  private cellTile: string = "🟥";
  private receiver: readline.Interface;
  private directionTiles: Map<string, string> = new Map();
  

  constructor(public game: Game, receiver: readline.Interface) {
    super(game);
    this.receiver = receiver;
    this.directionTiles.set("EAST", "⏩");
    this.directionTiles.set("NORTH", "⏫");
    this.directionTiles.set("WEST", "⏪");
    this.directionTiles.set("SOUTH", "⏬");
  }
  
  public render(out: string | void): void {
    const currentPosition = this.game.robot.position;
    const currentTile = this.directionTiles.get(currentPosition.direction) ?? this.robotTile;
    
    for (let j = this.game.table.height - 1; j >= 0; j--) {
      const row: string[] = [];
      if (j===currentPosition.y) {
        for (let i = 0; i < this.game.table.width; i++) {
          if (i===currentPosition.x) {
            row.push(currentTile);
          } else {
            row.push(this.cellTile);
          }
        }
      } else {
        row.push(...new Array(this.game.table.width).fill(this.cellTile));
      }
      const line = `${row.join('')}\n`
      this.receiver.write(line);
    }
  }
}
