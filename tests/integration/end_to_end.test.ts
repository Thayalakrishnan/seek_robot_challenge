import { Game } from "../../src/core/game/game.js";
import { LeftCommand } from "../../src/commands/left_command/left_command.js";
import { MoveCommand } from "../../src/commands/move_command/move_command.js";
import { PlaceCommand } from "../../src/commands/place_command/place_command.js";
import { ReportCommand } from "../../src/commands/report_command/report_command.js";
import { InvalidArgumetnSyntaxError } from "../../src/errors/core_errors.js";


describe('Game Command Integration Tests', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  const executeCommand = (CommandClass: any, args: string = "") => {
    const ret = new CommandClass(args).execute(game);
    return ret
  };

  it('should place the robot, move it, and report the correct position', () => {
    // place the robot
    executeCommand(PlaceCommand, "1,2,EAST");
    expect(game.isActive).toBe(true);
    expect(game.getRobotPosition().x).toBe(1);
    
    // move the robot
    executeCommand(MoveCommand);
    expect(game.getRobotPosition().x).toBe(2);
    
    // rotate the robot
    executeCommand(LeftCommand);
    expect(game.getRobotPosition().direction).toBe("NORTH");

    const out = executeCommand(ReportCommand);
    expect(out).toBe("Output: 2,2,NORTH");
  });

  it('should ignore movement/rotation commands if not placed, then execute PLACE', () => {
    // execute move command and show that the robot hasnt moved
    expect(game.isActive).toBe(false);
    executeCommand(MoveCommand);
    const out = executeCommand(ReportCommand);
    expect(out).toBe("Output: -1,-1,");

    // place the robot
    executeCommand(PlaceCommand, "0,0,SOUTH");
    
    // check the game is active
    expect(game.isActive).toBe(true);
    expect(game.getRobotPosition().x).toBe(0);
  });

  it('should prevent the robot from falling off the edge', () => {
    // place at table extreme then move
    executeCommand(PlaceCommand, "4,4,NORTH");
    executeCommand(MoveCommand);
    executeCommand(MoveCommand);
    
    // position should be unchnaged
    const out = executeCommand(ReportCommand);
    expect(out).toBe("Output: 4,4,NORTH");
    
    // check another boundary
    executeCommand(PlaceCommand, "0,4,WEST");
    executeCommand(MoveCommand);
    executeCommand(MoveCommand);

    // Position must be (0,4,WEST)
    const out2 = executeCommand(ReportCommand);
    expect(out2).toBe("Output: 0,4,WEST");
  });

  it('should throw an error on an invalid PLACE command and stop the sequence', () => {

    executeCommand(PlaceCommand, "2,2,SOUTH");
    expect(() => {
      executeCommand(PlaceCommand, "1,2");
    }).toThrow(InvalidArgumetnSyntaxError);

    // Verify position is unchanged
    const out = executeCommand(ReportCommand);
    expect(out).toBe("Output: 2,2,SOUTH");

    // Verify game is still running
    executeCommand(MoveCommand);
    expect(game.getRobotPosition().y).toBe(1);
  });
});