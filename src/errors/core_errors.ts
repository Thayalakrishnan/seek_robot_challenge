abstract class AppError extends Error {
  abstract readonly isOperational: boolean;
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}

export class UnknownCommandError extends AppError {
  readonly isOperational = true;
}

export class UnexpectedArgumentsError extends AppError {
  readonly isOperational = true;
}

export class NoCommandError extends AppError {
  readonly isOperational = true;
}

export class CommandUnkownOrNotActiveError extends AppError {
  readonly isOperational = true;
}

export class InvalidArgumetnSyntaxError extends AppError {
  readonly isOperational = true;
}

export class InvalidDirectionError extends AppError {
  readonly isOperational = true;
}

export class InvalidStateError extends AppError {
  readonly isOperational = true;
}

export class EndOfDemoError extends AppError {
  readonly isOperational = true;
}

export class ExitApplicationError extends AppError {
  readonly isOperational = true;
}

export class InvariantViolationError extends AppError {
  readonly isOperational = false
}

abstract class GamePlayError extends AppError {}

export class UnPlacedRobotError extends GamePlayError {
  readonly isOperational = true;
}