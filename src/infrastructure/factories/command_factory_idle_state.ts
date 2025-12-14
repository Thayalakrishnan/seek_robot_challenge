import { CommandFactory } from "./abstracts/command_factory.js";
import { PlaceCommand } from "../../commands/place_command/place_command.js";
import { UnplacedCommand } from "../../commands/unplaced_command/unplaced_command.js";


export const CommandFactoryIdleState = new CommandFactory();
CommandFactoryIdleState.register("PLACE", PlaceCommand);
CommandFactoryIdleState.register("UNPLACED", UnplacedCommand, true);