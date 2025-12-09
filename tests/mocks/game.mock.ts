import { Robot } from "../../src/core/entities/robot/robot.js";
import { Table } from "../../src/core/entities/table/table.js";
import { Game } from "../../src/core/game/game.js";


export function createMockGame(): jest.Mocked <Game> {
  const mockGame: jest.Mocked <Game> = {
    setRobotPosition: jest.fn(),
    getRobotPosition: jest.fn(),
    moveRobot: jest.fn(),
    isActive: false,
    rotateRobotLeft: jest.fn(),
    table: new Table(),
    robot: new Robot(),
    //robot: {} as any,
    //table: {} as any,
    isValidPosition: jest.fn(),
    updateIfValidPosition: jest.fn(),
    rotateRobotRight: jest.fn(),
  } as unknown as jest.Mocked <Game>;
  return mockGame
}