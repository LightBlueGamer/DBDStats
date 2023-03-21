const express = require("express");
const app = express();
const path = require("path");
const api = require("./api/index");
const config = require("../config.json");
const fs = require("fs");
const db = require("./db/index");

require("./db/index");

app.use(express.static(__dirname + "/public"));
app.use("/api", api);

const indexTemplate = fs.readFileSync(path.join(__dirname, "public/main.html"), "utf-8");

//async function getKillers() {
  //  const killers = Array.from(await db.get("killers"));
//}
//getKillers();

app.get("/", (req, res) => res.send(indexTemplate/*.replace("{amount}", killers.length)*/));
app.get("/rawstats", (req, res) => res.sendFile(path.join(__dirname, "public/rawstats.html")));
app.get("/addgame", (req, res) => res.sendFile(path.join(__dirname, "public/addgame.html")));
app.get("/cperks", (req, res) => res.sendFile(path.join(__dirname, "public/commonperks.html")));

require("dotenv").config();

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening in: http://${config.IP}:${port}`);
