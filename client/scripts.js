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

let ws;
let cutUp;

async function startCutup() {
  ws = await connectToServer();
  cutUp = new CutUp([], createTimestamp());

  let newDiv = document.createElement("div")
  newDiv.className = "cutup-box";
  let container = document.getElementById("container");
  container.appendChild(newDiv);

  ws.onmessage = (msg) => {
    cutUp.cutUpArray.push(msg.data);
    let newPara = document.createElement("p");
    let snippetText = document.createTextNode(msg.data);
    newPara.appendChild(snippetText);
    newDiv.appendChild(newPara);
  };

  async function connectToServer() {
    let newWs = new WebSocket("ws://localhost:5000/cutup");
    return new Promise((resolve, reject) => {
      let timer = setInterval(() => {
        if (newWs.readyState === 1) {
          clearInterval(timer);
          resolve(newWs);
        }
      }, 10);
    });
  }
};

async function stopCutup() {
  await ws.send(cutUp);
  ws.close();
}

const startButton = document.getElementById("start");
startButton.addEventListener("click", startCutup);

const stopButton = document.getElementById("stop");
stopButton.addEventListener("click", stopCutup);




