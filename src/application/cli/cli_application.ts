import { SimpleRenderer } from "../../infrastructure/renderers/simple_renderer.js";
import { GraphicRenderer } from "../../infrastructure/renderers/graphic_renderer.js";
import { SimpleReceiver } from './receivers/simple_receiver.js';
import { BaseCLIApplication } from './abstract/base_cli_application.js';


export class CLIApplication extends BaseCLIApplication {
  /**
   * class CLIApplication
   * this is our main implementation of our application
   *  
   * @returns none
   */
  
  constructor(
    public receiver = new SimpleReceiver()
  ) {
    super();
    this.renderer = new SimpleRenderer(this.game, this.receiver);
    this.setupReceiver();
  }
}