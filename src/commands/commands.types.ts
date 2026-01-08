import { COMMANDS } from "./commands.constants.js";

export type CommandType = typeof COMMANDS[keyof typeof COMMANDS];