let seeds = 0;
let clickPower = 1;
let clickPowerCost = 100;
const delay = ms => new Promise(res => setTimeout(res, ms));

async function createButtons() {
    document.getElementById("seed").addEventListener("click", () => addSeed());
    document.getElementById("clickPowa").addEventListener("click", () => upgradeClick());
}

function upgradeClick() {
    let newCost = clickPowerCost;
    let clickLvl = parseInt(localStorage.getItem("clickLevel"));
    for (let i = 1; i < clickLvl; i++) {
        newCost = newCost * 3.5;
    }
    if (newCost <= seeds) {
        seeds = seeds - newCost;
        localStorage.setItem("clickLevel", clickLvl + 1);
        localStorage.setItem("clickPower", parseInt(localStorage.getItem("clickPower") * 2));
        clickPower = parseInt(localStorage.getItem("clickPower"));
        updateSeedCount();
    }
}

function initializeData() {
    createButtons();
    if (isNaN(parseInt(localStorage.getItem("clickPower")))) {
        localStorage.setItem("clickPower", 1);
        localStorage.setItem("seeds", 0);
        localStorage.setItem("clickLevel", 1);
    } else {
        seeds = parseInt(localStorage.getItem("seeds"));
        clickPower = parseInt(localStorage.getItem("clickPower"));
        document.getElementById("total").textContent = `Seeds: ${seeds}`;

    }
}

function addSeed() {
    seeds = seeds + clickPower;
    updateSeedCount();

}

let total = document.getElementById("total")

async function updateSeedCount() {
    total.textContent = `Seeds: ${seeds}`;
}

async function saveData() {
    await delay(1200);
    localStorage.setItem("seeds", seeds);
    localStorage.setItem("clickPower", clickPower);
    saveData();
}


document.addEventListener("DOMContentLoaded", () => {
    initializeData();
    saveData();

});
