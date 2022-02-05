const killers = require("../harddata/killers.json");
const Josh = require("@joshdb/core");
const provider = require("@joshdb/sqlite");

const db = new Josh({
    name: "killerdata",
    provider,
});

//(async () => {
//    db.set("killers", killers);
//})();

module.exports = db;
