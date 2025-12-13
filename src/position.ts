export class Position {
    public x: number;
    public y: number;
    public direction: string;
  
    constructor(x = 0, y = 0, direction = "") {
      this.x = x;
      this.y = y;
      this.direction = direction;
    }
}