import { CLIApplication } from "./application/cli_application.js";


export async function main() {
  const app = new CLIApplication();
  app.run();
}

main();