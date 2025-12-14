import { Position } from "../../src/core/entities/position/position.js";
// Define the full structure of the mocked Game
// We will use a factory function to ensure each test gets a fresh, isolated mock instance.
export function createMockGame() {
    const mockGame = {
        setRobotPosition: jest.fn(),
        getRobotPosition: jest.fn(),
        moveRobot: jest.fn(),
        isActive: false,
        table: {},
        rotateRobotLeft: jest.fn(),
        robot: {},
        validPosition: jest.fn(),
        updateIfValidPosition: jest.fn(),
        rotateRobotRight: jest.fn(),
    };
    return mockGame;
}
// Optional: Define a common mock position to reuse across tests
export const mockPlacedPosition = new Position(1, 2, "NORTH");
// Optional: Define a common unplaced position
export const mockUnplacedPosition = new Position(-1, -1, "");
//# sourceMappingURL=mock_game.js.map