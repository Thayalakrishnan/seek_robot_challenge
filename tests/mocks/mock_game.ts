import { Position } from "../../src/core/entities/position/position.js";
import { Game } from "../../src/core/game/game.js";


// Define the full structure of the mocked Game
// We will use a factory function to ensure each test gets a fresh, isolated mock instance.

export function createMockGame(): jest.Mocked <Game> {
  const mockGame: jest.Mocked <Game> = {
    setRobotPosition: jest.fn(),
    getRobotPosition: jest.fn(),
    moveRobot: jest.fn(),
    isActive: false,
    table: {} as any,
    rotateRobotLeft: jest.fn(),
    robot: {} as any,
    validPosition: jest.fn(),
    updateIfValidPosition: jest.fn(),
    rotateRobotRight: jest.fn(),
  } as unknown as jest.Mocked <Game>;
  return mockGame
}

// Optional: Define a common mock position to reuse across tests
export const mockPlacedPosition = new Position(1, 2, "NORTH");

// Optional: Define a common unplaced position
export const mockUnplacedPosition = new Position(-1, -1, "");