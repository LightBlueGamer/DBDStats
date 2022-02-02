function setStats() {
    fetch("http://localhost:3000/api/v1/killers", {
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
            for (const killerName in killerSortable) {
                const row = document.createElement("tr");
                const killer = document.createElement("td");
                const amount = document.createElement("td");

                killer.innerHTML = killerName;
                amount.innerHTML = killerCount[killerName];

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
            for (const perkName in perkSortable) {
                const row = document.createElement("tr");
                const perk = document.createElement("td");
                const amount = document.createElement("td");

                perk.innerHTML = perkName;
                amount.innerHTML = perkCount[perkName];

                row.appendChild(perk);
                row.appendChild(amount);
                pBody.appendChild(row);
            }
        })
        .catch((error) => console.log("error", error));
}

setStats();
