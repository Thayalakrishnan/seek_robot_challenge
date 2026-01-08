import { Coordinate } from "../coordinate/coordinate.js";


export class Table {
  /**
   * Table Class 
   * holds the tables dimensions
   * defaults to the 5x5 table in the spec sheet
   *
   * @param width - width of table as an integer
   * @param depth - depth of table as an integer
   * @returns none
   */
  constructor(
    public width = 5, 
    public depth = 5
    ) {
  }
  
  /**
   * isWithinTable
   * Helper method to test if the value is within the tables 
   * domain. Allows us to separate the tables dimension logic
   * from the position logic 
   * @param position - position object to check against
   * @returns boolean - true if within / false if not 
   */
  public isWithinTable(coordinate: Coordinate): boolean {
    return (
      (coordinate.x >= 0) && (coordinate.x < this.width) &&
      (coordinate.y >= 0) && (coordinate.y < this.depth)
    )
  }
}