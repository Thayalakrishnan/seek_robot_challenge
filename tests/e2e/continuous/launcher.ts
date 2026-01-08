import { spawn, ChildProcessWithoutNullStreams  } from "child_process";
import path from "path";


export class ApplicationLauncher {
  /**
   * ApplicationLauncher
   * 
   * we are grabbing our built application and running that 
   * inside a node child process 
   * 
   * this enables us to process single commands.
   * creates an instance of the CLI application as a child process
   * commands can then be sent to the instance
   * waits for the applications response using setTimeouts
   * returns the response from the application in a promise
   * application is then safely closed
   */
  
  public flagOutputReceived = false;
  public buffer = "";
  public startLength = 0;
  public stdout = "";
  public stderr = "";
  public child_process: ChildProcessWithoutNullStreams;
  public controller: AbortController;
  
  
  constructor() {
    const cliPath = path.resolve(__dirname, "../../../dist/index.js");
    // create an abort signal so we can kill the instance
    this.controller = new AbortController();
    const { signal } = this.controller;
    
    // stdin, stdout, and stderr 
    this.child_process = spawn("node", [cliPath], {signal, stdio: "pipe"});

    // read the output of the child prcess into a buffer, set the flag
    this.child_process.stdout.on("data", (data) => {
      this.buffer += data.toString();
      this.flagOutputReceived = true;
    });
    
    // also read any errors
    this.child_process.stderr.on("data", (data) => {
      this.buffer += data.toString();
      this.flagOutputReceived = true;
    });
    
    // dramatic, but i just want to make sure we kill the instance
    this.child_process.on("close", () => {
      this.controller.abort();
    });
    
    this.child_process.on("exit", () => {
      this.controller.abort();
    });
    
    this.child_process.on("error", () => {
        this.controller.abort();
    });
    
  }
  
  public async runCommand(line: string) {
    this.buffer = "";
    this.flagOutputReceived = false;
    this.startLength = this.buffer.length;
    this.child_process.stdin.write(line + "\n");
    
    return new Promise((resolve) => {
      
      const check = () => {
        if (this.flagOutputReceived) {
          const output = this.buffer.slice(this.startLength);
          resolve(output);
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    });
  }
  
  public async closeApplication() {
    this.child_process.stdin.end();
    this.child_process.kill('SIGKILL');
    await new Promise((r) => this.child_process.on("close", r));
  }
}
