const express = require("express");
const app = express();
const path = require("path");
const api = require("./api/index");
const config = require("../config.json");
const fs = require("fs");
const db = require("./db/index");
const { kill } = require("process");

require("./db/index");

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));
app.use("/api", api);

const indexTemplate = fs.readFileSync(path.join(__dirname, "public/main.html"), "utf-8");

async function getKillers() {
  return Array.from(await db.get("killers"));
}
const killers = getKillers();

app.get('/', async (req, res) => {
  res.render(path.join(__dirname, "public/main.html"), { amount: (await killers).length });
});

app.get("/rawstats", (req, res) => res.sendFile(path.join(__dirname, "public/rawstats.html")));
app.get("/addgame", (req, res) => res.sendFile(path.join(__dirname, "public/addgame.html")));
app.get("/cperks", (req, res) => res.sendFile(path.join(__dirname, "public/commonperks.html")));

require("dotenv").config();

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening in: http://${config.IP}:${port}`);
