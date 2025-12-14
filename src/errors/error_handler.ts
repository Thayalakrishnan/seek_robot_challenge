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
      console.error(err.message);
      break;
    case err instanceof UnexpectedArgumentsError:
      console.error(err.message);
      break;
    case err instanceof NoCommandError:
      console.error(err.message);
      break;
    case err instanceof CommandUnkownOrNotActiveError:
      console.error(err.message);
      break;
    case err instanceof InvalidArgumetnSyntaxError:
      console.error(err.message);
      break;
    case err instanceof InvalidDirectionError:
      console.error(err.message);
      break;
    case err instanceof InvalidStateError:
      console.error(err.message);
      break;
    case err instanceof InvariantViolationError:
      console.error(err.message);
      break;
    case err instanceof EndOfDemoError:
      console.error(err.message);
      break;
    case err instanceof UnPlacedRobotError:
      console.error(err.message);
      break;
    case err instanceof ExitApplicationError:
      console.error(err.message);
      return true
    default:
      console.error("Unexpected error");
      console.error(err);
  }
  return false
}
