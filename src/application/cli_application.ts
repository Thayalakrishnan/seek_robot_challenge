import { exit } from 'node:process';
import { Game } from "../core/game/game.js";
import { ErrorHandler } from "../errors/error_handler.js";

import { Application } from "./application.js";
import { CLIReceiver } from "../infrastructure/receivers/cli_receiver.js";
import { CLIReader } from "../infrastructure/readers/cli_reader.js";
import { CLIEvaluator } from "../infrastructure/evaluators/cli_evaluator.js";
import { CLIRenderer } from "../infrastructure/renderers/cli_renderer.js";

export class CLIApplication extends Application{
  game = new Game();
  
  protected override reader = new CLIReader(this.game);
  protected override evaluator = new CLIEvaluator(this.game);
  protected receiver  = new CLIReceiver();
  protected override renderer = new CLIRenderer(this.game, this.receiver);
  
  constructor() {
    super();
    this.setupReceiver(); 
  }
  
  public run(): void {
    this.receiver.open()
  }
  
  public close(): void {
    this.receiver.close();
  };
  
  protected setupReceiver(): void {
    this.receiver.on('line', (rawInput) => {
      try {
        const command = this.reader.read(rawInput);
        const out = this.evaluator.evaluate(command);
        this.renderer.render(out);
        this.receiver.open();
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