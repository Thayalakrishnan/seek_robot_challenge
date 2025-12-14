import { Position } from "../../core/entities/position/position.js";
import { Game } from "../../core/game/game.js";
import { ReportCommand } from "./report_command.js";


describe('ReportCommand Unit Tests', () => {
  let command: ReportCommand;
  let mockGame: Game;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGame = new Game();
    command = new ReportCommand();
  });

  it('should return the position and format', () => {
    const testPosition = new Position(3, 3, "SOUTH");
    mockGame.setRobotPosition(testPosition);
    const out = command.execute(mockGame);
    expect(out).toBe("Output: 3,3,SOUTH\n")
  });


  it('should NOT call any movement or state change methods on the Game object', () => {
    const spymoveRobot = jest.spyOn(mockGame, 'moveRobot');
    const spyrotateRobotLeft = jest.spyOn(mockGame, 'rotateRobotLeft');
    const spysetRobotPosition = jest.spyOn(mockGame, 'setRobotPosition');
    
    command.execute(mockGame);

    expect(spymoveRobot).not.toHaveBeenCalled();
    expect(spyrotateRobotLeft).not.toHaveBeenCalled();
    expect(spysetRobotPosition).not.toHaveBeenCalled();
  });
});