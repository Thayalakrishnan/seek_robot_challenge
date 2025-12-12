
export class Table {
  public width: number;
  public height: number;

  constructor(x = 5, y = 5) {
    this.width = x;
    this.height = y;
    console.log(`[Table][constructor] width: ${this.width} height: ${this.height}`);
  }

  is_within_table(x = 0, y = 0) {
    return (
      (x >= 0) && (x < this.width) &&
      (y >= 0) && (y < this.height)
    )
  }
}


export default Table
