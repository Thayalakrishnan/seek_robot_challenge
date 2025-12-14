#!/usr/bin/env node
import { argParser } from "./application/args/arg_parser.js";
import { CLIApplication } from "./application/cli/cli_application.js";
import { DemoCLIApplication, DemoCLIApplicationWithGraphics } from "./application/cli/demo_cli_application.js";


function WhichApplication(demo: boolean = false, graphics: boolean = false) {
  if (demo) {
    console.log("Load demo");
    if (graphics) {
      console.log("with graphics");
      return new DemoCLIApplicationWithGraphics();
    }
    return new DemoCLIApplication();
  }
  return new CLIApplication();
}


async function main() {
  const args = argParser(process.argv);
  const app = WhichApplication(args.demo, args.graphics);
  await app.run();
}

main();
