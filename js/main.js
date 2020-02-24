const rat = document.querySelectorAll(".rat_game");
const soil = document.querySelectorAll(".soil_game");
const skor = document.querySelector(".skor_game");
const img = document.querySelector("img");

let finish;
let skorGame;
let soilBefore;

randomSoil = soil => {
  const s = Math.floor(Math.random() * soil.length);
  const sRandom = soil[s];

  if (sRandom === soilBefore) {
    randomSoil(soil);
  }
  soilBefore = sRandom;
  return sRandom;
};

randomTime = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

startRat = () => {
  const sRandom = randomSoil(soil);
  const tRandom = randomTime(300, 1000);
  sRandom.classList.add("start");

  setTimeout(() => {
    sRandom.classList.remove("start");
    if (!finish) {
      startRat();
    }
  }, tRandom);
};

startGame = () => {
  finish = false;
  skorGame = 0;
  skorGame.textContent = 0;

  startRat();
  setTimeout(() => {
    finish = true;
  }, 10000);
};

hitRat = e => {
  if (!e.isTrusted) {
    return;
  }
  skorGame++;
  skor.textContent = skorGame;
};

rat.forEach(s => {
  s.addEventListener("click", hitRat);
});

// DARK MODE

const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);
