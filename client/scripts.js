(async function () {
  let ws = await connectToServer();

  ws.onmessage = (msg) => {
    console.log(msg.data);
  };

  async function connectToServer() {
    let ws = new WebSocket("ws://localhost:5000/cutup");
    return new Promise((resolve, reject) => {
      let timer = setInterval(() => {
        if (ws.readyState === 1) {
          clearInterval(timer);
          resolve(ws);
        }
      }, 10);
    });
  }
})();

function createTimestamp() {
  const d = new Date();
  return d.toISOString();
}

class CutUp {
  constructor(array, timestamp) {
    this.cutUpArray = array;
    this.timestamp = timestamp;
  }
}

let cutUp = new CutUp([], createTimestamp());
