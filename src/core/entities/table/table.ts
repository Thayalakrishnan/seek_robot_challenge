import { Position } from "../position/position.js";


export class Table {
  /**
   * Table Class 
   * holds the tables dimensions
   * defaults to the 5x5 table in the spec sheet
   *
   * @param width - width of table as an integer
   * @param height - height of table as an integer
   * @returns none
   */
  constructor(
    public width: number = 5, 
    public height: number = 5
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
  isWithinTable(position: Position): boolean {
    return (
      (position.x >= 0) && (position.x < this.width) &&
      (position.y >= 0) && (position.y < this.height)
    )
  }
}