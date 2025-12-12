import { Game } from "./game.js";


export class Renderer {
  robot = "🤖";
  tile = "🟥";

  constructor() {
    console.log(`[Renderer][constructor] robot: ${this.robot} tile: ${this.tile}`);
  }

  print_frame(game: Game): void {
    console.log("------------");
    for (let j = 0; j < game.table.height; j++) {
      const row: string[] = [];
      if (j===game.robot.pos_y) {
        for (let i = 0; i < game.table.width; i++) {
          if (i===game.robot.pos_x) {
            row.push(game.robot.get_tile());
          } else {
            row.push(this.tile);
          }
        }
      } else {
        row.push(...new Array(game.table.width).fill(this.tile));
      }
      console.log(row.join(''));
    }
  }
}
