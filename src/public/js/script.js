function mode(arr) {
    return arr
        .sort((a, b) => arr.filter((v) => v === a).length - arr.filter((v) => v === b).length)
        .pop();
}

let games = 0;

function setStats() {
    fetch("/api/v1/killers", {
        method: "GET",
        redirect: "follow",
    })
        .then((response) => response.text())
        .then((result) => {
            const cMaps = [];
            const killers = [];
            const cPerks = [];
            const kills = [];

            const stats = JSON.parse(result);

            games = stats.length;

            stats.forEach((stat) => {
                killers.push(stat.killer);
                cMaps.push(stat.map);
                kills.push(stat.kills);
                const perks = stat.perks;
                perks.forEach((perkName) => {
                    cPerks.push(perkName);
                });
            });

            let killerCount = {};
            killers.forEach((killer) => {
                if (killerCount[killer]) {
                    killerCount[killer] += 1;
                } else {
                    killerCount[killer] = 1;
                }
            });

            let perkCount = {};
            cPerks.forEach((perk) => {
                if (perkCount[perk]) {
                    perkCount[perk] += 1;
                } else {
                    perkCount[perk] = 1;
                }
            });

            let mapCount = {};
            cMaps.forEach((map) => {
                if (mapCount[map]) {
                    mapCount[map] += 1;
                } else {
                    mapCount[map] = 1;
                }
            });

            const body = document.getElementById("stats");
            for (let i = 0; i < stats.length; i++) {
                const stat = stats[i];
                const row = document.createElement("tr");
                const game = document.createElement("td");
                game.innerHTML = i + 1;
                row.appendChild(game);
                const killer = document.createElement("td");
                killer.innerHTML = stat.killer;
                row.appendChild(killer);
                const kills = document.createElement("td");
                kills.innerHTML = stat.kills;
                row.appendChild(kills);
                const map = document.createElement("td");
                map.innerHTML = stat.map;
                row.appendChild(map);
                const perks = stat.perks;
                perks.forEach((perkName) => {
                    const perk = document.createElement("td");
                    perk.innerHTML = perkName;
                    row.appendChild(perk);
                });
                const region = document.createElement("td");
                region.innerHTML = stat.region.toUpperCase();
                row.appendChild(region);
                body.appendChild(row);
            }

            const map = mode(cMaps);
            const killer = mode(killers);
            const average = kills.reduce((a,b) => a+b) / kills.length;
            const perk = mode(cPerks);

            document.getElementById("commonMap").innerHTML = `${map} (${mapCount[map]})`;
            document.getElementById("commonKiller").innerHTML = `${killer} (${killerCount[killer]})`;
            document.getElementById("commonKills").innerHTML = `${average.toFixed(2)}`;
            document.getElementById("commonPerk").innerHTML = `${perk} (${perkCount[perk]})`;
        })
        .catch((error) => console.log("error", error));
}
setStats();