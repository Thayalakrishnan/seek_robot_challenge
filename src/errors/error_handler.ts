import { 
  AppError,
  UnknownCommandUserInputError,
  UnexpectedArgumentsUserInputError,
  NoCommandUserInputError,
  InvalidArgumentSyntaxUserInputError,
  InvalidDirectionUserInputError,
  ExitApplicationError,
  UnPlacedRobotError,
  NoArgumentProvidedUserInputError,
} from "./core_errors.js"



export function ErrorHandler(err: AppError | unknown): boolean {
  if (err instanceof AppError) {
    switch (err instanceof AppError) {
      case err instanceof UnknownCommandUserInputError:
        process.stderr.write(`Unknown Command: "${err.message}"\n`);
        return err.killApplication
      case err instanceof UnexpectedArgumentsUserInputError:
        process.stderr.write(`Unexpected Arguments: "${err.message}"\n`);
        break;
      case err instanceof NoArgumentProvidedUserInputError:
        process.stderr.write(`Command requires arguments\n`);
        break;
      case err instanceof NoCommandUserInputError:
        process.stderr.write(`No command to parse\n`);
        break;
      case err instanceof InvalidArgumentSyntaxUserInputError:
        process.stderr.write(`Can't parse arguments: "${err.message}"\n`);
        break;
      case err instanceof InvalidDirectionUserInputError:
        process.stderr.write(`Not a valid direction: "${err.message}"\n`);
        break;
      case err instanceof UnPlacedRobotError:
        process.stderr.write(`Robot needs to be placed\n`);
        break;
      case err instanceof ExitApplicationError:
        process.stderr.write(`Exiting Application\n`);
        break;
    }
    return err.killApplication
  }
  process.stderr.write("Unexpected error\n");
  process.stderr.write(String(err));
  return false
}
