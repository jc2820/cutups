import { createServer } from "http";
import { WebSocketServer } from "ws";
import { createSnippet } from "./createSnippet.js";

const server = createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws, req) {
  let path = req.url;
  if (path == "/cutup") {
    setInterval(() => {
      createSnippet().then(snippet => console.log(snippet))
      //ws.send(snippet);
    }, 1000);
  }
});

server.listen(5000, () => console.log("Server running on 5000"));
