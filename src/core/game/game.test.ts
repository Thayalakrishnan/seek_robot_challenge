import { Position } from '../entities/position/position.js';
import { Robot } from '../entities/robot/robot.js';
import { Table } from '../entities/table/table.js';
import { Game } from './game.js';
import { Movement } from '../movement/movement.js';


jest.mock('../entities/table/table');
jest.mock('../movement/movement');
jest.mock('../entities/robot/robot', () => {
  const actualRobot = jest.requireActual('../entities/robot/robot');
  return {
    Robot: jest.fn().mockImplementation(() => ({
      ...new actualRobot.Robot(),
      updatePosition: jest.fn(),
      isPlaced: false,
      position: new Position(-1, -1, ""),
    }))
  };
});


describe('Game', () => {
  let game: Game;
  let mockTable: jest.Mocked <Table>;
  let mockMovement: jest.Mocked <Movement>;
  let mockRobot: jest.Mocked <Robot>;

  beforeEach(() => {
    jest.clearAllMocks();
    game = new Game();
    // Grab the mock instances created by the Game constructor
    // @ts-ignore: Accessing internal mocked properties for spying
    mockTable = game.table as unknown as jest.Mocked < Table > ;
    // @ts-ignore
    mockMovement = (game as any).movement as unknown as jest.Mocked < Movement > ;
    // @ts-ignore
    mockRobot = game.robot as unknown as jest.Mocked < Robot > ;
    mockTable.isWithinTable = jest.fn();
    mockRobot.isPlaced = false;
  });


  it('should initialise with isActive=false and use mocked dependencies', () => {
    expect(game.isActive).toBe(false);
    expect(Table).toHaveBeenCalledTimes(1);
    expect(Movement).toHaveBeenCalledTimes(1);
    expect(Robot).toHaveBeenCalledTimes(1);
  });

  describe('updateIfValidPosition / setRobotPosition', () => {
    const validPos = new Position(1, 1, "NORTH");
    const invalidPos = new Position(5, 5, "NORTH");

    it('should update position, set isActive=true, and update Robot if position is valid', () => {
      mockTable.isWithinTable.mockReturnValue(true);

      game.setRobotPosition(validPos);

      expect(mockTable.isWithinTable).toHaveBeenCalledWith(validPos);
      expect(mockRobot.updatePosition).toHaveBeenCalledWith(validPos);
      expect(game.isActive).toBe(true);
    });

    it('should NOT update position, keep isActive=false, and ignore Robot update if position is invalid', () => {
      mockTable.isWithinTable.mockReturnValue(false);

      game.setRobotPosition(invalidPos);

      expect(mockTable.isWithinTable).toHaveBeenCalledWith(invalidPos);
      expect(mockRobot.updatePosition).not.toHaveBeenCalled();
      expect(game.isActive).toBe(false);
    });
  });

  describe('moveRobot', () => {
    const currentPos = new Position(1, 1, "NORTH");
    const nextValidPos = new Position(1, 2, "NORTH");
    const nextInvalidPos = new Position(1, 5, "NORTH");

    beforeEach(() => {
      mockRobot.position = currentPos;
      mockRobot.isPlaced = true;
    });

    it('should move the robot and update state if the new position is valid', () => {
      mockMovement.translate.mockReturnValue(nextValidPos);
      mockTable.isWithinTable.mockReturnValue(true);

      game.moveRobot();

      expect(mockMovement.translate).toHaveBeenCalledWith(currentPos);
      expect(mockTable.isWithinTable).toHaveBeenCalledWith(nextValidPos);
      expect(mockRobot.updatePosition).toHaveBeenCalledWith(nextValidPos);
      expect(game.isActive).toBe(true);
    });

    it('should call movement but NOT update the robot position if the new position is invalid (boundary skip)', () => {
      mockMovement.translate.mockReturnValue(nextInvalidPos);
      mockTable.isWithinTable.mockReturnValue(false);

      game.moveRobot();

      expect(mockMovement.translate).toHaveBeenCalledWith(currentPos);
      expect(mockTable.isWithinTable).toHaveBeenCalledWith(nextInvalidPos);
      expect(mockRobot.updatePosition).not.toHaveBeenCalled();
    });
  });

  describe('rotation methods', () => {
    const currentPos = new Position(1, 1, "NORTH");
    const rotatedPos = new Position(1, 1, "WEST");

    beforeEach(() => {
      mockRobot.position = currentPos;
      mockRobot.isPlaced = true;
    });

    it('should delegate to movement.rotateLeft and update the robot position', () => {
      mockMovement.rotateLeft.mockReturnValue(rotatedPos);
      game.rotateRobotLeft();
      expect(mockMovement.rotateLeft).toHaveBeenCalledWith(currentPos);
      expect(mockTable.isWithinTable).not.toHaveBeenCalled();
      expect(mockRobot.updatePosition).toHaveBeenCalledWith(rotatedPos);
    });

    it('should delegate to movement.rotateRight and update the robot position', () => {
      mockMovement.rotateRight.mockReturnValue(rotatedPos);
      game.rotateRobotRight();
      expect(mockMovement.rotateRight).toHaveBeenCalledWith(currentPos);
      expect(mockTable.isWithinTable).not.toHaveBeenCalled();
      expect(mockRobot.updatePosition).toHaveBeenCalledWith(rotatedPos);
    });
  });

  it('should return the robot position via getRobotPosition', () => {
    const pos = new Position(3, 3, "SOUTH");
    mockRobot.position = pos;

    expect(game.getRobotPosition()).toBe(pos);
  });
});