import { SimpleRenderer } from "../../infrastructure/renderers/simple_renderer.js";
import { DemoReceiver } from './receivers/demo_receiver.js';
import { BaseCLIApplication } from "./abstract/base_cli_application.js";
import { GraphicRenderer } from "../../infrastructure/renderers/graphic_renderer.js";


export class DemoCLIApplication extends BaseCLIApplication {

  constructor(
    public receiver = new DemoReceiver()
  ) {
    super();
    this.renderer = new SimpleRenderer(this.game, this.receiver);
    this.setupReceiver();
  }
}


export class DemoCLIApplicationWithGraphics extends BaseCLIApplication {

  constructor(
    public receiver = new DemoReceiver()
  ) {
    super();
    this.renderer = new GraphicRenderer(this.game, this.receiver);
    this.setupReceiver();
  }
}