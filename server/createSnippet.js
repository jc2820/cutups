import * as https from "https";

function createUrl() {
  let domain = "wikipedia";
  let tld = "org";
  let path = "wiki/Special:Random";
  return `https://${domain}.${tld}/${path}`;
}

function getPage() {
  const url = createUrl();
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        res.setEncoding("utf8");
        let rawData = "";
        res.on("data", (chunk) => {
          rawData += chunk;
        });
        res.on("end", () => {
          resolve(rawData);
        });
      })
      .on("error", (e) => {
        reject(e);
      });
  });
}

export async function createSnippet() {
  getPage()
    .then((data) => {
      let title = data.split("<title>")[1].split("</title>")[0];
      return title;
    })
    .catch((error) => console.error(error));
}
