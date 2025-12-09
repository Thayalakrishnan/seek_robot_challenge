import { CLIApplication } from "./application/cli_application.js";


async function main() {
  const app = new CLIApplication();
  app.run();
}

main();