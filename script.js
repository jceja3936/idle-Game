let seeds = 0;
let clickPower = 1;
const delay = ms => new Promise(res => setTimeout(res, ms));

function createSeedButton() {
    document.getElementById("seed").addEventListener("click", () => addSeed());
}

function initializeData() {
    createSeedButton();
    if (localStorage.getItem("clickPower") == null) {
        localStorage.setItem("clickPower", 1);
        localStorage.setItem("seeds", 0);
    } else {
        seeds = parseInt(localStorage.getItem("seeds"));
        clickPower = parseInt(localStorage.getItem("clickPower"));
        document.getElementById("total").textContent = `Seeds: ${seeds}`;

    }
}

function addSeed() {

    seeds = seeds + clickPower;

    document.getElementById("total").textContent = `Seeds: ${seeds}`;
}

async function saveData() {
    await delay(500);
    localStorage.setItem("seeds", seeds);
    localStorage.setItem("clickPower", clickPower);
    saveData();
}


document.addEventListener("DOMContentLoaded", () => {
    initializeData();
    saveData();

});
