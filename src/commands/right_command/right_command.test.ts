import { Position } from "../../core/entities/position/position.js";
import { Game } from "../../core/game/game.js";
import { RightCommand } from "./right_command.js";
import { UnexpectedArgumentsError } from "../../errors/core_errors.js";


describe('RightCommand Unit Tests', () => {
  let game: Game;
  let placePosition: Position;

  beforeEach(() => {
    game = new Game();
    placePosition = new Position(1, 2, "NORTH");
    game.updateIfValidPosition(placePosition);
  });

  it('should should be active allowing us to test the RIGHT command', () => {
    expect(game.isActive).toBe(true);
  });
  
  it('should initialise with no args', () => {
    const rightCommand = new RightCommand();
    expect(rightCommand.args).toBe("");
  });
  
  it('should throw an UnexpectedArgumentsError when initialised with args', () => {
    expect(() => {
      new RightCommand("args");
    }).toThrow(UnexpectedArgumentsError);
  });

  it('should rotate the robot NORTH --> EAST', () => {
    const command = new RightCommand();
    command.execute(game);
    const newPosition = game.getRobotPosition();
    expect(newPosition.direction).toBe("EAST");
    expect(newPosition.x).toBe(1);
    expect(newPosition.y).toBe(2);
  });

  it('should rotate the robot EAST --> SOUTH, values should wrap', () => {
    game.setRobotPosition(new Position(1, 2, "EAST"));
    const command = new RightCommand();
    command.execute(game);
    const newPosition = game.getRobotPosition();
    expect(newPosition.direction).toBe("SOUTH");
  });
});