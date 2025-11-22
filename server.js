import http from "node:http";
import path, { basename } from "node:path";

const hostname = "127.0.0.1";
const port = 8001;
const notes = "./notes.txt";

const server = http.createServer((req, res) => {
  const { headers, method, url } = req;
  req.on("error", (err) => {
    console.error(err);
  });

  res.on("error", (err) => {
    console.error(err);
  });

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  const resBody = { headers, method, url };
  const notesData = {
    dirname: path.dirname(notes),
    basename: path.basename(notes),
    extension: path.extname(notes),
    fileName: path.basename(notes, path.extname(notes)),
  };

  res.write(JSON.stringify(notesData));
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
