const killers = require("../harddata/killers.json");
const Josh = require("@joshdb/core");
const provider = require("@joshdb/sqlite");

const db = new Josh({
    name: "killerdata",
    provider,
});

// (async () => {
//     db.set("killers", killers);
// })();

// (async () => {
//     const stats = await db.get("killers");

//     for (let i = 0; i < stats.length; i++) {
//         const obj = stats[i];
//         obj.region = "Eu";
//         await db.set(`killers.${i}`, obj);
//     }
// })();

module.exports = db;
