import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';


export class SimpleReceiver extends readline.Interface {
  constructor() {
    super(input, output);
  }
}