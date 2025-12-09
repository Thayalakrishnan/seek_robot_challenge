import { Position } from '../entities/position/position.js';
import { Robot } from '../entities/robot/robot.js';
import { Table } from '../entities/table/table.js';
import { Game } from './game.js';
import { Movement } from '../movement/movement.js';


describe('Game', () => {
  let game: Game;
  let table: Table;
  let movement: Movement;
  let robot: Robot;

  beforeEach(() => {
    jest.clearAllMocks();
    table = new Table();
    movement = new Movement();
    robot = new Robot();
    //game = new Game(false, table, robot, movement);
    game = new Game(false, table, robot, movement);
  });


  it('should initialise with isActive=false', () => {
    const newGame = new Game();
    expect(newGame.isActive).toBe(false);
  });

  describe('setRobotPosition', () => {

    it('should update position, set isActive=true, and update Robot if position is valid', () => {
      const validPosition = new Position(0, 0, "NORTH");
      game.setRobotPosition(validPosition);

      expect(game.isActive).toBe(true);

      expect(robot.position.x).toBe(validPosition.x);
      expect(robot.position.y).toBe(validPosition.y);
      expect(robot.position.direction).toBe(validPosition.direction);
      
    });

    it('should NOT update position, keep isActive=false, and ignore Robot update if position is invalid', () => {
      const inValidPosition = new Position(5, 5, "NORTH");
      game.setRobotPosition(inValidPosition);

      expect(game.isActive).toBe(false);

      expect(robot.position.x).not.toBe(inValidPosition.x);
      expect(robot.position.y).not.toBe(inValidPosition.y);
      expect(robot.position.direction).not.toBe(inValidPosition.direction);
    });
  });
  
  describe('getRobotPosition', () => {

    it('should return the current position of the robot', () => {
      const position = new Position(1, 1, "NORTH");
      game.setRobotPosition(position);
      
      const currentPosition = game.getRobotPosition();
      expect(currentPosition.x).toBe(position.x);
      expect(currentPosition.y).toBe(position.y);
      expect(currentPosition.direction).toBe(position.direction);
    });
  });

  describe('moveRobot', () => {

    it('should move the robots position and then update only if the new position is valid', () => {
      const position = new Position(0, 0, "NORTH");
      
      game.setRobotPosition(position);
      game.moveRobot();
      const robotPosition = robot.position;
      
      const movement = new Movement();
      const expectedPosition = movement.translate(position);

      expect(robotPosition.x).toBe(expectedPosition.x);
      expect(robotPosition.y).toBe(expectedPosition.y);
      expect(robotPosition.direction).toBe(expectedPosition.direction);
    });

    it('should call movement but NOT update the robot position if the new position is invalid', () => {
      const position = new Position(0, 0, "SOUTH");
      game.setRobotPosition(position);
      game.moveRobot();
      
      const movement = new Movement();
      const expectedPosition = movement.translate(position);
      
      expect(position.x).toBe(robot.position.x);
      expect(position.y).toBe(robot.position.y);
      expect(position.direction).toBe(robot.position.direction);
      
      expect(position.x).toBe(expectedPosition.x);
      expect(position.y).not.toBe(expectedPosition.y);
      expect(position.direction).toBe(expectedPosition.direction);
    });
  });

  describe('rotateRobotLeft', () => {

    it('should rotate the robot left', () => {
      const position = new Position(0, 0, "NORTH");
      
      game.setRobotPosition(position);
      game.rotateRobotLeft();
      const robotPosition = robot.position;;
      
      const movement = new Movement();
      const expectedPosition = movement.rotateLeft(position);

      expect(robotPosition.x).toBe(expectedPosition.x);
      expect(robotPosition.y).toBe(expectedPosition.y);
      expect(robotPosition.direction).toBe(expectedPosition.direction);
    });
  });
  
  describe('rotateRobotRight', () => {

    it('should rotate the robot right', () => {
      const position = new Position(0, 0, "NORTH");
      
      game.setRobotPosition(position);
      game.rotateRobotRight();
      const robotPosition = robot.position;;
      
      const movement = new Movement();
      const expectedPosition = movement.rotateRight(position);

      expect(robotPosition.x).toBe(expectedPosition.x);
      expect(robotPosition.y).toBe(expectedPosition.y);
      expect(robotPosition.direction).toBe(expectedPosition.direction);
    });
  });
  
});