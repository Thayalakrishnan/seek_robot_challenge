import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { EndOfDemoError } from '../../../errors/core_errors.js';


export const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export class DemoReceiver extends readline.Interface {
  private commandIndex: number = 0;
  private commandMax: number;
  private commandList: string[] = [
    "PLACE 0,0,EAST",
    "REPORT",
    "LEFT",
    "REPORT",
    "RIGHT",
    "RIGHT",
    "RIGHT",
    "REPORT",
    "LEFT",
    "MOVE",
    "REPORT",
    "PLACE 0,0,EAST",
    "MOVE",
    "MOVE",
    "MOVE",
    "MOVE",
    "LEFT",
    "MOVE",
    "MOVE",
    "MOVE",
    "MOVE",
    "LEFT",
    "MOVE",
    "MOVE",
    "MOVE",
    "MOVE",
    "LEFT",
    "MOVE",
    "MOVE",
    "MOVE",
    "MOVE",
    "LEFT",
    "REPORT",
    "PLACE 1,1,EAST",
    "PLACE 2,2,EAST",
    "LEFT",
    "LEFT",
    "LEFT",
    "LEFT",
    "LEFT",
    "RIGHT",
    "RIGHT",
    "RIGHT",
    "RIGHT",
    "RIGHT",
    "REPORT",
  ]
  constructor() {
    super(input, output);
    this.commandMax = this.commandList.length - 1;
  }
  
  async question(query: string): Promise<string> {
    await sleep(1000);
    if (this.commandIndex < this.commandMax) {
      const command = this.commandList[this.commandIndex];
      this.commandIndex++
      this.write(`${command}\n`);
      return command
    } 
    this.close();
    throw new EndOfDemoError("End of Demo")
  };
}