import { Game } from "./game.js";


export class Renderer {
  robot = "🤖";
  tile = "🟥";

  constructor() {
  }

  print_frame(game: Game): void {
    for (let j = game.table.height - 1; j >= 0; j--) {
      const row: string[] = [];
      if (j===game.robot.position.y) {
        for (let i = 0; i < game.table.width; i++) {
          if (i===game.robot.position.x) {
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
    console.log("------------");
  }
}
