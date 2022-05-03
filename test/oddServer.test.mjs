import { expect } from "chai";
import { start } from "../src/oddServer.mjs";
import axios from 'axios';
import fp from 'find-free-port';
import fs from 'fs';
import { markAsUntransferable } from "worker_threads";


const getPort = () => {
  return fp(3000);
}

describe("Test without refactor", () => {
  let port;

  before(async () => {
    port = await getPort();
    port = port[0];
    start('test/temp/testDoc', port);
    if (fs.existsSync('test/temp/testDoc.txt')){
      fs.unlinkSync('test/temp/testDoc.txt');
    }
  })

  after(() => {
    if (fs.existsSync('test/temp/testDoc.txt')){
      fs.unlinkSync('test/temp/testDoc.txt');
    }
  }) 

  it("Can open url", async () => {
    const result = await axios.get('http://localhost:' + port);
    expect(result.data).to.equal("Created text.")
  })

  it("Creates a document", async() => {
    expect(fs.existsSync('test/temp/testDoc.txt')).to.equal(true);
  })

  it("Returns an object", () => {
    expect(start('name', 0)).to.be.an('object');
  });

  it("Returns random contents", () => {
    let contents = [];
    let i = 0;
    while (true) {contents.push(start('name', 0).content); i++; if (i === 100) break;}
    expect(contents.filter(elem => elem === contents[0]).length).to.be.below(100);
  });

  it("Identifies time of day", () => {
    let d = new Date()
    let expected = '';
    d.getHours() > 17 ? expected = "evening." : expected ="early";
    expect(start('name', 0).content.split(" ").includes(expected)).to.equal(true);
  })
});
