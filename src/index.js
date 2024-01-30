const express = require("express");
const app = express();
const path = require("path");
const api = require("./api/index");
const config = require("../config.json");
const fs = require("fs");
const db = require("./db/index");
const { kill } = require("process");
const MongoClient = require('mongodb').MongoClient;

require("dotenv").config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.flnzudr.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(url);

let stats;

async function run() {
  try {
    await client.connect();
    const db = await client.db("josh").command({ dbStats: 1});
    stats = db.dataSize;
  } catch (error) {
    console.error(error);
  }
}

run()

require("./db/index");

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));
app.use("/api", api);

async function getKillers() {
  return Array.from(await db.get("killers"));
}
const killers = getKillers();

function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

app.get('/', async (req, res) => {
  res.render(path.join(__dirname, "public/main.ejs"), { amount: (await killers).length, size: bytesToSize(stats)});
});

app.get("/rawstats", (req, res) => res.sendFile(path.join(__dirname, "public/rawstats.html")));
app.get("/addgame", (req, res) => res.sendFile(path.join(__dirname, "public/addgame.html")));
app.get("/cperks", (req, res) => res.sendFile(path.join(__dirname, "public/commonperks.html")));

require("dotenv").config();

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening in: http://${config.IP}:${port}`);
