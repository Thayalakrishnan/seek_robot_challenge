import { ExitCommand } from "../../commands/exit_command/exit_command.js";
import { LeftCommand } from "../../commands/left_command/left_command.js";
import { MoveCommand } from "../../commands/move_command/move_command.js";
import { NullCommand } from "../../commands/null_command/null_command.js";
import { PlaceCommand } from "../../commands/place_command/place_command.js";
import { ReportCommand } from "../../commands/report_command/report_command.js";
import { RightCommand } from "../../commands/right_command/right_command.js";
import { CommandFactory } from "./abstracts/command_factory.js";


export const CommandFactoryActiveState = new CommandFactory();
CommandFactoryActiveState.register("PLACE", PlaceCommand);
CommandFactoryActiveState.register("MOVE", MoveCommand);
CommandFactoryActiveState.register("LEFT", LeftCommand);
CommandFactoryActiveState.register("RIGHT", RightCommand);
CommandFactoryActiveState.register("REPORT", ReportCommand);
CommandFactoryActiveState.register("EXIT", ExitCommand);
CommandFactoryActiveState.register("NULL", NullCommand, true);
