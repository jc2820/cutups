import { createServer } from "http";
import { WebSocketServer } from "ws";
import { createSnippet } from "./createSnippet.js";

const server = createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws, req) {
  let path = req.url;
  if (path == "/cutup") {
    setInterval(() => {
      createSnippet()
        .then((snippet) => {
          if (snippet) {
            ws.send(snippet);
          } else return;
        })
        .catch((error) => console.error(error));
    }, 1000);
  }
});

wss.on("message", function message(data) {
  console.log("received: %s", data);
});

server.listen(5000, () => console.log("Server running on 5000"));
