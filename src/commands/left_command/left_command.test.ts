import { Position } from "../../core/entities/position/position.js";
import { Game } from "../../core/game/game.js";
import { LeftCommand } from "./left_command.js";
import { UnexpectedArgumentsError } from "../../errors/core_errors.js";


describe('LeftCommand Unit Tests', () => {
  let game: Game;
  let placePosition: Position;

  beforeEach(() => {
    game = new Game();
    placePosition = new Position(1, 2, "NORTH");
    game.updateIfValidPosition(placePosition);
  });

  it('should be active allowing us to test the LEFT command', () => {
    expect(game.isActive).toBe(true);
  });
  
  it('should initialised with no args', () => {
    const rightCommand = new LeftCommand();
    expect(rightCommand.args).toBe("");
  });
  
  it('should throw an UnexpectedArgumentsError when initialised with args', () => {
    expect(() => {
      new LeftCommand("args");
    }).toThrow(UnexpectedArgumentsError);
  });

  it('should rotate the robot from NORTH to WEST', () => {
    const command = new LeftCommand();
    command.execute(game);
    const newPosition = game.getRobotPosition();
    expect(newPosition.direction).toBe("WEST");
    expect(newPosition.x).toBe(1);
    expect(newPosition.y).toBe(2);
  });

  it('should rotate the robot from SOUTH back to EAST (wrap-around)', () => {
    game.setRobotPosition(new Position(1, 2, "SOUTH"));
    const command = new LeftCommand();
    command.execute(game);
    const newPosition = game.getRobotPosition();
    expect(newPosition.direction).toBe("EAST");
  });
});