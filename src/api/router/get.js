const express = require("express");
const router = express.Router();
const perks = require("../../harddata/perks.json");
const maps = require("../../harddata/maps.json");
const axios = require('axios');
const cheerio = require('cheerio');

const db = require("../../db/index");

perks.sort();

router.get("/killers", async (req, res) => {
    res.status(200).send(await db.get("killers"));
});

router.get("/perks", (req, res) => {
    axios.get("https://deadbydaylight.fandom.com/wiki/Killer_Perks")
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const perkNames = [];
            
            $('table tbody tr').each(function() {
                const name = $(this).find('th:nth-child(2) a').text().trim();
                if (name) {
                    perkNames.push(name);
                }
            });

            res.status(200).send(perkNames);
        })
        .catch(console.error);
});


router.get("/maps", (req, res) => {
    res.status(200).send(maps);
});

router.get("/killerList", (req, res) => {
    axios.get('https://deadbydaylight.fandom.com/wiki/Killers')
        .then(function (response) {
            const $ = cheerio.load(response.data);
            const killers = [];

            $('div > div > div.center > div.floatnone').each((i, e) => {
                killers.push($(e).find('a')[0].attributes[1].value.replace('The ', ''));
            });

            res.status(200).send(killers);
        })
        .catch(function (error) {
            return console.error(error);
        });
});

module.exports = router;
