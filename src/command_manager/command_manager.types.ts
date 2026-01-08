import { Command } from "../commands/abstracts/command.js";

export type CommandConstructor = new (args: string) => Command;
export type CommandRegistry = Map<string, CommandConstructor>;
