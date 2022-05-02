import http from 'http';
import fs from 'fs';

let globalNameOfFile;

const serverConstructor = (content, fileName) => {
  return http.createServer(function (req, res) {
    try {
      fs.writeFileSync(fileName+'.txt', content)
    } catch (err) {
      console.error(err)
    }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Created text.');
    res.end();
  });
};

export function start(nameOfFile, port) {
  globalNameOfFile = nameOfFile;
  let content = ['A fun text.', 'A sad text.', 'A really kind text.'][Math.floor(Math.random()*3)];
  let d = new Date();
  parseInt(d.getHours()) > 17 ? content += ' In the evening.' : content += ' In the early hours';
  const server = serverConstructor(content, globalNameOfFile);
  server.listen(port);
  return { d, content };
}

start('test', 8080)
