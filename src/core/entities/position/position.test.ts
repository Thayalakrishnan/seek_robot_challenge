import { InvalidDirectionError } from "../../../errors/core_errors.js";
import { Position } from "./position.js";


describe('Position', () => {
  
  it('should initialise with default values (0, 0, "")', () => {
    const position = new Position();
    expect(position.x).toBe(0);
    expect(position.y).toBe(0);
    expect(position.direction).toBe("");
  });

  it('should initialise with specified coordinates and direction', () => {
    const position = new Position(3, 4, "NORTH");
    expect(position.x).toBe(3);
    expect(position.y).toBe(4);
    expect(position.direction).toBe("NORTH");
  });
  
  it('should throw InvalidDirectionError on rogue directions', () => {
    expect(() => {
      const position = new Position(0, 0, "SOUTHWEST");
      expect(position.x).toBe(0);
      expect(position.y).toBe(-1);
    }).toThrow(InvalidDirectionError);
  });
});