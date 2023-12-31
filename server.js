const http = require("http");
const fs = require("fs");
const env = require("./env.json");

const server = http.createServer((req, res) => {
  console.log(
    `${new Date().toUTCString()}: ${req.url} from ${req.socket.remoteAddress}`
  );

  if (req.method === "PUT" && req.url === "/log") {
    const bearerToken = req.headers.authorization?.split(" ")[1];
    const secret = env.secret;

    if (bearerToken === secret) {
      parseBody(req, (body) => {
        console.log(`Message: ${body}`)
        fs.appendFileSync("family.log", body);
      });
    } else {
      console.log("Invalid bearer token");
    }
  }

  res.end();
});

server.listen(3000);

function parseBody(req, cb) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    cb(body);
  });
}
