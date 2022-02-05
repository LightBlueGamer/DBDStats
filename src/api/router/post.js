const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const db = require("../../db/index");
const codes = require("../../../codes.json");

router.post("/killer", (req, res) => {
    const pass = req.header("Authorization");
    const killer = req.header("Killer");
    const p1 = req.header("Perk1");
    const p2 = req.header("Perk2");
    const p3 = req.header("Perk3");
    const p4 = req.header("Perk4");

    const obj = {
        killer,
        perks: [p1, p2, p3, p4],
    };

    if (!pass) return res.status(401).send(`No password were input`);
    if (pass !== codes.Light) return res.status(401).send("Wrong password was given");
    else {
        db.push("killers", obj);
        res.status(200).send(obj);
    }
});

module.exports = router;
