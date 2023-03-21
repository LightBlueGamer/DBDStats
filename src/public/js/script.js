function mode(arr) {
    return arr
        .sort((a, b) => arr.filter((v) => v === a).length - arr.filter((v) => v === b).length)
        .pop();
}

let games = 0;

function setStats(filterKiller, filterKills, filterMap, filterPerk, filterRegion, sort) {
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

            let stats = JSON.parse(result);

            games = stats.length;

            if(filterKiller?.length > 0) stats = stats.filter(stat => stat.killer.toUpperCase().indexOf(filterKiller.toUpperCase()) > -1)
            if(filterKills?.length > 0 && parseInt(filterKills) >= 0 && parseInt(filterKills) <= 4) stats = stats.filter(stat => stat.kills.toString().toUpperCase().indexOf(filterKills.toString().toUpperCase()) > -1)
            if(filterMap?.length > 0) stats = stats.filter(stat => stat.map.toUpperCase().indexOf(filterMap.toUpperCase()) > -1)
            if(filterPerk?.length > 0) stats = stats.filter(stat => stat.perks.some(perkName => perkName.toUpperCase().indexOf(filterPerk.toUpperCase()) > -1))
            if(filterRegion?.length > 0 && filterRegion !== "ALL") stats = stats.filter(stat => stat.region.toUpperCase().indexOf(filterRegion?.toUpperCase()) > -1)
            if(sort?.length > 0) {
                if(sort === "killsHighLow") stats = stats.sort((a, b) => b.kills - a.kills);
                else if(sort === "killsLowHigh") stats = stats.sort((a, b) => a.kills - b.kills);
            }

            document.getElementById("stats").innerHTML = "";

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
                    if(['Empty', 'Unknown'].includes(perkName)) perk.style.fontSize = 0;
                    row.appendChild(perk);
                });
                const region = document.createElement("td");
                region.innerHTML = stat.region.toUpperCase();
                row.appendChild(region);
                body.appendChild(row);
            }

            const map = mode(cMaps);
            const killer = mode(killers);
            const average = kills?.reduce((a,b) => a+b) / kills.length;
            const perk = mode(cPerks);

            document.getElementById("commonMap").innerHTML = `${map} (${mapCount[map]})`;
            document.getElementById("commonKiller").innerHTML = `${killer} (${killerCount[killer]})`;
            document.getElementById("commonKills").innerHTML = `${average.toFixed(2)}`;
            document.getElementById("commonPerk").innerHTML = `${perk} (${perkCount[perk]})`;
        })
        .catch((error) => console.log("error", error));
}
setStats();

function searchTable() {
    const inputKiller = document.getElementById("searchKiller");
    const toFindKiller = inputKiller.value.toUpperCase();
    const inputKills = document.getElementById("searchKills");
    const toFindKills = inputKills.value.toString().toUpperCase();
    const inputMap = document.getElementById("searchMap");
    const toFindMap = inputMap.value.toUpperCase();
    const inputPerk = document.getElementById("searchPerk");
    const toFindPerk = inputPerk.value.toUpperCase();
    const inputRegion = document.getElementById("searchRegion");
    const toFindRegion = inputRegion.value.toUpperCase();
    const sort = document.getElementById("sort").value;
    setStats(toFindKiller, toFindKills, toFindMap, toFindPerk, toFindRegion, sort);
}