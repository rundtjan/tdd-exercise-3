import { expect } from "chai";
import { start } from "../src/oddServer.mjs";

describe("Test without refactor", () => {
  it("First test", () => {
    expect(start('name', 8000)).to.be.an('object');
  });
});
