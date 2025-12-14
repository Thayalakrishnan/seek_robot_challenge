import * as readline from 'node:readline/promises';
import { Game } from "../../../core/game/game.js";
import { CLIReader } from "../../../infrastructure/readers/cli/cli_reader.js";
import { SimpleEvaluator } from "../../../infrastructure/evaluators/simple_evaluator.js";
import { Application } from "../../abstract/application.js";
import { ErrorHandler } from '../../../errors/error_handler.js';


export abstract class BaseCLIApplication extends Application {
  protected game = new Game();
  protected reader = new CLIReader(this.game);
  protected evaluator = new SimpleEvaluator(this.game);

  protected isRunning: boolean = false;
  public receiver!: readline.Interface;
  
  constructor() { super(); }
  
  private async startLoop(): Promise<void> {
    while(this.isRunning) {
      try {
        const rawInput = await this.receiver.question("");
        const command = this.reader.read(rawInput);
        const out = this.evaluator.evaluate(command);
        this.renderer.render(out);
      }
      catch (error) {
        const exit = ErrorHandler(error);
        if (exit) {
          this.close();
        }
      }
    }
  };
  
  public async run(): Promise<void> {
    this.isRunning = true;
    await this.startLoop();
  }
  
  public close(): void {
    this.isRunning = false;
    this.receiver.close();
  };
  
  protected setupReceiver(): void {
    this.receiver.on('SIGINT', () => {
      this.receiver.close();
      console.log(`Exiting Application.`);
      this.isRunning = false;
    });
    this.receiver.on('close', () => {
      this.receiver.close();
      console.log(`Closing Application.`);
      this.isRunning = false;
    });
  };
}