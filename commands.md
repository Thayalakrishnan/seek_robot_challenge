## Base

| Command | Action |
| :--- | :--- |
| `PLACE X,Y,DIRECTION` | places the robot on the table at position X,Y and facing DIRECTION |
| `LEFT` | rotates robot in place, counter clockwise 90 degrees |
| `MOVE` | moves robot 1 space in facing direction |
| `RIGHT` | rotates robot in place, clockwise 90 degrees |
| `REPORT` | outputs the robots current position as: `Output: X,Y,DIRECTION` |

## Extra

| Command | Action |
| :--- | :--- |
| `EXIT` | exits the application. note you can only `EXIT` once the robot has been placed |
| `NULL` | blank command used to catch errors |
| `UNPLACED` | unplaced command occurs when the robot has not been placed |
