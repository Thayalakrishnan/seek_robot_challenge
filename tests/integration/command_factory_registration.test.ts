import { Command } from "../../src/commands/abstracts/command.js";
import { MoveCommand } from "../../src/commands/move_command/move_command.js";
import { NullCommand } from "../../src/commands/null_command/null_command.js";
import { PlaceCommand } from "../../src/commands/place_command/place_command.js";
import { UnplacedCommand,  } from "../../src/commands/unplaced_command/unplaced_command.js";
import { Game } from "../../src/core/game/game.js";
import { UnPlacedRobotError, UnknownCommandError } from "../../src/errors/core_errors.js";
import { CommandFactoryActiveState } from "../../src/commands/factories/command_factory_active_state.js";
import { CommandFactoryIdleState } from "../../src/commands/factories/command_factory_idle_state.js";

describe('Infrastructure Integration Tests', () => {

  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  describe('CommandFactory Registration', () => {

    it('should correctly map command strings to their concrete classes in the active state', () => {
      let command: Command;

      command = CommandFactoryActiveState.create("PLACE", "1,1,NORTH");
      expect(command).toBeInstanceOf(PlaceCommand);
      command = CommandFactoryActiveState.create("MOVE", "");
      expect(command).toBeInstanceOf(MoveCommand);
      command = CommandFactoryActiveState.create("NULL", "");
      expect(command).toBeInstanceOf(NullCommand);
    });

    it('should correctly map command strings to their concrete classes in the idle state', () => {
      let command: Command;

      command = CommandFactoryIdleState.create("PLACE", "0,0,EAST");
      expect(command).toBeInstanceOf(PlaceCommand);
      command = CommandFactoryIdleState.create("NULL", "");
      expect(command).toBeInstanceOf(UnplacedCommand);
    });


    it('should return the UnplacedCommand when an unregistered command is executed in the Idle state', () => {
      expect(() => {
        const command = CommandFactoryIdleState.create("JUMP", "");
        command.execute(game);
      }).toThrow(UnPlacedRobotError);
    });


    it('should return the NuLLCommand when an unregistered command is executed in the Active state', () => {
      expect(() => {
        const command = CommandFactoryActiveState.create("JUMP", "");
        command.execute(game);
      }).toThrow(UnknownCommandError);
    });

  });
});