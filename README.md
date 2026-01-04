# Seek Robot Challenge

The robot challenge for an interview at seek.

## Requirements

Application was built and tested with:
- Node 24
- npm 11.6.2

## Installing, Building and Running

From within the root directory, install the packages using: `npm install`

Then run the build command: `npm run build`

The built project will be output to a directory called: `dist/`

We can then run the built application using node: `node ./dist/index.js`


### Development

run the application in development mode:
```npm run dev```

### Running the Examples

Example test data can be found in the `test_data` directory. 
 
#### Built Application

Pipe the example data here using:
```
node .\dist\index.js < ".\test_data\example1.txt"
```
or on windows:
```
Get-Content -Raw ".\test_data\example1.txt" | node .\dist\index.js
```

#### In Development

pipe in the example data here as well:
```
npm run dev < ".\test_data\example1.txt"
```
or on windows:
```
Get-Content -Raw ".\test_data\example1.txt" | npm run dev
```

### Testing

run the entire test suite: `npm run test`

run just the unit tests: `npm run test:unit`

run just the ingegration tests:`npm run test:integration`

run unit tests with coverage report: `npm run test:unit -- --coverage`

## Game Commands

| Command | Action |
| :--- | :--- |
| `PLACE X,Y,DIRECTION` | places the robot on the table at position X,Y and facing DIRECTION |
| `MOVE` | moves robot 1 space in facing direction |
| `LEFT` | rotates robot in place, counter clockwise 90 degrees |
| `RIGHT` | rotates robot in place, clockwise 90 degrees |
| `REPORT` | outputs the robots current position as: `Output: X,Y,DIRECTION` |
| `EXIT` | exits the application. note you can only `EXIT` once the robot has been placed |
| `NULL` | blank command used to catch errors |


## Design considerations and application structure

- the application has a central architecture similar to that of a REPL (Read Evaluate and Print Loop)
- its broken down into these processes/responsibilities: 
  - **receiving**: how input is received into the application. For this implementation, we are reading from standard input `stdin`, the command line. 
  - **reading**: handles taking the data from the receiver and then mapping it to one of the games commands. Is broken up further into the submodules:
    - **lexing**: the raw input is cleaned and broken down into useful bits, or tokens. A lexer is also known as a tokenizer. 
    - **parsing**: this consumes the output of the lexer and maps it to one of our defined commands. 
  - **evaluating**: the evaluator receives the command and provides a space for it to execute.
  - **rendering**: the evaluator returns a value that can be rendered if required.
- these main modules/sub-modules come together to create the infrastructure for our application


- `Game` is the game engine, and is kept separate from our infrastructure. 
- the game enginer manages the games assets and entities such as
  - `Robot`: the main entity being driven by the commands. only holds state pertaining to its position and whether its active or not. 
  - `Table`: the playing surface or map. holds state regarding its dimensions. 
  - `Movement`: this module implements the movement functionality entirely. 

- Commands are implemented using the Command Design pattern. 
- Commands all inherit from the same abstract class which allows us to use a Factory Pattern to retrieve the correct command on demand
- this allows for new commands to be easily added to extend the application. 


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

## Possible Extensions

- extend the way the application is launched with more flags
  - choose the render for example
- try switching to keystrokes for input
- implement a proper state management system