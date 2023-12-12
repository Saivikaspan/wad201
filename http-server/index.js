const http = require("http");
const fs = require("fs");
const args = require("minimist")(process.argv.slice(2));

let registrationContent = "";
let homeContent = "";
let projectContent = "";
let cssContent = "";
let jsContent = "";

fs.readFile("registration.html", (err, registration) => {
  if (err) {
    throw err;
  }
  registrationContent = registration;
});

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

fs.readFile("index.css", (err, css) => {
  if (err) {
    throw err;
  }
  cssContent = css;
});

fs.readFile("index.js", (err, js) => {
  if (err) {
    throw err;
  }
  jsContent = js;
});

const port = args.port || 5000;

http.createServer((req, res) => {
  let url = req.url;
  if (url === "/index.css") {
    res.writeHead(200, { "Content-Type": "text/css" });
    res.write(cssContent);
    res.end();
    return;
  } else if (url === "/index.js") {
    res.writeHead(200, { "Content-Type": "text/javascript" });
    res.write(jsContent);
    res.end();
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html" });

  switch (url) {
    case "/registration":
      res.write(registrationContent);
      break;
    case "/project":
      res.write(projectContent);
      break;
    default:
      res.write(homeContent);
      break;
  }

  res.end();
}).listen(port, () => {
  console.log(Server is running on port ${port});
});
