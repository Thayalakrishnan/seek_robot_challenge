import { createMockGame } from "../../../tests/mocks/mock_game.js";
import { Position } from "../../core/entities/position/position.js";
import { Game } from "../../core/game/game.js";
import { MoveCommand } from "./move_command.js";


describe('MoveCommand Unit Tests', () => {
  let game: Game;
  let placePosition: Position;

  beforeEach(() => {
    game = new Game();
    placePosition = new Position(1, 2, "NORTH");
    game.updateIfValidPosition(placePosition);
  });

  it('should initialise with the arguments provided', () => {
    const command = new MoveCommand("");
    expect(command.args).toBe("");
    expect(game.isActive).toBe(true);
  });

  it('should call game.moveRobot() exactly once when executed', () => {
    const mockGame = createMockGame();
    const command = new MoveCommand();
    command.execute(mockGame);
    expect(mockGame.moveRobot).toHaveBeenCalledTimes(1);
  });

  it('should NOT call any rotation or update methods on the Game object', () => {
    //game = createMockGame();
    const mockGame = createMockGame();
    const command = new MoveCommand();
    command.execute(game);

    expect(mockGame.rotateRobotLeft).not.toHaveBeenCalled();
    expect(mockGame.rotateRobotRight).not.toHaveBeenCalled();
    expect(mockGame.setRobotPosition).not.toHaveBeenCalled();
  });
});