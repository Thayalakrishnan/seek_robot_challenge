# seek_robot_challenge

robot challenge for seek interview

## building and running the application

- from within the root directory, install the packages using: 
  - `npm install`

- then run the build command: 
  - `npm run build`

- built project will be output to a directory called: `dist/`

- we can then run the application using node like: 
  - `node .\dist\index.js`

- we can also run the demo of the application using the demo flag `--demo`: 
  - `node .\dist\index.js --demo`

- we can also run the demo with some rendered graphics using the demo flag with the graphics `--demo --graphics`: 
  - `node .\dist\index.js --demo --graphics`

- run the application in development:
  - `npm run dev`
  - not that you wont be able to pass in arguments here

- run the entire test suite:
  - `npm run test`

- run just the unit tests:
  - `npm run test:unit`

- run just the ingegration tests:
  - `npm run test:integration`


## Game Commands

- `PLACE X,Y,DIRECTION`: places the robot on the table at position X,Y and facing DIRECTION
- `MOVE`: moves robot 1 space in facing direction
- `LEFT`: rotates robot in place, counter clockwise 90 degrees
- `RIGHT`: rotates robot in place, clockwise 90 degrees
- `REPORT`: outputs the robots current position as: `Output: X,Y,DIRECTION`
- `EXIT`: exits the application. note you can only `EXIT` once the robot has been placed 
- `NULL`: blank command used to catch errors

## Application Structure

- the application takes the form of a REPL
- its broken down into these main features, which follow the execution loop of the program 
  - a receiver: determines how the application will recieve
  - a reader module: handles taking the data from the receiver and mapping it to one of the games commands
    - a lexer: this breaks down the raw input source into bits. also known as a tokenizer. 
    - a parser: this consumes the output of the lexer and can the lexers output with a commnd
  - an evaluator module: the evaluator receives the command and provides a space to exeute it. the state of the game is checked here before executing the command
  - a render module: the evaluator returns either a void value or string. depending on the renderer used, the render can render this string or render its own output based off the state of the game
- finally the application module, governs the above functionality. it implements the receivers, readers, evaluators and renders. 

## Directories

Code is separated into 

- `application/`: top level concerns and implementations: arg parsing, input receivers, app implementations 
- `commands/`: implemented commands
- `core/`: core logic and classes that drive the game
  - `entities/`: the elements that make up the game: position, robot, table
  - `game/`: the game engine itself
  - `movement/`: module to handle all translations and rotational movements
- `errors/`: error handlers and error definitions
- `infrastructure/`: the main building blocks for the applications functionality
  - `readers/`: classes for converting input to commands  
  - `evaluators/`: class for exectuing command and managing some execution flow
  - `factories/`: factory functions for the commands. each concrete factory represents a different state
  - `renderers/`: rendering the result of command execution 

## Error Handling
- Errors are thrown through out the application and are handled at in the top level CLI Applications run command
- Errors are handled gracefully 

## Testing
- unit tests cover the core modules and the commands
- larger implementations in the infrastructure and the application folder are covered in the integration tests

## Extending this application

- this application should be pretty straight forward to extend

### Adding a new Command
- subclass `Command`
- if the command takes arguments implement a `parseArgs` method already on the class and have it parse the arguments at the start of the commands execution
  - raw arguments will be asigned to the classes `args` field 
- to make the command available to the application, add the command to the relevant command factory
  - the idle factory or the active factory
- and now the command should be available

### Adding a Demo mode

- to add a demo mode that would take over the inputting, we just needed to extend the `BaseCLIApplication` and initialise a different receiver. 

## Possible Extensions

- extend the way the application is launched with more flags
  - choose the render for example
- try switching to keystrokes for input
- implement a proper state management system