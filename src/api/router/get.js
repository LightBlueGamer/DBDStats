const express = require("express");
const router = express.Router();
const perks = require("../../harddata/perks.json");
const killers = require("../../harddata/killers.json");
const fs = require("fs");
const path = require("path");

const db = require("../../db/index");

perks.sort().push("Empty");

router.get("/killers", async (req, res) => {
    res.status(200).send(await db.get("killers"));
});

router.get("/size", (req, res) => {
    const stats = fs.statSync(path.resolve("data/josh.sqlite"));
    const fileSizeInBytes = (stats.size / 1024).toFixed(2);
    const fileSizeInMegabytes = fileSizeInBytes / 1024;
    res.status(200).send(`${fileSizeInBytes}`);
});

router.get("/perks", (req, res) => {
    res.status(200).send(perks);
});

module.exports = router;
