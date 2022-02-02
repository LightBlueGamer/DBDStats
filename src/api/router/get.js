const express = require("express");
const router = express.Router();
const killers = require("../../data/killers.json");
const fs = require("fs");
const path = require("path");

router.get("/killers", (req, res) => {
    res.status(200).send(killers);
});

router.get("/size", (req, res) => {
    const stats = fs.statSync(path.resolve("src/data/killers.json"));
    const fileSizeInBytes = (stats.size / 1024).toFixed(2);
    const fileSizeInMegabytes = fileSizeInBytes / 1024;
    res.status(200).send(`${fileSizeInBytes}`);
});

module.exports = router;
