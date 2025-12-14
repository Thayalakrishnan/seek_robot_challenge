import { Position } from "../position/position.js";
import { Table } from "./table.js";


describe('Table', () => {
  
  const table = new Table(5, 5);

  it('should initialise with default dimensions', () => {
    expect(table.width).toBe(5);
    expect(table.height).toBe(5);
  });

  it('should return true for the min x and y', () => {
    const position = new Position(0, 0, "NORTH");
    expect(table.isWithinTable(position)).toBe(true);
  });

  it('should return true for the max x and y position', () => {
    const position = new Position(4, 4, "NORTH");
    expect(table.isWithinTable(position)).toBe(true);
  });

  it('should return true for an internal position (2, 3)', () => {
    const position = new Position(2, 3, "EAST");
    expect(table.isWithinTable(position)).toBe(true);
  });

  it('should return false for negative x', () => {
    const position = new Position(-1, 0, "WEST");
    expect(table.isWithinTable(position)).toBe(false);
  });

  it('should return false for negative y', () => {
    const position = new Position(0, -1, "SOUTH");
    expect(table.isWithinTable(position)).toBe(false);
  });

  it('should return false for X=width, 0 indexing quirk', () => {
    const position = new Position(5, 0, "EAST");
    expect(table.isWithinTable(position)).toBe(false);
  });

  it('should return false for Y=length', () => {
    const position = new Position(0, 5, "NORTH");
    expect(table.isWithinTable(position)).toBe(false);
  });

  it('should correctly check boundaries for a 8x3 table', () => {
    const customTable = new Table(8, 3); 
    expect(customTable.isWithinTable(new Position(7, 2, "N"))).toBe(true);
    expect(customTable.isWithinTable(new Position(8, 2, "N"))).toBe(false);
    expect(customTable.isWithinTable(new Position(7, 3, "N"))).toBe(false);
  });
});