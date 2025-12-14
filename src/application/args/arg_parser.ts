import { parseArgs, ParseArgsOptionsConfig } from 'node:util';


export interface CLIArgs {
  demo: boolean;
  graphics: boolean;
}

export function argParser(argv: string[]): CLIArgs {
  const ret: CLIArgs = {
    demo: false,
    graphics: false,
  }
  const options: ParseArgsOptionsConfig = {
    demo: {
      type: 'boolean',
      short: 'd',
      default: false
    },
    graphics: {
      type: 'boolean',
      short: 'g',
      default: false
    },
  };
  
  try {
    const { values } = parseArgs({argv, options});
    ret.demo = values.demo as boolean;
    ret.graphics = values.graphics as boolean;
  }
  catch (error) {
    console.error('An error occurred when parsing startup args', error);    
  }
  return ret
}
