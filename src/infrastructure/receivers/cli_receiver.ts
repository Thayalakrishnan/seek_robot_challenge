import * as readline from 'node:readline';
import { stdin as input, stdout as output, exit } from 'node:process';


export class CLIReceiver extends readline.Interface {
  /**
   * CLIReceiver
   * 
   * We are extending/wrapping the readline.Interface
   * so that we can standardise the methods being used
   */
  
  constructor() {
    super({input, output, prompt: ""});
    
    this.on('close', () => {
      this.close();
      exit(0);
    });
    
    this.on('SIGINT', () => {
      this.close();
      process.stdout.write(`Exiting Application.\n`);
    });
  }
  
  public open(): void {
    //
  };
}