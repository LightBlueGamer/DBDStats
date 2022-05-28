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
            const killers = [];
            const cPerks = [];

            const stats = JSON.parse(result);

            games = stats.length;

            stats.forEach((stat) => {
                killers.push(stat.killer);
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

            const body = document.getElementById("stats");
            console.log(stats);
            for (let i = 0; i < stats.length; i++) {
                const stat = stats[i];
                const row = document.createElement("tr");
                const game = document.createElement("td");
                game.innerHTML = i + 1;
                row.appendChild(game);
                const killer = document.createElement("td");
                killer.innerHTML = stat.killer;
                row.appendChild(killer);
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

            const killer = mode(killers);
            const perk = mode(cPerks);

            document.getElementById(
                "commonKiller"
            ).innerHTML = `${killer} (${killerCount[killer]})`;
            document.getElementById("commonPerk").innerHTML = `${perk} (${perkCount[perk]})`;
        })
        .catch((error) => console.log("error", error));
}

let size = 0;

function setSize() {
    fetch("/api/v1/size", {
        method: "GET",
        redirect: "follow",
    })
        .then((response) => response.text())
        .then((result) => {
            document.getElementById(
                "size"
            ).innerHTML = `Collected data: ${result}kb/${playedGames} games`;
        })
        .catch((error) => console.log("error", error));
}

function showInfo() {
    window.alert(`Size of collected data: ${size}kb`);
}

setStats();
setSize();
