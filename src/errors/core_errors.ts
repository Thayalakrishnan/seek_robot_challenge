export abstract class AppError extends Error {
  
  abstract readonly isOperational: boolean;
  abstract readonly killApplication: boolean;
  
  constructor(message = "") {
    super(message);
    // grab the name of the class
    this.name = new.target.name;
  }
}

export class ExitApplicationError extends AppError {
  readonly isOperational = true;
  readonly killApplication = true;
}

// user input error
abstract class UserInputError extends AppError {
  readonly isOperational = true;
  readonly killApplication = false;
}

export class UnknownCommandUserInputError extends UserInputError {}

export class UnexpectedArgumentsUserInputError extends UserInputError {
  /**
   * class UnexpectedArgumentsUserInputError
   * This error is thrown when arguments are passed into 
   * the Command Class during initialisation when 
   * supportsArg is left as false
   */
  readonly isOperational = true;
}

export class NoArgumentProvidedUserInputError extends UserInputError {
  /**
   * class UnexpectedArgumentsUserInputError
   * This error is thrown when arguments are passed into 
   * the Command Class during initialisation when 
   * supportsArg is left as false
   */
}

export class NoCommandUserInputError extends UserInputError {}

export class InvalidArgumentSyntaxUserInputError extends UserInputError {}

export class InvalidPositionUserInputError extends UserInputError {}

export class InvalidDirectionUserInputError extends UserInputError {}

// Game play error
abstract class GamePlayError extends AppError {
  readonly isOperational = true;
  readonly killApplication = false;
}

export class UnPlacedRobotError extends GamePlayError {}

export class UnKnownDirectionError extends GamePlayError {}