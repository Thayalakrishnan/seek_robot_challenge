import { Position } from "../core/entities/position/position.js";
import { 
  UnknownCommandUserInputError,
  UnexpectedArgumentsUserInputError,
  NoCommandUserInputError,
  InvalidArgumentSyntaxUserInputError,
  InvalidDirectionUserInputError,
  ExitApplicationError,
  UnPlacedRobotError,
  NoArgumentProvidedUserInputError,
} from "./core_errors.js"

import { ErrorHandler } from "./error_handler.js"


describe('Error Handler', () => {
  it('should initialise with default values (-1, -1, "NORTH")', () => {
    const position = new Position();
    expect(position.x).toBe(-1);
    expect(position.y).toBe(-1);
    expect(position.direction).toBe("NORTH");
  });
});



describe('Testing Error Handler', () => {
  // use this mock to check error outputs
  let stderrSpy: jest.SpyInstance;

  beforeEach(() => {
    stderrSpy = jest.spyOn(process.stderr, 'write').mockImplementation(() => true);
  });

  afterEach(() => {
    stderrSpy.mockRestore();
  });
  
  it('should handle ExitApplicationError and return true', () => {
    const error = new ExitApplicationError();
    const result = ErrorHandler(error);

    expect(stderrSpy).toHaveBeenCalledWith('Exiting Application\n');
    expect(result).toBe(true);
  });

  it('should handle UnknownCommandUserInputError and return false', () => {
    const error = new UnknownCommandUserInputError('INVALID');
    const result = ErrorHandler(error);

    expect(stderrSpy).toHaveBeenCalledWith('Unknown Command: "INVALID"\n');
    expect(result).toBe(false);
  });
  
  it('should handle UnexpectedArgumentsUserInputError and return false', () => {
    const error = new UnexpectedArgumentsUserInputError('BAD_ARGS');
    const result = ErrorHandler(error);

    expect(stderrSpy).toHaveBeenCalledWith('Unexpected Arguments: "BAD_ARGS"\n');
    expect(result).toBe(false);
  });
  
  it('should handle NoArgumentProvidedUserInputError and return false', () => {
    const error = new NoArgumentProvidedUserInputError();
    const result = ErrorHandler(error);

    expect(stderrSpy).toHaveBeenCalledWith('Command requires arguments\n');
    expect(result).toBe(false);
  });
  
  it('should handle NoCommandUserInputError and return false', () => {
    const error = new NoCommandUserInputError();
    const result = ErrorHandler(error);

    expect(stderrSpy).toHaveBeenCalledWith('No command to parse\n');
    expect(result).toBe(false);
  });
  
  it('should handle InvalidArgumentSyntaxUserInputError and return false', () => {
    const error = new InvalidArgumentSyntaxUserInputError('12NORTH');
    const result = ErrorHandler(error);

    expect(stderrSpy).toHaveBeenCalledWith(`Can't parse arguments: "12NORTH"\n`);
    expect(result).toBe(false);
  });
  
  it('should handle InvalidDirectionUserInputError and return false', () => {
    const error = new InvalidDirectionUserInputError('SOUTHWEST');
    const result = ErrorHandler(error);

    expect(stderrSpy).toHaveBeenCalledWith('Not a valid direction: "SOUTHWEST"\n');
    expect(result).toBe(false);
  });
  
  it('should handle UnPlacedRobotError and return false', () => {
    const error = new UnPlacedRobotError();
    const result = ErrorHandler(error);

    expect(stderrSpy).toHaveBeenCalledWith('Robot needs to be placed\n');
    expect(result).toBe(false);
  });

  // default error
  it('should handle generic/unknown errors with a default message', () => {
    const error = new Error('Something went wrong');
    const result = ErrorHandler(error);

    expect(stderrSpy).toHaveBeenCalledWith('Unexpected error\n');
    expect(stderrSpy).toHaveBeenCalledWith('Error: Something went wrong');
    expect(result).toBe(false);
  });
});