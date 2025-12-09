import { Position } from "../../core/entities/position/position.js";
import { Game } from "../../core/game/game.js";
import { MoveCommand } from "./move_command.js";


describe('MoveCommand Unit Tests', () => {
  
  it('should move the robot 1 step in the desired direction and not change directions', () => {
    const xPos = 0;
    const yPos = 0;
    const direction = "EAST";
    const expectedXPos = xPos + 1;
    const expectedYPos = yPos;
    const expectedDirection = direction;
    const game = new Game();
    
    game.setRobotPosition(new Position(xPos, yPos, direction));
    
    const command = new MoveCommand();
    command.execute(game);
    
    const newPosition = game.getRobotPosition();
    expect(newPosition.direction).toBe(expectedDirection);
    expect(newPosition.x).toBe(expectedXPos);
    expect(newPosition.y).toBe(expectedYPos);
  });
});