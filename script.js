let points = 0;

const dieux = {
  Jupiter: {
    nom: "Jupiter",
    effet: "Limite les autres dieux à son niveau",
    type: "special",
    niveau: 1,
    couts: [0, 50, 500, 5000, 50000],
    visible: true,
    description: "Jupiter est le roi des dieux, maître du ciel et de la foudre. Il veille à l'équilibre du panthéon.",
  },
  Ceres: {
    nom: "Cérès",
    effet: "Augmente les gains à chaque clic",
    type: "clic",
    base: 1,
    niveau: 0,
    couts: [20, 40, 80, 160, 320],
    visible: false,
    description: "Cérès, déesse de l’agriculture et des moissons, bénit chaque récolte et augmente les gains à chaque clic.",
  },
  Bacchus: {
    nom: "Bacchus",
    effet: "Ajoute plus de points par clic",
    type: "clic",
    base: 2,
    niveau: 0,
    couts: [40, 80, 160, 320, 640],
    visible: false,
    description: "Bacchus, dieu du vin et de la fête, insuffle l’abondance et la joie, rendant chaque action encore plus fructueuse.",
    condition: () => dieux["Ceres"].niveau >= 2,
  },
  Faunus: {
    nom: "Faunus",
    effet: "Ajoute encore plus de points par clic",
    type: "clic",
    base: 4,
    niveau: 0,
    couts: [80, 160, 320, 640, 1280],
    visible: false,
    description: "Faunus, dieu des forêts et de la fertilité, fait prospérer la nature et démultiplie les récompenses de chaque clic.",
    condition: () => dieux["Bacchus"].niveau >= 2,
  },
  Venus: {
    nom: "Vénus",
    effet: "Génère des points automatiquement",
    type: "auto",
    base: 1,
    niveau: 0,
    couts: [40, 80, 160, 320, 640],
    visible: true,
    description: "Vénus, déesse de l’amour et de la beauté, attire la prospérité et fait croître les richesses sans effort.",
  },
  Neptune: {
    nom: "Neptune",
    effet: "Génère encore plus de points automatiquement",
    type: "auto",
    base: 2,
    niveau: 0,
    couts: [80, 160, 320, 640, 1280],
    visible: false,
    condition: () => dieux["Venus"].niveau >= 2,
    description: "Neptune, dieu des mers, fait déferler une vague de ressources qui s’accumulent automatiquement au fil du temps.",
  },
  Mars: {
    nom: "Mars",
    effet: "Améliore fortement la génération automatique",
    type: "auto",
    base: 4,
    niveau: 0,
    couts: [160, 320, 640, 1280, 25600],
    visible: false,
    condition: () => dieux["Neptune"].niveau >= 2,
    description: "Mars, dieu de la guerre, insuffle force et discipline à la cité, accélérant grandement la production automatique.",
  },
};



const faunusBuildings = [
  { img: "sources/buildings/FERME_FINAL-1.png.png", left: "66%", top: "0%" },
  { img: "sources/buildings/mini_roman_house_transparent-1.png.png", left: "58%", top: "0%" },
  { img: "sources/buildings/mini_roman_house_transparent-1.png.png", left: "55%", top: "0%" },
  { img: "sources/buildings/mini_roman_house_transparent-1.png.png", left: "77%", top: "60%" },
  { img: "sources/buildings/FERME_FINAL-1.png.png", left: "90%", top: "60%" },
];
const venusBuildings = [
  { img: "sources/buildings/PORT1-1.png.png", left: "47%", top: "0%" },
  { img: "sources/buildings/mini_roman_house_transparent-1.png.png", left: "88%", top: "30%" },
  { img: "sources/buildings/mini_roman_house_transparent-1.png.png", left: "80%", top: "60%" },
  { img: "sources/buildings/PORT1-1.png.png", left: "90%", top: "40%" },
  { img: "sources/buildings/BATIMENT_SUPP-1.png.png", left: "75%", top: "28%" },
];
const neptuneBuildings = [
  { img: "sources/buildings/BATEAU-1.png.png", left: "7%", top: "60%" },
  { img: "sources/buildings/PORT2-1.png.png", left: "16%", top: "24%" },
  { img: "sources/buildings/PORT3-1.png.png", left: "21%", top: "70%" },
  { img: "sources/buildings/PORT1-1.png.png", left: "15%", top: "50%" },
  { img: "sources/buildings/BATEAU-1.png.png", left: "5%", top: "42%" },
];
const marsBuildings = [
  { img: "sources/buildings/STADIUM128-1.png.png", left: "86%", top: "14%" },
  { img: "sources/buildings/CAMP_ENTRAINEMENT-1.png.png", left: "79.2%", top: "50%" },
  { img: "sources/buildings/mini_roman_house_transparent-1.png.png", left: "80%", top: "41%" },
  { img: "sources/buildings/mini_roman_house_transparent-1.png.png", left: "74%", top: "5%" },
  { img: "sources/buildings/mini_roman_house_transparent-1.png.png", left: "78%", top: "0%" },
];




function calculerPointsParClic() {
  let total = 0;
  for (const d of Object.values(dieux)) {
    if (d.type === "clic" && d.niveau > 0) {
      total += d.base * Math.pow(2, d.niveau - 1);
    }
  }
  return Math.max(1, total);
}

function calculerPointsParSeconde() {
  let total = 0;
  for (const d of Object.values(dieux)) {
    if (d.type === "auto" && d.niveau > 0) {
      total += d.base * Math.pow(2, d.niveau - 1);
    }
  }
  return total;
}

function updatePannel() {
  document.getElementById("points-par-clic").textContent = calculerPointsParClic();
  document.getElementById("points-par-seconde").textContent = calculerPointsParSeconde();
}

function updatePoints() {
  document.getElementById("points").textContent = points;
  updatePannel();
}

function afficherDieux() { //affiche les dieux dans le panneau + déblocage et level up
  const container = document.getElementById("dieuxContainer");
  container.innerHTML = "";

  for (const dieu of Object.values(dieux)) {
    const disponible = !dieu.condition || dieu.condition();
    dieu.visible = disponible;

    const div = document.createElement("div");
    div.className = "dieu";
    if (!disponible) div.style.opacity = "0.5";

    const header = document.createElement("div");
    header.className = "dieu-header";

    const img = document.createElement("img");
    img.className = "dieu-avatar";
    img.src = `sources/gods/${dieu.nom.replace(/[éèêë]/g, "e")}.png`;
    img.alt = dieu.nom;
    header.appendChild(img);

    const titre = document.createElement("strong");
    titre.textContent = `${dieu.nom} (lvl ${dieu.niveau})`;
    header.appendChild(titre);

    div.appendChild(header);

    const desc = document.createElement("p");
    desc.textContent = dieu.effet;
    div.appendChild(desc);

    const estJupiter = dieu.nom === "Jupiter";
    const niveauMax = estJupiter ? 5 : dieux["Jupiter"].niveau;

    if (dieu.niveau < 5 && dieu.niveau < niveauMax + (estJupiter ? 1 : 0)) {
      const prochainNiveau = dieu.niveau;
      const cout = dieu.couts[prochainNiveau];
      const btn = document.createElement("button");

      if (disponible) {
        btn.textContent = dieu.niveau === 0
          ? `🗝️ Débloquer pour ${cout} points`
          : `⬆ Améliorer pour ${cout} points`;
        btn.onclick = () => {
          if (points >= cout) {
            points -= cout;
            dieu.niveau++;
            updatePoints();
            afficherDieux();
            updatePannel();
          }
        };
      } else {
        btn.textContent = `🔒 Indisponible`;
      }

      div.appendChild(btn);
    }

    container.appendChild(div);
  } // fait spawn les batiments/champs pour chaque dieu 
  afficherChamps("ble-fields", dieux["Ceres"].niveau, "sources/buildings/BLE_FINAL-2.png.png", "ble-champ", "Champ de blé");
  afficherChamps("vigne-fields", dieux["Bacchus"].niveau, "sources/buildings/VIGNES_FINAL-2.png.png", "vigne-champ", "Champ de vigne");
  afficherBatiments("venus-buildings", venusBuildings, dieux["Venus"].niveau, "venus-batiment", "Bâtiment de Vénus");
  afficherBatiments("neptune-buildings", neptuneBuildings, dieux["Neptune"].niveau, "neptune-batiment", "Bâtiment de Neptune");
  afficherBatiments("faunus-buildings", faunusBuildings, dieux["Faunus"].niveau, "faunus-batiment", "Bâtiment de Faunus");
  afficherBatiments("mars-buildings", marsBuildings, dieux["Mars"].niveau, "mars-batiment", "Bâtiment de Mars");
  updatePannel();
}

function afficherChamps(containerId, nb, imgSrc, className, alt) {//utilisé pour afficher blé et vigne (ceres et bacchus)
  const champsContainer = document.getElementById(containerId);
  champsContainer.innerHTML = "";
  for (let i = 0; i < nb; i++) {
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = alt;
    img.className = className;
    champsContainer.appendChild(img);
  }
}

function afficherBatiments(containerId, buildings, niveau, className, alt) {// affiche les batiments de venus, neptune, faunus et mars
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  for (let i = 0; i < niveau; i++) {
    const conf = buildings[i];
    if (!conf) continue;
    const img = document.createElement("img");
    img.src = conf.img;
    img.alt = alt;
    img.className = className;
    img.style.left = conf.left;
    img.style.top = conf.top;
    container.appendChild(img);
  }
}

function afficherInfoDieux() { //affiche l'historique des dieux dans la page info historique
  const container = document.getElementById("historique-dieux-list");
  if (!container) return;
  container.innerHTML = "";

  Object.values(dieux).forEach(dieu => {
    const div = document.createElement("div");
    div.className = "dieu-historique";

    const ligneHaut = document.createElement("div");
    ligneHaut.className = "dieu-historique-ligne-haut";

    const img = document.createElement("img");
    img.src = `sources/gods/${dieu.nom.replace(/[éèêë]/g, "e")}.png`;
    img.alt = dieu.nom;

    const nom = document.createElement("div");
    nom.className = "dieu-historique-nom";
    nom.textContent = dieu.nom;

    ligneHaut.appendChild(img);
    ligneHaut.appendChild(nom);

    const desc = document.createElement("div");
    desc.className = "dieu-historique-desc";
    desc.textContent = dieu.description || dieu.effet;

    div.appendChild(ligneHaut);
    div.appendChild(desc);
    container.appendChild(div);
  });
}

function spawnParticles(x, y) {// effet particule si clic sur le temple ou sur un dieu
  const count = 15;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.position = "fixed";
    const angle = Math.random() * 2 * Math.PI;
    const distance = 40 + Math.random() * 20;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    p.style.setProperty("--dx", `${dx}px`);
    p.style.setProperty("--dy", `${dy}px`);
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    const size = 4 + Math.random() * 6;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.background = `hsl(${50 + Math.random() * 40}, 70%, 60%)`;
    p.style.zIndex = 9999;
    document.body.appendChild(p);
    p.addEventListener("animationend", () => p.remove());
  }
}

document.addEventListener("mousedown", function(e) {
  if (e.target.matches(".dieu button")) {
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    spawnParticles(x, y);
  }
});

document.getElementById("click-area").addEventListener("click", (e) => {
  points += calculerPointsParClic();
  updatePoints();
  afficherDieux();
  spawnParticles(e.clientX, e.clientY);
  updatePannel();
});

setInterval(() => {
  points += calculerPointsParSeconde();
  updatePoints();
  afficherDieux();
  updatePannel();
}, 1000);


let bouttonInfoHistorique = document.getElementById("bouttonInfoHistorique");
let pageInfoHistorique = document.getElementById("pageInfoHistorique");

function afficherPageInfo() {
  pageInfoHistorique.style.visibility = "visible";
  bouttonInfoHistorique.style.visibility = "hidden";
  afficherInfoDieux();
}

function fermerPageInfo() {
  pageInfoHistorique.style.visibility = "hidden";
  bouttonInfoHistorique.style.visibility = "visible";
}

bouttonInfoHistorique.addEventListener("click", afficherPageInfo);
pageInfoHistorique.addEventListener("click", fermerPageInfo);

function afficherIntro() {
  const overlay = document.getElementById('intro-overlay');
  overlay.style.display = 'flex';
  document.getElementById('intro-continue').onclick = function() {
    overlay.style.display = 'none';
  };
}

window.addEventListener('DOMContentLoaded', afficherIntro);

updatePoints();