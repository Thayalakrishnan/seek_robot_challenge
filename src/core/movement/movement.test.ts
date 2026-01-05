import { InvalidDirectionUserInputError, UnKnownDirectionError } from "../../errors/core_errors.js";
import { Position } from "../entities/position/position.js";
import { Movement } from "./movement.js";


describe('Movement', () => {
  let movement: Movement;

  beforeEach(() => {
    movement = new Movement();
  });

  describe('translate()', () => {
    const startX = 2;
    const startY = 2;

    it('should move 1 unit North when facing NORTH', () => {
      const currentPosition = new Position(startX, startY, "NORTH");
      const newPosition = movement.translate(currentPosition);

      expect(newPosition.x).toBe(startX);
      expect(newPosition.y).toBe(startY + 1);
      expect(newPosition.direction).toBe("NORTH");
    });

    it('should move 1 unit East when facing EAST', () => {
      const currentPosition = new Position(startX, startY, "EAST");
      const newPosition = movement.translate(currentPosition);

      expect(newPosition.x).toBe(startX + 1);
      expect(newPosition.y).toBe(startY);
      expect(newPosition.direction).toBe("EAST");
    });

    it('should move 1 unit South when facing SOUTH', () => {
      const currentPosition = new Position(startX, startY, "SOUTH");
      const newPosition = movement.translate(currentPosition);

      expect(newPosition.x).toBe(startX);
      expect(newPosition.y).toBe(startY - 1);
      expect(newPosition.direction).toBe("SOUTH");
    });

    it('should move 1 unit West when facing WEST', () => {
      const currentPosition = new Position(startX, startY, "WEST");
      const newPosition = movement.translate(currentPosition);

      expect(newPosition.x).toBe(startX - 1);
      expect(newPosition.y).toBe(startY);
      expect(newPosition.direction).toBe("WEST");
    });

    it('should throw an InvalidDirectionUserInputError', () => {
      expect(() => {
        new Position(startX, startY, "INVALID_DIRECTION");
      }).toThrow(InvalidDirectionUserInputError);
    });
    
    
    it('should throw an UnKnownDirectionError', () => {
      const invalidPosition = {x: 1, y: 1, direction: 'UP' } as Position;
      expect(() => {
        movement.translate(invalidPosition);
      }).toThrow(UnKnownDirectionError);
    });
    
  });

  describe('rotateLeft()', () => {

    it('should rotate from NORTH --> WEST', () => {
      const position = new Position(1, 1, "NORTH");
      const newPosition = movement.rotateLeft(position);
      expect(newPosition.direction).toBe("WEST");
      expect(newPosition.x).toBe(position.x);
      expect(newPosition.y).toBe(position.y);
    });

    it('should rotate from WEST --> SOUTH', () => {
      const position = new Position(1, 1, "WEST");
      const newPosition = movement.rotateLeft(position);
      expect(newPosition.direction).toBe("SOUTH");
    });

    it('should rotate from SOUTH --> EAST', () => {
      const position = new Position(1, 1, "SOUTH");
      const newPosition = movement.rotateLeft(position);
      expect(newPosition.direction).toBe("EAST");
    });

    it('should rotate from EAST --> NORTH and wrap', () => {
      const position = new Position(1, 1, "EAST");
      const newPosition = movement.rotateLeft(position);
      expect(newPosition.direction).toBe("NORTH");
    });
  });

  describe('rotateRight()', () => {
    
    it('should rotate from NORTH --> EAST', () => {
      const position = new Position(1, 1, "NORTH");
      const newPosition = movement.rotateRight(position);
      expect(newPosition.direction).toBe("EAST");
    });

    it('should rotate from EAST --> SOUTH', () => {
      const position = new Position(1, 1, "EAST");
      const newPosition = movement.rotateRight(position);
      expect(newPosition.direction).toBe("SOUTH");
    });

    it('should rotate from SOUTH --> WEST', () => {
      const position = new Position(1, 1, "SOUTH");
      const newPosition = movement.rotateRight(position);
      expect(newPosition.direction).toBe("WEST");
    });

    it('should rotate from WEST --> NORTH and wrap', () => {
      const position = new Position(1, 1, "WEST");
      const newPosition = movement.rotateRight(position);
      expect(newPosition.direction).toBe("NORTH");
    });
  });
});