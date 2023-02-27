const express = require("express");
const router = express.Router();
const perks = require("../../harddata/perks.json");
const maps = require("../../harddata/maps.json");
const killers = require("../../harddata/killers.json");
const fs = require("fs");
const path = require("path");

const db = require("../../db/index");

perks.sort();

router.get("/killers", async (req, res) => {
    res.status(200).send(await db.get("killers"));
});

router.get("/perks", (req, res) => {
    res.status(200).send(perks);
});

router.get("/maps", (req, res) => {
    res.status(200).send(maps);
});

module.exports = router;
