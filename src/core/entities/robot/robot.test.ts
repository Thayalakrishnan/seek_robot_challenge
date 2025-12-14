import { Position } from "../position/position.js";
import { Robot } from "./robot.js";


describe('Robot', () => {

  let robot: Robot;

  beforeEach(() => {
    robot = new Robot();
  });

  it('should initialise as unplaced when isPlaced=false', () => {
    expect(robot.isPlaced).toBe(false);
    expect(robot.position.x).toBe(-1);
    expect(robot.position.y).toBe(-1);
  });

  it('should update position and set isPlaced to true', () => {
    const newPosition = new Position(1, 2, "EAST");
    robot.updatePosition(newPosition);

    expect(robot.isPlaced).toBe(true);
    expect(robot.position).toEqual(newPosition);
    expect(robot.position.x).toBe(1);
  });

  it('should correctly update the position multiple times', () => {
    const firstPosition = new Position(0, 0, "NORTH");
    robot.updatePosition(firstPosition);

    const secondPosition = new Position(0, 1, "NORTH");
    robot.updatePosition(secondPosition);

    expect(robot.isPlaced).toBe(true);
    expect(robot.position.y).toBe(1);
  });
});