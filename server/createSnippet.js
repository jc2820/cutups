import * as https from "https";

function randomDomain() {
  let domainLength = Math.floor(Math.random() * 10) + 1;
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let domainName = [];
  while (domainLength > 0) {
    domainName.push(alphabet[Math.floor(Math.random() * alphabet.length)])
    domainLength--
  }
  return domainName.join("");
}

function randomTld() {
  const tlds = [
    "com",
    "ru",
    "org",
    "net",
    "ir",
    "in",
    "uk",
    "co.uk",
    "au",
    "de",
    "ua",
    "fr",
  ];

  for (let i = tlds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = tlds[i];
    tlds[i] = tlds[j];
    tlds[j] = temp;
  }

  return tlds[0];
}

function createUrl() {
  let domain = randomDomain();
  let tld = randomTld();
  let path = "";
  console.log(`https://${domain}.${tld}/${path}`);
  return `https://${domain}.${tld}/${path}`;
}

function getPage() {
  const url = createUrl();
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const { statusCode } = res;
        console.log(statusCode)
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
  let pageData = await getPage().catch(() => null);
  return pageData ? pageData.split("<title>")[1].split("</title>")[0] : null;
}
