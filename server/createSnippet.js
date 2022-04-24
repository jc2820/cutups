import * as https from "https";

function createUrl() {
  let domain = "jamiecarter.herokuapp";
  let tld = "com";
  let path = "";

  return `https://${domain}.${tld}/${path}`;
}

function getPage() {
  const url = createUrl();
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const { statusCode } = res;
        if (statusCode == 200) {
          res.setEncoding("utf8");
          let rawData = "";
          res.on("data", (chunk) => {
            rawData += chunk;
          });
          res.on("end", () => {
            resolve(rawData);
          });
        } else reject("error");
      })
      .on("error", (e) => {
        reject(e);
      });
  });
}

export async function createSnippet() {
  let pageData = await getPage().catch(() => null)
  return pageData ? pageData.split("<title>")[1].split("</title>")[0] : null;
}
