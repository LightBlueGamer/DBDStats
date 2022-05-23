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

            const killerSortable = Object.fromEntries(
                Object.entries(killerCount).sort(([, a], [, b]) => b - a)
            );

            const kBody = document.getElementById("killerBody");
            let killerPlace = 1;
            for (const killerName in killerSortable) {
                const row = document.createElement("tr");
                const place = document.createElement("td");
                const killer = document.createElement("td");
                const amount = document.createElement("td");

                place.innerHTML = killerPlace;

                const keys = Object.keys(killerSortable);
                const nextIndex = keys.indexOf(killerName) + 1;

                if (
                    keys[nextIndex] !== undefined &&
                    killerCount[killerName] !== killerCount[keys[nextIndex]]
                )
                    killerPlace++;

                killer.innerHTML = killerName;
                amount.innerHTML = `${killerCount[killerName]}/${killers.length} | ${(
                    (killerCount[killerName] / killers.length) *
                    100
                ).toFixed(2)}%`;

                row.appendChild(place);
                row.appendChild(killer);
                row.appendChild(amount);
                kBody.appendChild(row);
            }

            let perkCount = {};
            cPerks.forEach((perk) => {
                if (perkCount[perk]) {
                    perkCount[perk] += 1;
                } else {
                    perkCount[perk] = 1;
                }
            });

            const perkSortable = Object.fromEntries(
                Object.entries(perkCount).sort(([, a], [, b]) => b - a)
            );

            const pBody = document.getElementById("perkBody");

            let perkPlace = 1;
            for (const perkName in perkSortable) {
                if (perkName === "Empty") continue;

                const row = document.createElement("tr");
                const place = document.createElement("td");
                const perk = document.createElement("td");
                const amount = document.createElement("td");

                place.innerHTML = perkPlace;

                const keys = Object.keys(perkSortable);
                const nextIndex = keys.indexOf(perkName) + 1;

                if (
                    keys[nextIndex] !== undefined &&
                    perkCount[perkName] !== perkCount[keys[nextIndex]]
                )
                    perkPlace++;

                perk.innerHTML = perkName;
                amount.innerHTML = `${perkCount[perkName]}/${cPerks.length / 4} | ${(
                    (perkCount[perkName] / (cPerks.length / 4)) *
                    100
                ).toFixed(2)}%`;

                row.appendChild(place);
                row.appendChild(perk);
                row.appendChild(amount);
                pBody.appendChild(row);
            }
        })
        .catch((error) => console.log("error", error));
}

setStats();
