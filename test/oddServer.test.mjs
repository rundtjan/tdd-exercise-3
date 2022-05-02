import { expect } from "chai";
import { start } from "../src/oddServer.mjs";

describe("Test without refactor", () => {
  it("Returns an object", () => {
    console.log(start('name', 0))
    expect(start('name', 0)).to.be.an('object');
  });

  it("Returns random contents", () => {
    let contents = [];
    let i = 0;
    while (true) {contents.push(start('name', 0).content); i++; if (i === 100) break;}
    expect(contents.filter(elem => elem === contents[0]).length).to.be.below(100);
  });
});
