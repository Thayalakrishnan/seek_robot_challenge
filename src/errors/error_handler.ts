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



export function ErrorHandler(err: unknown): boolean {
  switch (true) {
    case err instanceof UnknownCommandError:
      process.stderr.write(`${err.message}\n`);
      break;
    case err instanceof UnexpectedArgumentsError:
      process.stderr.write(`${err.message}\n`);
      break;
    case err instanceof NoCommandError:
      process.stderr.write(`${err.message}\n`);
      break;
    case err instanceof CommandUnkownOrNotActiveError:
      process.stderr.write(`${err.message}\n`);
      break;
    case err instanceof InvalidArgumetnSyntaxError:
      process.stderr.write(`${err.message}\n`);
      break;
    case err instanceof InvalidDirectionError:
      process.stderr.write(`${err.message}\n`);
      break;
    case err instanceof InvalidStateError:
      process.stderr.write(`${err.message}\n`);
      break;
    case err instanceof InvariantViolationError:
      process.stderr.write(`${err.message}\n`);
      break;
    case err instanceof EndOfDemoError:
      process.stderr.write(`${err.message}\n`);
      break;
    case err instanceof UnPlacedRobotError:
      process.stderr.write(`${err.message}\n`);
      break;
    case err instanceof ExitApplicationError:
      process.stderr.write(`${err.message}\n`);
      return true
    default:
      process.stderr.write("Unexpected error\n");
      process.stderr.write(String(err));
  }
  return false
}
