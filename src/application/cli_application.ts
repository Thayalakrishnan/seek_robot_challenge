import { exit } from 'node:process';
import { Game } from "../core/game/game.js";
import { ErrorHandler } from "../errors/error_handler.js";

import { Application } from "./abstracts/application.js";
import { CLIReceiver } from "../infrastructure/receivers/cli_receiver.js";
import { CLIReader } from "../infrastructure/readers/cli_reader.js";
import { CLIEvaluator } from "../infrastructure/evaluators/cli_evaluator.js";
import { CLIRenderer } from "../infrastructure/renderers/cli_renderer.js";

import { CommandManager } from '../command_manager/command_manager.js';


export class CLIApplication extends Application {
  public game = new Game();
  public commandManager = new CommandManager();
  
  protected override reader = new CLIReader(this.commandManager);
  protected override evaluator = new CLIEvaluator(this.game);
  protected receiver  = new CLIReceiver();
  protected override renderer = new CLIRenderer(this.game, this.receiver);
  
  constructor() {
    super();
  }
  
  public run(): void {
    this.setupReceiver(); 
  }
  
  public close(): void {
    this.receiver.close();
  };
  
  protected setupReceiver(): void {
    this.receiver.on('line', (rawInput) => {
      try {
        const command = this.reader.read(rawInput);
        const result = this.evaluator.evaluate(command);
        this.renderer.render(result);
      }
      catch (error) {
        const isExit = ErrorHandler(error);
        if (isExit) {
          this.receiver.close();
          exit(0)
        }
      }
    })
  };
}