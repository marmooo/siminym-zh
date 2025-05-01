import { createDbWorker } from "../node_modules/sql.js-httpvfs/dist/index.js";

function loadConfig() {
  if (localStorage.getItem("darkMode") == 1) {
    document.documentElement.setAttribute("data-bs-theme", "dark");
  }
}

function toggleDarkMode() {
  if (localStorage.getItem("darkMode") == 1) {
    localStorage.setItem("darkMode", 0);
    document.documentElement.setAttribute("data-bs-theme", "light");
  } else {
    localStorage.setItem("darkMode", 1);
    document.documentElement.setAttribute("data-bs-theme", "dark");
  }
}

function changeLang() {
  const langSelect = document.getElementById("lang");
  const lang = langSelect.options[langSelect.selectedIndex].value;
  location.href = `https://marmooo.github.io/siminym-${lang}/`;
}

function search() {
  const word = document.getElementById("searchText").value;
  searchSiminyms(word, 2000);
  searchSiminyms(word, 5000);
  searchSiminyms(word, 20000);
  searchSiminyms(word, 50000);
}

async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
  alert("复制到剪贴板中。");
}

async function searchSiminyms(lemma, n) {
  const loading = document.getElementById("loading");
  loading.classList.remove("d-none");
  const obj = document.getElementById(`siminyms-${n}`);
  const row = await dbWorkers[n].searchLemma.getAsObject([lemma]);
  while (obj.firstChild) {
    obj.removeChild(obj.firstChild);
  }
  if (row.words) {
    const words = JSON.parse(row.words);
    for (const word of words) {
      const [lemma, _similarity] = word;
      const button = document.createElement("button");
      button.className = "btn btn-outline-secondary m-1";
      button.textContent = lemma;
      button.type = "button";
      button.onclick = () => {
        copyToClipboard(button.textContent);
      };
      obj.appendChild(button);
    }
  }
  loading.classList.add("d-none");
}

async function loadDBWorker(n) {
  const config = {
    from: "jsonconfig",
    configUrl: `/siminym-zh/db/${n}/config.json`,
  };
  dbWorkers[n] = await createDbWorker(
    [config],
    "/siminym-zh/sql.js-httpvfs/sqlite.worker.js",
    "/siminym-zh/sql.js-httpvfs/sql-wasm.wasm",
  );
  dbWorkers[n].searchLemma = await dbWorkers[n].db.prepare(
    "SELECT words FROM siminyms WHERE lemma=?",
  );
}

async function loadDBWorkers() {
  const loading = document.getElementById("loading");
  loading.classList.remove("d-none");
  const sizes = [2000, 5000, 20000, 50000];
  const promises = sizes.map(loadDBWorker);
  await Promise.all(promises);
  loading.classList.add("d-none");
}

const dbWorkers = {};
loadConfig();
loadDBWorkers();

document.addEventListener("keydown", (event) => {
  if (event.key == "Enter") search();
});
document.getElementById("toggleDarkMode").onclick = toggleDarkMode;
document.getElementById("lang").onchange = changeLang;
document.getElementById("search").onclick = search;
