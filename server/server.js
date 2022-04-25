import { createServer } from "http";
import { WebSocketServer } from "ws";
import { createSnippet } from "./createSnippet.js";

const server = createServer();
const wss = new WebSocketServer({ server });
let urlInterval = wss.on("connection", function connection(ws, req) {
  let path = req.url;
  if (path == "/cutup") {
    urlInterval = setInterval(() => {
      createSnippet()
        .then((snippet) => {
          if (snippet) {
            ws.send(snippet);
          } else return;
        })
        .catch((error) => console.error(error));
    }, 1000);
  }

  ws.on("message", function message(data) {
    // this could save to persistent db.
    const message = JSON.parse(data);
    if (message.status === "closing") {
      clearInterval(urlInterval);
      console.log("Cut-up: %s", message.cutUp);
    }
  });
});

server.listen(5000, () => console.log("Server running on 5000"));
