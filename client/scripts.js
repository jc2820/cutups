function createTimestamp() {
  const d = new Date();
  return d.toISOString();
}

class CutUp {
  constructor(array, title, timestamp) {
    this.cutUpArray = array;
    this.title = title;
    this.timestamp = timestamp;
  }
}

let ws;
let cutUp;

async function startCutup() {
  ws = await connectToServer();
  cutUp = new CutUp([], "", createTimestamp());

  let newDiv = document.createElement("div");
  newDiv.className = "cutup-box";
  let container = document.getElementById("container");
  container.appendChild(newDiv);
  let titleCreated = false;

  ws.onmessage = (msg) => {
    if (!titleCreated) {
      cutUp.title = msg.data;
      let newCutupTitle = document.createElement("h2");
      let titleText = document.createTextNode(msg.data);
      newCutupTitle.appendChild(titleText);
      newDiv.appendChild(newCutupTitle);
      window.scrollTo(0, document.body.scrollHeight);
      titleCreated = true;
    } else {
      cutUp.cutUpArray.push(msg.data);
      let newPara = document.createElement("p");
      let snippetText = document.createTextNode(msg.data);
      newPara.appendChild(snippetText);
      newDiv.appendChild(newPara);
      window.scrollTo(0, document.body.scrollHeight);
    }
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
}

function stopCutup() {
  ws.send(JSON.stringify({ cutUp: cutUp, status: "closing" }));
  ws.close();
}

const startButton = document.getElementById("start");
startButton.addEventListener("click", startCutup);

const stopButton = document.getElementById("stop");
stopButton.addEventListener("click", stopCutup);
