import http from "http";

const hostName = "127.0.0.1";
const PORT = 8002;

const server = http.createServer(async (req, res) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  const body = {
    title: "foo",
    body: "bar",
    userId: 1,
  };

  const response1 = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "User-Agent": "undici-stream-example",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data1 = await response1.json();
  console.log(data1);

  res.end(JSON.stringify(data));
});

server.listen(PORT, hostName, () => {
  console.log(
    `Server is running on the Port ${PORT} - http://${hostName}:${PORT}`
  );
});
