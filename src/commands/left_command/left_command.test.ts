import { Position } from "../../core/entities/position/position.js";
import { Game } from "../../core/game/game.js";
import { LeftCommand } from "./left_command.js";


describe('LeftCommand Unit Tests', () => {
  
  it('should rotate the robot from NORTH --> WEST, without changing its position', () => {
    const xPos = 1;
    const yPos = 2;
    const initialDirection = "NORTH";
    const expectedDirection = "WEST";
    const game = new Game();
    
    game.setRobotPosition(new Position(xPos, yPos, initialDirection));
    
    const command = new LeftCommand();
    command.execute(game);
    
    const newPosition = game.getRobotPosition();
    expect(newPosition.direction).toBe(expectedDirection);
    expect(newPosition.x).toBe(xPos);
    expect(newPosition.y).toBe(yPos);
  });

  it('should rotate the robot SOUTH --> EAST, values should wrap', () => {
    const xPos = 1;
    const yPos = 2;
    const initialDirection = "SOUTH";
    const expectedDirection = "EAST";
    const game = new Game();
    
    game.setRobotPosition(new Position(xPos, yPos, initialDirection));
    
    const command = new LeftCommand();
    command.execute(game);
    
    const newPosition = game.getRobotPosition();
    expect(newPosition.direction).toBe(expectedDirection);
  });
});