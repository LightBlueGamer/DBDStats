function setPerks() {
    fetch("http://localhost:3000/api/v1/killers", {
        method: "GET",
        redirect: "follow",
    })
        .then((response) => response.text())
        .then((result) => {
            const commonPerks = {};

            const stats = JSON.parse(result);

            for (const stat of stats) {
                const killer = stat["killer"];
                const perks = stat["perks"];

                if (commonPerks[killer]) {
                    for (const perk of perks) {
                        if (commonPerks[killer][perk]) {
                            commonPerks[killer][perk]++;
                        } else {
                            commonPerks[killer][perk] = 1;
                        }
                    }
                } else {
                    commonPerks[killer] = {};
                    for (const perk of perks) {
                        commonPerks[killer][perk] = 1;
                    }
                }
            }

            const body = document.getElementById("body");

            for (const killer in commonPerks) {
                const perks = commonPerks[killer];
                console.log(perks);
                const perkSortable = Object.fromEntries(
                    Object.entries(perks).sort(([, a], [, b]) => b - a)
                );

                const table = document.createElement("table");
                const br = document.createElement("br");
                body.appendChild(table);
                body.appendChild(br);
                const caption = document.createElement("caption");
                caption.innerHTML = killer;
                const row = document.createElement("tr");
                const name = document.createElement("th");
                name.innerHTML = "Perk                               ";
                name.classList.add("first");
                const amount = document.createElement("th");
                amount.innerHTML = "Amount";
                amount.classList.add("second");
                row.appendChild(name);
                row.appendChild(amount);
                table.appendChild(caption);
                table.appendChild(row);
                const tbody = document.createElement("tbody");
                table.appendChild(tbody);
                for (const perk in perkSortable) {
                    if (perk === "Empty") continue;
                    const prow = document.createElement("tr");
                    const p = document.createElement("td");
                    p.innerHTML = perk;
                    const amt = document.createElement("td");
                    amt.innerHTML = perks[perk];
                    p.classList.add("first");
                    amt.classList.add("second");
                    prow.appendChild(p);
                    prow.appendChild(amt);
                    tbody.appendChild(prow);
                }
            }
        })
        .catch((error) => console.log("error", error));
}

setPerks();
