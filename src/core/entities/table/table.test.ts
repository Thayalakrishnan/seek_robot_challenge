import { Position } from "../position/position.js";
import { Table } from "./table.js";


describe('Table', () => {
  
  it('should initialise with default dimensions', () => {
    const table = new Table();
    
    expect(table.width).toBe(5);
    expect(table.depth).toBe(5);
  });
  
  it('should return a boolean value', () => {
    const table = new Table();
    const ret = table.isWithinTable(new Position(1,2,"SOUTH"));
    expect(ret).toEqual(expect.any(Boolean));
  });

  it('should return true for the min x and y', () => {
    const table = new Table();
    const position = new Position(0, 0, "NORTH");
    expect(table.isWithinTable(position)).toBe(true);
  });
  
  it('should return false for values larger than the table', () => {
    const tableWidth = 5;
    const tableDepth = 5;
    const table = new Table(tableWidth, tableDepth);
    const position = new Position(tableWidth + 1, tableDepth + 1, "NORTH");
    expect(table.isWithinTable(position)).toBe(false);
  });

});