import { Position } from "../../core/entities/position/position.js";
import { Game } from "../../core/game/game.js";
import { ReportCommand } from "./report_command.js";


describe('ReportCommand Unit Tests', () => {

  it('should return the position and format', () => {
    const game = new Game();
    const xPos = 1;
    const yPos = 2;
    const direction = "NORTH";
    const expectedOutput = `Output: ${xPos},${yPos},${direction}`;
    
    const position = new Position(xPos, yPos, direction);
    game.setRobotPosition(position);
    
    const command = new ReportCommand();
    const out = command.execute(game);
    
    expect(out).toBe(expectedOutput);
  });
});