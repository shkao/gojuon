/* App 邏輯:導覽、五十音表、詳情卡、翻卡、配對、測驗、發音 */
/* ===================== 發音 (Web Speech API) ===================== */
let jaVoice = null;
function pickVoice() {
  const vs = speechSynthesis.getVoices().filter(v => v.lang.startsWith("ja"));
  jaVoice = vs.find(v => /Kyoko|O-?Ren|Otoya|Google/i.test(v.name)) || vs[0] || null;
}
if ("speechSynthesis" in window) {
  pickVoice();
  speechSynthesis.onvoiceschanged = pickVoice;
}
function speak(text, rate = 0.85) {
  if (!("speechSynthesis" in window)) { alert("此瀏覽器不支援語音播放"); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ja-JP";
  if (jaVoice) u.voice = jaVoice;
  u.rate = rate;
  speechSynthesis.speak(u);
}
$("spkTest").addEventListener("click", () => speak("あいうえお"));

/* ===================== 分頁切換 ===================== */
document.querySelectorAll(".tabbar button").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".tabbar button").forEach(x => x.classList.toggle("active", x === b));
  document.querySelectorAll(".panel").forEach(p => p.classList.toggle("active", p.id === b.dataset.panel));
  window.scrollTo({ top: 0 });
}));

/* ===================== 五十音表 ===================== */
const ROWS_SEION = [
  ["あ行", ["a","i","u","e","o"]],
  ["か行", ["ka","ki","ku","ke","ko"]],
  ["さ行", ["sa","shi","su","se","so"]],
  ["た行", ["ta","chi","tsu","te","to"]],
  ["な行", ["na","ni","nu","ne","no"]],
  ["は行", ["ha","hi","fu","he","ho"]],
  ["ま行", ["ma","mi","mu","me","mo"]],
  ["や行", ["ya",null,"yu",null,"yo"]],
  ["ら行", ["ra","ri","ru","re","ro"]],
  ["わ行", ["wa",null,null,null,"wo"]],
  ["撥音", ["n",null,null,null,null]]
];
let showKata = false, curSet = "seion";
function cellHTML(k) {
  return `<div class="k">${showKata ? k.katakana : k.hiragana}</div><div class="r">${k.romaji}</div>`;
}
function renderTable() {
  const area = $("gridArea");
  area.innerHTML = "";
  const grid = document.createElement("div");
  if (curSet === "seion") {
    grid.className = "kgrid c5";
    for (const [label, row] of ROWS_SEION) {
      const lab = document.createElement("div");
      lab.className = "row-label"; lab.textContent = label;
      grid.appendChild(lab);
      for (const r of row) {
        const cell = document.createElement("div");
        if (!r) { cell.className = "cell blank"; grid.appendChild(cell); continue; }
        const k = byRomaji[r];
        cell.className = "cell";
        cell.innerHTML = cellHTML(k);
        cell.addEventListener("click", () => openSheet(k));
        grid.appendChild(cell);
      }
    }
  } else {
    const list = SETS[curSet].list;
    grid.className = curSet === "yoon" ? "kgrid c3" : "kgrid c5";
    for (const k of list) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.innerHTML = cellHTML(k);
      cell.addEventListener("click", () => openSheet(k));
      grid.appendChild(cell);
    }
  }
  area.appendChild(grid);
}
document.querySelectorAll("#setChips button").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll("#setChips button").forEach(x => x.classList.toggle("on", x === b));
  curSet = b.dataset.set;
  renderTable();
}));
$("hiraBtn").addEventListener("click", function() {
  showKata = false; this.classList.add("on"); $("kataBtn").classList.remove("on"); renderTable();
});
$("kataBtn").addEventListener("click", function() {
  showKata = true; this.classList.add("on"); $("hiraBtn").classList.remove("on"); renderTable();
});
renderTable();

/* ===================== 詳情底部彈出卡 ===================== */
function openSheet(k) {
  const body = $("sheetBody");
  if (!k.derived) {
    body.innerHTML = `
      <div class="row1">
        <div class="evolve"><div class="src">${k.hiraSource}</div><div class="arrow">➜</div><div class="dst">${k.hiragana}</div></div>
        <div class="evolve"><div class="src">${k.kataSource}</div><div class="arrow">➜</div><div class="dst">${k.katakana}</div></div>
        <button class="play-btn" data-say="${k.hiragana}">🔊 ${k.romaji}</button>
      </div>
      <div class="note">平假名「${k.hiragana}」:${k.hiraNote}。<br>片假名「${k.katakana}」:${k.kataNote}。</div>
      <div class="examples">${k.examples.map(e =>
        `<div class="ex"><span class="jp">${e.jp}</span><span class="kana-r">${e.kana} (${e.romaji})</span><span class="zh">${e.zh}</span><button class="mini-play" data-say="${e.kana}">🔊</button></div>`).join("")}
      </div>`;
  } else {
    const b = byRomaji[k.base];
    body.innerHTML = `
      <div class="row1">
        <div class="evolve"><div class="src">${b ? b.hiragana : ""} + ${k.mark}</div><div class="arrow">➜</div><div class="dst">${k.hiragana} / ${k.katakana}</div></div>
        <button class="play-btn" data-say="${k.hiragana}">🔊 ${k.romaji}</button>
      </div>
      <div class="romaji-line">${k.romaji}</div>
      <div class="note">${k.note}</div>`;
  }
  body.querySelectorAll("[data-say]").forEach(btn =>
    btn.addEventListener("click", () => speak(btn.dataset.say)));
  $("sheet").classList.add("open");
  $("sheetBackdrop").classList.add("open");
  speak(k.hiragana);
}
function closeSheet() {
  $("sheet").classList.remove("open");
  $("sheetBackdrop").classList.remove("open");
}
$("sheetBackdrop").addEventListener("click", closeSheet);

/* ===================== 字源翻卡 ===================== */
const DECKS = {
  seion: { list: KANA, tip: "這個漢字變成了哪個假名?想一想,再點卡片翻面。" },
  dakuon: { list: [...DAKUON, ...HANDAKUON], tip: "清音加上「゛」或「゜」變成什麼音?點卡片翻面。" },
  yoon: { list: YOON, tip: "假名加上小寫的ゃゅょ怎麼唸?點卡片翻面。" }
};
let curDeck = "seion", deck = shuffle(KANA), deckIdx = 0;
const fc = $("flashcard");
function renderFlash() {
  const k = deck[deckIdx];
  fc.classList.remove("flipped");
  if (!k.derived) {
    $("flashKanji").textContent = k.hiraSource;
    $("flashNote").innerHTML = `${k.hiraNote}。<br>片假名「${k.katakana}」← ${k.kataSource}:${k.kataNote}。`;
  } else {
    const b = byRomaji[k.base];
    $("flashKanji").textContent = `${b ? b.hiragana : ""} + ${k.mark}`;
    $("flashNote").textContent = k.note;
  }
  $("flashPair").textContent = `${k.hiragana} / ${k.katakana}`;
  $("flashRomaji").textContent = k.romaji;
  $("flashProgress").textContent = `${deckIdx + 1} / ${deck.length}`;
}
fc.addEventListener("click", () => {
  fc.classList.toggle("flipped");
  if (fc.classList.contains("flipped")) speak(deck[deckIdx].hiragana);
});
$("flashNext").addEventListener("click", () => { deckIdx = (deckIdx + 1) % deck.length; renderFlash(); });
$("flashPrev").addEventListener("click", () => { deckIdx = (deckIdx - 1 + deck.length) % deck.length; renderFlash(); });
$("flashShuffle").addEventListener("click", () => { deck = shuffle(DECKS[curDeck].list); deckIdx = 0; renderFlash(); });
$("flashPlay").addEventListener("click", () => speak(deck[deckIdx].hiragana));
document.querySelectorAll("#deckChips button").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll("#deckChips button").forEach(x => x.classList.toggle("on", x === b));
  curDeck = b.dataset.deck;
  $("flashTip").textContent = DECKS[curDeck].tip;
  deck = shuffle(DECKS[curDeck].list); deckIdx = 0;
  renderFlash();
}));
renderFlash();

/* ===================== 字源配對 ===================== */
const mGrid = $("matchGrid");
let mOpen = [], mLock = false, mMoves = 0, mDone = 0, mTotal = 8;
function newMatch() {
  mOpen = []; mLock = false; mMoves = 0; mDone = 0;
  $("matchMoves").textContent = "0";
  $("matchWin").textContent = "";
  const picks = shuffle(KANA).slice(0, mTotal);
  const cards = shuffle(picks.flatMap(k => [
    { id: k.romaji, label: k.hiraSource, tag: "字源" },
    { id: k.romaji, label: k.hiragana, tag: "假名" }
  ]));
  mGrid.innerHTML = "";
  cards.forEach(c => {
    const el = document.createElement("div");
    el.className = "mcard";
    el.innerHTML = `<span class="tag">${c.tag}</span>${c.label}`;
    el.dataset.id = c.id;
    el.addEventListener("click", () => flipCard(el));
    mGrid.appendChild(el);
  });
}
function flipCard(el) {
  if (mLock || el.classList.contains("open") || el.classList.contains("done")) return;
  el.classList.add("open");
  mOpen.push(el);
  if (mOpen.length < 2) return;
  mMoves++;
  $("matchMoves").textContent = mMoves;
  const [a, b] = mOpen;
  if (a.dataset.id === b.dataset.id) {
    a.classList.replace("open", "done"); b.classList.replace("open", "done");
    speak(byRomaji[a.dataset.id].hiragana);
    mOpen = []; mDone++;
    if (mDone === mTotal) $("matchWin").textContent = `全部配對成功!共用了 ${mMoves} 步 🎉`;
  } else {
    mLock = true;
    setTimeout(() => { a.classList.remove("open"); b.classList.remove("open"); mOpen = []; mLock = false; }, 800);
  }
}
$("matchRestart").addEventListener("click", newMatch);
newMatch();

/* ===================== 測驗 ===================== */
// 題型:big 為畫面大字;audio 題型改放播放鈕
const QTYPES = [
  { pool: "all", q: k => ({ prompt: "這個平假名怎麼唸?", big: k.hiragana, answer: k.romaji, optOf: x => x.romaji }) },
  { pool: "all", q: k => ({ prompt: "羅馬拼音對應哪個平假名?", big: k.romaji, answer: k.hiragana, optOf: x => x.hiragana }) },
  { pool: "all", q: k => ({ prompt: "這個片假名怎麼唸?", big: k.katakana, answer: k.romaji, optOf: x => x.romaji }) },
  { pool: "base", q: k => ({ prompt: `漢字「${k.hiraSource}」演變成哪個平假名?`, big: k.hiraSource, answer: k.hiragana, optOf: x => x.hiragana }) },
  { pool: "all", q: k => ({ prompt: "找出對應的片假名", big: k.hiragana, answer: k.katakana, optOf: x => x.katakana }) },
  { pool: "all", q: k => ({ prompt: "聽發音,選出正確的平假名", audio: k.hiragana, answer: k.hiragana, optOf: x => x.hiragana }) }
];
let quiz = [], qIdx = 0, qScore = 0, qStreak = 0;
function loadBest() { $("bestScore").textContent = localStorage.getItem("gojuon-best") ?? "—"; }
function quizPool() {
  let pool = [...KANA];
  if ($("rangeDakuon").checked) pool = pool.concat(DAKUON, HANDAKUON);
  if ($("rangeYoon").checked) pool = pool.concat(YOON);
  return pool;
}
function startQuiz() {
  const pool = quizPool();
  quiz = shuffle(pool).slice(0, 10).map(k => {
    const types = QTYPES.filter(t => t.pool === "all" || !k.derived);
    const t = types[Math.floor(Math.random() * types.length)].q(k);
    const wrong = shuffle(pool.filter(x => x !== k && t.optOf(x) !== t.optOf(k))).slice(0, 3).map(t.optOf);
    return { ...t, kana: k, options: shuffle([t.answer, ...wrong]) };
  });
  qIdx = 0; qScore = 0; qStreak = 0;
  $("quizStart").hidden = true; $("quizDone").hidden = true; $("quizPlay").hidden = false;
  renderQ();
}
function renderQ() {
  const q = quiz[qIdx];
  $("quizNum").textContent = qIdx + 1;
  $("quizStreak").textContent = qStreak >= 2 ? `🔥 連對 ${qStreak}` : "";
  $("quizQ").textContent = q.prompt;
  const big = $("quizBig");
  if (q.audio) {
    big.innerHTML = `<button class="hear">🔊</button>`;
    big.querySelector(".hear").addEventListener("click", () => speak(q.audio));
    speak(q.audio);
  } else {
    big.textContent = q.big;
  }
  $("quizFb").textContent = "";
  const box = $("quizOpts");
  box.innerHTML = "";
  q.options.forEach(opt => {
    const b = document.createElement("button");
    b.textContent = opt;
    b.addEventListener("click", () => answer(b, opt, q));
    box.appendChild(b);
  });
}
function answer(btn, opt, q) {
  if (q.answered) return;
  q.answered = true;
  const ok = opt === q.answer;
  if (ok) { qScore++; qStreak++; btn.classList.add("right"); $("quizFb").textContent = "答對了!"; $("quizFb").style.color = "var(--teal)"; }
  else {
    qStreak = 0; btn.classList.add("wrong");
    [...$("quizOpts").children].find(b => b.textContent === q.answer).classList.add("right");
    $("quizFb").textContent = `正確答案是「${q.answer}」`; $("quizFb").style.color = "var(--red)";
  }
  if (!q.audio) speak(q.kana.hiragana);
  setTimeout(() => { qIdx++; qIdx < quiz.length ? renderQ() : endQuiz(); }, 1000);
}
function endQuiz() {
  $("quizPlay").hidden = true; $("quizDone").hidden = false;
  $("finalScore").textContent = qScore;
  const best = Number(localStorage.getItem("gojuon-best") ?? -1);
  if (qScore > best) localStorage.setItem("gojuon-best", qScore);
  $("finalMsg").textContent =
    qScore === 10 ? "滿分!五十音真的不用靠背了!" :
    qScore >= 7 ? "很棒!再多翻幾次字源卡就能滿分。" :
    "沒關係,回到「字源翻卡」多看幾輪,漢字會幫你記住假名。";
  loadBest();
}
$("quizGo").addEventListener("click", startQuiz);
$("quizAgain").addEventListener("click", () => { $("quizDone").hidden = true; $("quizStart").hidden = false; });
loadBest();
