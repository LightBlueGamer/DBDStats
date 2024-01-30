const killers = require("../harddata/killers.json");
const Josh = require("@joshdb/core");
const provider = require("@joshdb/mongo");

require('dotenv').config();

const db = new Josh({
    name: "stats",
    provider,
    providerOptions: {
        collection: 'stats',
        url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.flnzudr.mongodb.net/defaultauthdb`
    }
});

//(async () => {
//     db.set("killers", killers);
//})();

// (async () => {
//     const stats = await db.get("killers");

//     for (let i = 0; i < stats.length; i++) {
//         const obj = stats[i];
//         obj.user = "Tim";
//         await db.set(`killers.${i}`, obj);
//     }
// })();

module.exports = db;
