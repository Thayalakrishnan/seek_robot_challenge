import { Position } from "../../core/entities/position/position.js";
import { Game } from "../../core/game/game.js";
import { RightCommand } from "./right_command.js";


describe('RightCommand Unit Tests', () => {

  it('should rotate the robot NORTH --> EAST, , without changing its position', () => {
    const xPos = 1;
    const yPos = 2;
    const initialDirection = "NORTH";
    const expectedDirection = "EAST";
    const game = new Game();
    
    game.setRobotPosition(new Position(xPos, yPos, initialDirection));
    
    const command = new RightCommand();
    command.execute(game);
    
    const newPosition = game.getRobotPosition();
    expect(newPosition.direction).toBe(expectedDirection);
    expect(newPosition.x).toBe(xPos);
    expect(newPosition.y).toBe(yPos);
  });

  it('should rotate the robot EAST --> SOUTH, values should wrap', () => {
    const xPos = 1;
    const yPos = 2;
    const initialDirection = "EAST";
    const expectedDirection = "SOUTH";
    const game = new Game();
    
    game.setRobotPosition(new Position(xPos, yPos, initialDirection));
    
    const command = new RightCommand();
    command.execute(game);
    
    const newPosition = game.getRobotPosition();
    expect(newPosition.direction).toBe(expectedDirection);
  });
});