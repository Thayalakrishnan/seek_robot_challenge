import { createMockGame } from "../../../tests/mocks/mock_game.js";
import { Position } from "../../core/entities/position/position.js";
import { Game } from "../../core/game/game.js";
import { PlaceCommand } from "./place_command.js";
import { InvalidDirectionError, UnknownCommandError, UnexpectedArgumentsError, InvalidArgumetnSyntaxError } from "../../errors/core_errors.js";


describe('PlaceCommand Unit Tests', () => {
  let game: Game;
  let placePosition: Position;

  beforeEach(() => {
    game = new Game();
    placePosition = new Position(1, 2, "NORTH");
    jest.clearAllMocks();
  });

  describe('Argument Parsing Tests', () => {
    let command: PlaceCommand;

    beforeEach(() => {
      command = new PlaceCommand("0,0,EAST");
    });

    it('should correctly parse valid coordinates and direction', () => {
      command.args = "1,2,NORTH";
      const position = command.parseArgs("1,2,NORTH");

      expect(position).toBeInstanceOf(Position);
      expect(position.x).toBe(1);
      expect(position.y).toBe(2);
      expect(position.direction).toBe("NORTH");
    });

    it('should correctly parse zero coordinates', () => {
      command.args = "0,4,EAST";
      const position = command.parseArgs("0,4,EAST");

      expect(position.x).toBe(0);
      expect(position.y).toBe(4);
      expect(position.direction).toBe("EAST");
    });

    it('should throw an InvalidDirectionError error', () => {
      expect(() => {
        const position = command.parseArgs("3,3,NORTHWEST");
      }).toThrow(InvalidDirectionError);
    });

    it('should throw an error for input missing a direction', () => {
      const invalidArgs = "1,2";
      expect(() => {
        command.parseArgs(invalidArgs);
      }).toThrow(InvalidArgumetnSyntaxError);
    });

    it('should throw an error for non-numeric coordinates', () => {
      const invalidArgs = "1,A,NORTH";
      expect(() => {
        command.parseArgs(invalidArgs);
      }).toThrow(InvalidArgumetnSyntaxError);
    });

    it('should throw an error for too many arguments', () => {
      const invalidArgs = "1,2,NORTH,EXTRA";
      expect(() => {
        command.parseArgs(invalidArgs);
      }).toThrow(InvalidArgumetnSyntaxError);
    });
  });

  describe('Place Command Execution and Robot Positioning', () => {
    beforeEach(() => {});
    it('should parse arguments and call game.setRobotPosition() with the resulting Position', () => {
      const testArgs = "2,3,WEST";
      const game = new Game();
      const command = new PlaceCommand(testArgs);

      const parseArgsSpy = jest.spyOn(command, 'parseArgs');
      const robotPositionSpy = jest.spyOn(game, 'setRobotPosition');

      command.execute(game);
      const expectedPosition = new Position(2, 3, "WEST");

      expect(parseArgsSpy).toHaveBeenCalledWith(testArgs);
      expect(robotPositionSpy).toHaveBeenCalledTimes(1);
      expect(robotPositionSpy).toHaveBeenCalledWith(expectedPosition);
    });

    it('should allow the parsing error to bubble up when executed', () => {
      const command = new PlaceCommand("0,0,EAST");
      const mockGame = createMockGame();
      command.args = "BAD_ARGS";
      expect(() => {
        command.execute(mockGame);
      }).toThrow(`Cant parse arguments: "BAD_ARGS".`);

      expect(mockGame.setRobotPosition).not.toHaveBeenCalled();
    });
  });



});