//import { runApplication } from "./launch_helper.ts";
import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';

import { ApplicationLauncher } from "./launcher.js";

/**
 * testing the application command by command
 * the application instance will be kept alive the entire test
 * we are testing the same instance, so memory will persist 
 * across the entire test suite
 */
describe("Test the Application command by command", () => {
  let applicationInstance: ApplicationLauncher;
  
  beforeAll(() => {
    applicationInstance = new ApplicationLauncher();
  });
  
  //beforeEach(() => {});
  
  describe("Testing Application IDLE State", () => {
    
    it("Prints that the robot needs to be placed for all commands except PLACE", async () => {
      const result1 = await applicationInstance.runCommand("MOVE");
      expect(result1).toContain("Robot needs to be placed");
    });
    
    it.each(["MOVE", "LEFT", "RIGHT", "REPORT",])("Prints that the robot needs to be placed for '%i' command", async (command) => {
      const result = await applicationInstance.runCommand(command);
      expect(result).toContain("Robot needs to be placed");
    });
    
    it("Returns an error when an unknown command is given", async () => {
      const result = await applicationInstance.runCommand("YEET");
      expect(result).toContain(`Unknown Command: "YEET"`);
    });
    
    it("Returns error when PLACE argument is incorrect", async () => {
      const result = await applicationInstance.runCommand("PLACE 12NORTH");
      expect(result).toContain(`Can't parse arguments: "12NORTH"`);
    });
    
    it("Should print nothing when the robot is properly placed", async () => {
      const result = await applicationInstance.runCommand("PLACE 1,2,NORTH");
      expect(result).toContain("");
    });
    
  });
  
  
  describe("Testing Application ACTIVE State", () => {
    
    it("Correctly prints the robots current location", async () => {
      const result = await applicationInstance.runCommand("REPORT");
      expect(result).toContain("Output: 1,2,NORTH");
    });
    
    it("Correctly replaces the robot", async () => {
      const oldResult = await applicationInstance.runCommand("REPORT");
      const newPosition = "2,2,NORTH";
      await applicationInstance.runCommand(`PLACE ${newPosition}`);
      const result = await applicationInstance.runCommand("REPORT");
      expect(result).toContain(`Output: ${newPosition}`);
      expect(result).not.toBe(oldResult);
    });
    
    it("Correctly moves the robot 1 space north", async () => {
      await applicationInstance.runCommand("PLACE 2,2,NORTH");
      await applicationInstance.runCommand("MOVE");
      const result = await applicationInstance.runCommand("REPORT");
      expect(result).toContain("Output: 2,3,NORTH");
    });
    
    it("Correctly does not move the robot past the north table boundary", async () => {
      await applicationInstance.runCommand("PLACE 4,4,NORTH");
      await applicationInstance.runCommand("MOVE");
      await applicationInstance.runCommand("MOVE");
      const result = await applicationInstance.runCommand("REPORT");
      expect(result).toContain("Output: 4,4,NORTH");
    });
    
    it("Correctly does not move the robot past the east table boundary", async () => {
      await applicationInstance.runCommand("PLACE 4,4,EAST");
      await applicationInstance.runCommand("MOVE");
      await applicationInstance.runCommand("MOVE");
      const result = await applicationInstance.runCommand("REPORT");
      expect(result).toContain("Output: 4,4,EAST");
    });
    
    it("Correctly does not move the robot past the south table boundary", async () => {
      await applicationInstance.runCommand("PLACE 0,0,SOUTH");
      await applicationInstance.runCommand("MOVE");
      await applicationInstance.runCommand("MOVE");
      const result = await applicationInstance.runCommand("REPORT");
      expect(result).toContain("Output: 0,0,SOUTH");
    });
    
    it("Correctly does not move the robot past the west table boundary", async () => {
      await applicationInstance.runCommand("PLACE 0,0,WEST");
      await applicationInstance.runCommand("MOVE");
      await applicationInstance.runCommand("MOVE");
      const result = await applicationInstance.runCommand("REPORT");
      expect(result).toContain("Output: 0,0,WEST");
    });
    
    it("Correctly rotates the robot left: NORTH ---> WEST", async () => {
      await applicationInstance.runCommand("PLACE 2,2,NORTH");
      await applicationInstance.runCommand("LEFT");
      const result = await applicationInstance.runCommand("REPORT");
      expect(result).toContain("Output: 2,2,WEST");
    });
    
    it("Correctly rotates the robot left 4 times, a full rotation", async () => {
      await applicationInstance.runCommand("PLACE 2,2,NORTH");
      await applicationInstance.runCommand("LEFT");
      await applicationInstance.runCommand("LEFT");
      await applicationInstance.runCommand("LEFT");
      await applicationInstance.runCommand("LEFT");
      const result = await applicationInstance.runCommand("REPORT");
      expect(result).toContain("Output: 2,2,NORTH");
    });
    
    it("Correctly rotates the robot right: NORTH ---> EAST", async () => {
      await applicationInstance.runCommand("PLACE 2,2,NORTH");
      await applicationInstance.runCommand("RIGHT");
      const result = await applicationInstance.runCommand("REPORT");
      expect(result).toContain("Output: 2,2,EAST");
    });
    
    it("Correctly rotates the robot right 4 times, a full rotation.", async () => {
      await applicationInstance.runCommand("PLACE 2,2,NORTH");
      await applicationInstance.runCommand("RIGHT");
      await applicationInstance.runCommand("RIGHT");
      await applicationInstance.runCommand("RIGHT");
      await applicationInstance.runCommand("RIGHT");
      const result = await applicationInstance.runCommand("REPORT");
      expect(result).toContain("Output: 2,2,NORTH");
    });
    
  });
  
  describe("Correctly Executes Examples", () => {
    
    // example 1
    it.each([
      ["PLACE 0,0,NORTH", ""],
      ["MOVE", ""],
      ["REPORT", "Output: 0,1,NORTH"],
    ])("Example 1", async (command, res) => {
      const result = await applicationInstance.runCommand(command);
      expect(result).toContain(res);
    });
    
    // example 2
    it.each([
      ["PLACE 0,0,NORTH", ""],
      ["LEFT", ""],
      ["REPORT", "Output: 0,0,WEST"],
    ])("Example 2", async (command, res) => {
      const result = await applicationInstance.runCommand(command);
      expect(result).toContain(res);
    });
    
    // example 3
    it.each([
      ["PLACE 1,2,EAST", ""],
      ["MOVE", ""],
      ["MOVE", ""],
      ["LEFT", ""],
      ["MOVE", ""],
      ["REPORT", "Output: 3,3,NORTH"],
    ])("Example 3", async (command, res) => {
      const result = await applicationInstance.runCommand(command);
      expect(result).toContain(res);
    });
    
  });
  
  //afterEach(() => {});
  
  afterAll(async () => {
    await applicationInstance.closeApplication();
  });
  
});


  // tests for the idle state
  //// test that no commands are processed until a valid place command
  //// test a non command
  //// test a command that doesnt take arguments
  //// test a command that does take arguments
  //// test any command other than place
  //// test the exit command
  
  // tests for active state
  //// test a valid command
  //// test a valid command that does not take arguments
  //// test a valid command that does take argumnets
  //// test the exit command
  
  //// test an invalid command
  //// test a valid command that does take argumnets with invalid arguments