import { Adder } from "./adder";

describe("Adder", () => {
  it("adds two numbers", () => {
    const adder = new Adder();
    expect(adder.add(2, 3)).toBe(5);
  });
});
