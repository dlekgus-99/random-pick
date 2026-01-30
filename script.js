const DEFAULT_NAMES = ["ㄷㅎ", "ㅁㄱ"];

function getNamesFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("names");
  if (!raw) return null;

  const names = raw
    .split(",")
    .map(s => decodeURIComponent(s).trim())
    .filter(Boolean);

  return names.length ? names : null;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function rollPick(names) {
  const resultEl = document.getElementById("result");
  const btn = document.getElementById("pickBtn");

  btn.disabled = true;

  const endAt = Date.now() + 800;
  while (Date.now() < endAt) {
    resultEl.textContent = pickRandom(names);
    await sleep(60);
  }

  resultEl.textContent = pickRandom(names);
  btn.disabled = false;
}

const names = getNamesFromQuery() || DEFAULT_NAMES;

document.getElementById("pickBtn").addEventListener("click", () => rollPick(names));

const subEl = document.getElementById("sub");
subEl.textContent = `현재 명단: ${names.join(", ")}`;
