const http = require("http");
const fs = require("fs");
const args = require("minimist")(process.argv.slice(2));

let registrationContent = "";
let homeContent = "";
let projectContent = "";
let cssContent = "";
let jsContent = "";

fs.readFile("registration.html", (error, registration) => {
  if (error) {
    throw error;
  }
  registrationContent = registration;
});

fs.readFile("home.html", (error, home) => {
  if (error) {
    throw error;
  }
  homeContent = home;
});

fs.readFile("project.html", (error, project) => {
  if (error) {
    throw error;
  }
  projectContent = project;
});

fs.readFile("index.css", (error, css) => {
  if (error) {
    throw error;
  }
  cssContent = css;
});

fs.readFile("index.js", (error, js) => {
  if (error) {
    throw error;
  }
  jsContent = js;
});

const port = argv.port || 5000;

http.createServer((req, res) => {
  let url = req.url;
  if (url === "/index.css") {
    res.writeHead(200, { "Content-Type": "text/css" });
    res.write(cssContent);
    res.end();
    return;
  } else if (url === "/script.js") {
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
