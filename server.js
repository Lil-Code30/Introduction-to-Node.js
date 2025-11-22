import http from "node:http";

const hostname = "127.0.0.1";
const port = 8001;

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

  res.write(JSON.stringify(resBody));
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
