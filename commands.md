## Base

| Command | Action | Returns |
| :--- | :--- | :--- |
| `PLACE X,Y,DIRECTION` | places the robot on the table at position X,Y and facing DIRECTION | void |
| `LEFT` | rotates robot in place, counter clockwise 90 degrees | void |
| `MOVE` | moves robot 1 space in facing direction | void |
| `RIGHT` | rotates robot in place, clockwise 90 degrees | void |
| `REPORT` | outputs the robots current position as: `Output: X,Y,DIRECTION` | string |

## Extra

| Command | Action | Returns |
| :--- | :--- | :--- |
| `EXIT` | exits the application. note you can only `EXIT` once the robot has been placed | void |


## State based commands

### IDLE

| Command | Action | Returns |
| :--- | :--- | :--- |
| `PLACE X,Y,DIRECTION` | places the robot on the table at position X,Y and facing DIRECTION | void |
| `EXIT` | exits the application. note you can only `EXIT` once the robot has been placed | void |

### ACTIVE

| Command | Action | Returns |
| :--- | :--- | :--- |
| `PLACE X,Y,DIRECTION` | places the robot on the table at position X,Y and facing DIRECTION | void |
| `LEFT` | rotates robot in place, counter clockwise 90 degrees | void |
| `MOVE` | moves robot 1 space in facing direction | void |
| `RIGHT` | rotates robot in place, clockwise 90 degrees | void |
| `REPORT` | outputs the robots current position as: `Output: X,Y,DIRECTION` | string |
| `EXIT` | exits the application. note you can only `EXIT` once the robot has been placed | void |
