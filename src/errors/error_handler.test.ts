import { Position } from "../core/entities/position/position.js";
import { 
  UnknownCommandError,
  UnexpectedArgumentsError,
  NoCommandError,
  CommandUnkownOrNotActiveError,
  InvalidArgumetnSyntaxError,
  InvalidDirectionError,
  InvalidStateError,
  InvariantViolationError,
  EndOfDemoError,
  ExitApplicationError,
  UnPlacedRobotError
} from "./core_errors.js"


describe('Error Handler', () => {
  it('should initialise with default values (0, 0, "")', () => {
    const position = new Position();
    expect(position.x).toBe(0);
    expect(position.y).toBe(0);
    expect(position.direction).toBe("");
  });
});