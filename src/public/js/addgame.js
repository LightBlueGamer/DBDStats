function setPerks() {
    fetch("http://135.125.188.15:3000/api/v1/perks", {
        method: "GET",
        redirect: "follow",
    })
        .then((response) => response.text())
        .then((result) => {
            const perks = JSON.parse(result);

            const p1 = document.getElementById("perk1");
            const p2 = document.getElementById("perk2");
            const p3 = document.getElementById("perk3");
            const p4 = document.getElementById("perk4");

            perks.forEach((perkName) => {
                const perk = document.createElement("option");
                perk.value = perkName;
                perk.innerHTML = perkName;
                p1.appendChild(perk);
            });
            perks.forEach((perkName) => {
                const perk = document.createElement("option");
                perk.value = perkName;
                perk.innerHTML = perkName;
                p2.appendChild(perk);
            });
            perks.forEach((perkName) => {
                const perk = document.createElement("option");
                perk.value = perkName;
                perk.innerHTML = perkName;
                p3.appendChild(perk);
            });
            perks.forEach((perkName) => {
                const perk = document.createElement("option");
                perk.value = perkName;
                perk.innerHTML = perkName;
                p4.appendChild(perk);
            });
        })
        .catch((error) => console.log("error", error));
}

setPerks();

function addgame() {
    const code = document.getElementById("password").value;
    const killer = document.getElementById("killers").value;
    const perk1 = document.getElementById("perk1").value;
    const perk2 = document.getElementById("perk2").value;
    const perk3 = document.getElementById("perk3").value;
    const perk4 = document.getElementById("perk4").value;
    const region = document.getElementById("region").value;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", code);
    myHeaders.append("Killer", killer);
    myHeaders.append("Perk1", perk1);
    myHeaders.append("Perk2", perk2);
    myHeaders.append("Perk3", perk3);
    myHeaders.append("Perk4", perk4);
    myHeaders.append("Region", region);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
    };

    fetch("http://135.125.188.15:3000/api/v1/killer", requestOptions)
        .then((response) => {
            if (response.status != 200) return window.alert("Error, your code might be wrong!");
            else return response.text();
        })
        .then((result) => {
            if (result !== undefined) window.alert("Successfully added killer to stats!");
        })
        .catch((error) => console.log("error", error));
}

function changestat() {
    const code = document.getElementById("password").value;
    const killer = document.getElementById("killers").value;
    const perk1 = document.getElementById("perk1").value;
    const perk2 = document.getElementById("perk2").value;
    const perk3 = document.getElementById("perk3").value;
    const perk4 = document.getElementById("perk4").value;
    const pos = document.getElementById("pos").value;
    const region = document.getElementById("region").value;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", code);
    myHeaders.append("Killer", killer);
    myHeaders.append("Perk1", perk1);
    myHeaders.append("Perk2", perk2);
    myHeaders.append("Perk3", perk3);
    myHeaders.append("Perk4", perk4);
    myHeaders.append("Pos", pos - 1);
    myHeaders.append("Region", region);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
    };

    fetch("http://135.125.188.15:3000/api/v1/ukiller", requestOptions)
        .then((response) => {
            if (response.status != 200) {
                console.log(response);
                return window.alert("Error, your code might be wrong!");
            } else return response.text();
        })
        .then((result) => {
            if (result !== undefined) window.alert("Successfully updated killer stats!");
        })
        .catch((error) => console.log("error", error));
}
