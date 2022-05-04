import { expect } from "chai";
import { start } from "../src/oddServer.mjs";
import axios from 'axios';
import fp from 'find-free-port';
import fs from 'fs';


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

  describe("Creates a document", () => {
    
    it("Can open url", async () => {
      const result = await axios.get('http://localhost:' + port);
      console.log(result);
      expect(result.status).to.equal(200);
    })

    it("Url has correct content", async () => {
      const result = await axios.get('http://localhost:' + port);
      expect(result.data).to.equal('Created text.');
    })

    it("Document exists", () => {
      expect(fs.existsSync('test/temp/testDoc.txt')).to.equal(true);
    })

    it("The content of the document is correct", () => {
      let randomTexts = ['A fun text.', 'A sad text.', 'A really kind text.'];
      let timeTexts = [' In the evening', ' In the early hours'];
      const data = fs.readFileSync('test/temp/testDoc.txt', {encoding:'utf8', flag:'r'});
      const randomText = data.split('.')[0] + '.';
      const timeText = data.split('.')[1];
      expect(randomTexts.includes(randomText)).to.equal(true);
      expect(timeTexts.includes(timeText)).to.equal(true);
    })
  
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

  it("Returns correct time of day", () => {
    const d = new Date();
    const result = start('name', 0);
    expect(result.d.getDay()).to.equal(d.getDay());
    expect(result.d.getHours()).to.equal(d.getHours());
  });

  it("Identifies time of day", () => {
    let d = new Date();
    let expected = '';
    d.getHours() > 17 ? expected = "evening." : expected ="early";
    expect(start('name', 0).content.split(" ").includes(expected)).to.equal(true);
  })
});
