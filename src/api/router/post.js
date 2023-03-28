const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const db = require("../../db/index.js");
const codes = require("../../../codes.json");

router.post("/killer", (req, res) => {
    const pass = req.header("Authorization");
    const killer = req.header("Killer");
    const map = req.header("Map");
    const kills = parseInt(req.header("Kills"));
    const p1 = req.header("Perk1");
    const p2 = req.header("Perk2");
    const p3 = req.header("Perk3");
    const p4 = req.header("Perk4");
    const region = req.header("Region");
    const offering = req.header("Offering")

    const user = codes.find(x => x.code === pass).name;

    const obj = {
        killer,
        perks: [p1, p2, p3, p4],
        region,
        map,
        kills,
        user,
        offering
    };

    if (!pass) return res.status(401).send(`No password were input`);
    if (codes.some((x) => x.code === pass)) {
        db.push("killers", obj);
        res.status(200).send(obj);
        fs.appendFileSync(
            path.resolve("logs/logs.txt"),
            `${codes.find((x) => x.code === pass).name} added:\n${JSON.stringify(obj)}\n\n`
        );
    } else return res.status(401).send("Wrong password was given");
});

router.post("/ukiller", (req, res) => {
    const pass = req.header("Authorization");
    const killer = req.header("Killer");
    const map = req.header("Map");
    const kills = parseInt(req.header("Kills"));
    const p1 = req.header("Perk1");
    const p2 = req.header("Perk2");
    const p3 = req.header("Perk3");
    const p4 = req.header("Perk4");
    const pos = req.header("Pos");
    const region = req.header("Region");
    const offering = req.header("Offering")

    const user = codes.find(x => x.code === pass).name;

    const obj = {
        killer,
        perks: [p1, p2, p3, p4],
        region,
        map,
        kills,
        user,
        offering
    };

    if (!pass) return res.status(401).send(`No password were input`);
    if (codes.find((x) => x.name === "Tim")) {
        db.set(`killers.${pos}`, obj);
        res.status(200).send(obj);
        fs.appendFileSync(
            path.resolve("logs/logs.txt"),
            `${codes.find((x) => x.code === pass).name} added:\n${JSON.stringify(obj)}\n\n`
        );
    } else
        return res
            .status(401)
            .send("Wrong password was given or you don't have permission to access this.");
});

module.exports = router;
