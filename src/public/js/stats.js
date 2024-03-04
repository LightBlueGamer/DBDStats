async function start() {

}

start();

async function getStats() {
    fetch("/api/v1/killers", {
        method: "GET",
        redirect: "follow",
    })
    .then((response) => response.text())
    .then((result) => {
        let stats = JSON.parse(result);
        const filter = document.getElementById("filter").value;
        const filterType = document.getElementById("type").value;
        const filteredName = document.getElementById("filteredName");

        if(filterType === "killer") {

        } else if(filterType === "perk") {

        } else if(filterType === "map") {

        }
    })
}