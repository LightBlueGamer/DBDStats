const express = require("express");
const app = express();
module.exports = { app };
const path = require("path");
const api = require("./api/index");

app.use(express.static(__dirname + "/public"));
app.use("/api", api);

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/main.html")));
app.get("/rawstats", (req, res) => res.sendFile(path.join(__dirname, "public/rawstats.html")));

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening in: http://localhost:${port}`);
