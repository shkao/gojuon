/* App 邏輯:導覽、五十音表(熱力圖)、詳情卡、翻卡、配對、練功(SRS+速答)、測驗、發音 */
const ALL = [...KANA, ...DAKUON, ...HANDAKUON, ...YOON];
const byKey = Object.fromEntries(ALL.map(k => [k.romaji, k]));

/* ===================== 熟練度紀錄 (Leitner) ===================== */
let M = {};
try { M = JSON.parse(localStorage.getItem("gojuon-mastery") || "{}"); } catch (e) { M = {}; }
const saveM = () => localStorage.setItem("gojuon-mastery", JSON.stringify(M));
const rec = r => M[r] || (M[r] = { box: 0, due: 0, seen: 0, hit: 0, rt: null });
const INTERVAL_DAYS = [0, 1, 2, 4, 7, 14];
function grade(r, ok, ms) {
  const m = rec(r);
  m.seen++; if (ok) m.hit++;
  if (ms != null && ok) m.rt = m.rt == null ? ms : Math.round(m.rt * .7 + ms * .3);
  m.box = ok ? Math.min(5, m.box + 1) : 0;
  m.due = Date.now() + INTERVAL_DAYS[m.box] * 864e5;
  saveM();
}
function level(r) {
  const m = M[r];
  if (!m || !m.seen) return 0;
  if (m.box >= 5 && m.rt != null && m.rt < 1500) return 4; // 秒答
  if (m.box >= 4) return 3;
  if (m.box >= 2) return 2;
  return 1;
}

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
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ja-JP";
  if (jaVoice) u.voice = jaVoice;
  u.rate = rate;
  speechSynthesis.speak(u);
}
$("spkTest").addEventListener("click", () => speak("あいうえお"));

const mnemoHTML = k => k.mnemonic ? `<div class="mnemo"><span class="seal">訣</span><span>${k.mnemonic}</span></div>` : "";

/* ===================== 分頁切換 ===================== */
document.querySelectorAll(".tabbar button").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".tabbar button").forEach(x => x.classList.toggle("active", x === b));
  document.querySelectorAll(".panel").forEach(p => p.classList.toggle("active", p.id === b.dataset.panel));
  if (b.dataset.panel === "table") renderTable();   // 重畫熱力圖
  if (b.dataset.panel === "train") renderTrainStart();
  window.scrollTo({ top: 0 });
}));

/* ===================== 五十音表 ===================== */
const ROWS_SEION = [
  ["あ行", ["a", "i", "u", "e", "o"]],
  ["か行", ["ka", "ki", "ku", "ke", "ko"]],
  ["さ行", ["sa", "shi", "su", "se", "so"]],
  ["た行", ["ta", "chi", "tsu", "te", "to"]],
  ["な行", ["na", "ni", "nu", "ne", "no"]],
  ["は行", ["ha", "hi", "fu", "he", "ho"]],
  ["ま行", ["ma", "mi", "mu", "me", "mo"]],
  ["や行", ["ya", null, "yu", null, "yo"]],
  ["ら行", ["ra", "ri", "ru", "re", "ro"]],
  ["わ行", ["wa", null, null, null, "wo"]],
  ["撥音", ["n", null, null, null, null]]
];
let showKata = false, curSet = "seion";
function makeCell(k) {
  const cell = document.createElement("div");
  cell.className = "cell";
  const lv = level(k.romaji);
  cell.innerHTML = `<div class="k">${showKata ? k.katakana : k.hiragana}</div><div class="r">${k.romaji}</div>` +
    (lv ? `<div class="lv lv-${lv}"></div>` : "");
  cell.addEventListener("click", () => openSheet(k));
  return cell;
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
        if (!r) { const b = document.createElement("div"); b.className = "cell blank"; grid.appendChild(b); continue; }
        grid.appendChild(makeCell(byRomaji[r]));
      }
    }
  } else {
    grid.className = curSet === "yoon" ? "kgrid c3" : "kgrid c5";
    for (const k of SETS[curSet].list) grid.appendChild(makeCell(k));
  }
  area.appendChild(grid);
}
document.querySelectorAll("#setChips button").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll("#setChips button").forEach(x => x.classList.toggle("on", x === b));
  curSet = b.dataset.set;
  renderTable();
}));
$("hiraBtn").addEventListener("click", function () {
  showKata = false; this.classList.add("on"); $("kataBtn").classList.remove("on"); renderTable();
});
$("kataBtn").addEventListener("click", function () {
  showKata = true; this.classList.add("on"); $("hiraBtn").classList.remove("on"); renderTable();
});
renderTable();

/* ===================== 詳情彈出卡 ===================== */
function openSheet(k) {
  const body = $("sheetBody");
  if (!k.derived) {
    body.innerHTML = `
      <div class="row1">
        <div class="evolve"><div class="src">${k.hiraSource}</div><div class="arrow">➜</div><div class="dst">${k.hiragana}</div></div>
        <div class="evolve"><div class="src">${k.kataSource}</div><div class="arrow">➜</div><div class="dst">${k.katakana}</div></div>
        <button class="play-btn" data-say="${k.hiragana}">🔊 ${k.romaji}</button>
      </div>
      ${mnemoHTML(k)}
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
    $("flashMnemo").innerHTML = mnemoHTML(k);
    $("flashNote").innerHTML = `平假名 ← ${k.hiraSource}(草書);片假名 ← ${k.kataSource}`;
  } else {
    const b = byRomaji[k.base];
    $("flashKanji").textContent = `${b ? b.hiragana : ""} + ${k.mark}`;
    $("flashMnemo").innerHTML = "";
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
    if (mDone === mTotal) $("matchWin").textContent = `全部配對成功!共用了 ${mMoves} 步`;
  } else {
    mLock = true;
    setTimeout(() => { a.classList.remove("open"); b.classList.remove("open"); mOpen = []; mLock = false; }, 800);
  }
}
$("matchRestart").addEventListener("click", newMatch);
newMatch();

/* ===================== 練功:間隔複習 (SRS) + 限時速答 ===================== */
let trainMode = "srs";
document.querySelectorAll("#trainChips button").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll("#trainChips button").forEach(x => x.classList.toggle("on", x === b));
  trainMode = b.dataset.tm;
  renderTrainStart();
}));

function optionsFor(k, pool, field) {
  const wrong = shuffle(pool.filter(x => x !== k && x[field] !== k[field])).slice(0, 3).map(x => x[field]);
  return shuffle([k[field], ...wrong]);
}
function srsQueue() {
  const now = Date.now();
  const due = ALL.filter(k => { const m = M[k.romaji]; return m && m.seen > 0 && m.due <= now; });
  const fresh = ALL.filter(k => !M[k.romaji] || !M[k.romaji].seen).slice(0, 8);
  return shuffle(due).concat(fresh).slice(0, 20);
}
function renderTrainStart() {
  const box = $("trainBox");
  const learned = ALL.filter(k => M[k.romaji] && M[k.romaji].seen > 0);
  if (trainMode === "srs") {
    const q = srsQueue();
    const due = q.filter(k => M[k.romaji] && M[k.romaji].seen > 0).length;
    box.innerHTML = `
      <h2 style="margin-bottom:10px">間隔複習</h2>
      <div class="train-stats">
        <div class="ts"><b>${learned.length}</b><span>已學 / ${ALL.length}</span></div>
        <div class="ts"><b>${due}</b><span>到期待複習</span></div>
        <div class="ts"><b>${q.length - due}</b><span>本輪新字</span></div>
      </div>
      ${q.length ? `<button class="btn primary" id="srsGo">開始複習(${q.length} 張)</button>`
                 : `<p style="color:#6b6357">目前沒有到期的卡片,明天再來,或先去「限時速答」練反應!</p>`}`;
    const go = $("srsGo");
    if (go) go.addEventListener("click", () => playSRS(q));
  } else {
    const rts = learned.map(k => M[k.romaji].rt).filter(Boolean);
    const avg = rts.length ? Math.round(rts.reduce((a, b) => a + b) / rts.length) : null;
    box.innerHTML = `
      <h2 style="margin-bottom:10px">限時速答</h2>
      <p style="color:#6b6357;font-size:.9rem">60 秒,看到假名立刻選出讀音。<br>答得越慢、錯得越多的字,出現越頻繁。</p>
      <div class="train-stats">
        <div class="ts"><b>${avg ? avg + "ms" : "—"}</b><span>平均反應</span></div>
        <div class="ts"><b>${localStorage.getItem("gojuon-drill-best") ?? "—"}</b><span>最佳題數</span></div>
      </div>
      <button class="btn primary" id="drillGo">開始 60 秒</button>`;
    $("drillGo").addEventListener("click", playDrill);
  }
}

/* --- SRS 複習回合 --- */
function playSRS(queue) {
  const box = $("trainBox");
  let i = 0, good = 0;
  function next() {
    if (i >= queue.length) {
      box.innerHTML = `
        <h2>複習完成!</h2>
        <div class="quiz-result"><div class="score">${good} / ${queue.length}</div></div>
        <p style="color:#6b6357;font-size:.9rem">答對的卡片晉級,間隔拉長;答錯的歸零,明天再考你一次。</p>
        <br><button class="btn primary" id="srsBack">回到練功</button>`;
      $("srsBack").addEventListener("click", renderTrainStart);
      return;
    }
    const k = queue[i];
    const m = M[k.romaji];
    const useKata = m && m.box >= 2 && Math.random() < .5;
    const shown = useKata ? k.katakana : k.hiragana;
    const opts = optionsFor(k, ALL, "romaji");
    box.innerHTML = `
      <div class="quiz-meta"><span>${i + 1} / ${queue.length}</span><span>${m && m.seen ? "複習 第" + (m.box + 1) + "級" : "新字"}</span></div>
      <div class="quiz-q">這個${useKata ? "片" : "平"}假名怎麼唸?</div>
      <div class="quiz-big">${shown}</div>
      <div class="quiz-opts">${opts.map(o => `<button data-o="${o}">${o}</button>`).join("")}</div>
      <div class="quiz-fb" id="srsFb"></div>`;
    let answered = false;
    box.querySelectorAll(".quiz-opts button").forEach(btn => btn.addEventListener("click", () => {
      if (answered) return;
      answered = true;
      const ok = btn.dataset.o === k.romaji;
      grade(k.romaji, ok);
      if (ok) { good++; btn.classList.add("right"); }
      else {
        btn.classList.add("wrong");
        box.querySelector(`[data-o="${k.romaji}"]`).classList.add("right");
        $("srsFb").innerHTML = mnemoHTML(k) || `<div class="mnemo"><span class="seal">記</span><span>${k.note || ""}</span></div>`;
      }
      speak(k.hiragana);
      i++;
      setTimeout(next, ok ? 900 : 2600);
    }));
  }
  next();
}

/* --- 限時速答回合 --- */
function drillWeight(k) {
  const m = M[k.romaji];
  if (!m || !m.seen) return 4;
  let w = (6 - m.box) * 1.5;
  if (m.rt != null && m.rt > 1800) w += 3;
  return Math.max(1, w);
}
function pickWeighted(pool, exclude) {
  const cand = pool.filter(k => k !== exclude);
  const total = cand.reduce((s, k) => s + drillWeight(k), 0);
  let x = Math.random() * total;
  for (const k of cand) { x -= drillWeight(k); if (x <= 0) return k; }
  return cand[cand.length - 1];
}
function playDrill() {
  const box = $("trainBox");
  const learnedExtra = ALL.filter(k => k.derived && M[k.romaji] && M[k.romaji].seen > 0);
  const pool = [...KANA, ...learnedExtra];
  const DURATION = 60000;
  const t0 = Date.now();
  let score = 0, total = 0, last = null, ended = false;
  const roundRT = [];
  const timer = setInterval(() => {
    const left = DURATION - (Date.now() - t0);
    const bar = $("drillBar");
    if (bar) {
      bar.style.width = Math.max(0, left / DURATION * 100) + "%";
      bar.classList.toggle("low", left < 10000);
    }
    if (left <= 0) finish();
  }, 200);
  function finish() {
    if (ended) return;
    ended = true;
    clearInterval(timer);
    const best = Number(localStorage.getItem("gojuon-drill-best") ?? -1);
    if (score > best) localStorage.setItem("gojuon-drill-best", score);
    const slow = roundRT.filter(x => x.ok).sort((a, b) => b.ms - a.ms).slice(0, 3);
    const wrong = roundRT.filter(x => !x.ok).slice(0, 3);
    const avg = roundRT.length ? Math.round(roundRT.reduce((s, x) => s + x.ms, 0) / roundRT.length) : 0;
    box.innerHTML = `
      <h2>時間到!</h2>
      <div class="quiz-result"><div class="score">${score} 題</div></div>
      <p style="color:#6b6357;font-size:.9rem">共作答 ${total} 題,平均反應 ${avg}ms</p>
      ${(wrong.length || slow.length) ? `<div class="weak-list">
        ${wrong.map(x => `<div class="wk"><span class="kk">${x.k.hiragana}</span><span>答錯了——${x.k.mnemonic || x.k.note || ""}</span></div>`).join("")}
        ${slow.map(x => `<div class="wk"><span class="kk">${x.k.hiragana}</span><span>${x.k.romaji}</span><span class="rt">${x.ms}ms</span></div>`).join("")}
      </div>` : ""}
      <br><button class="btn primary" id="drillAgain">再來 60 秒</button>
      <button class="btn" id="drillBack">回到練功</button>`;
    $("drillAgain").addEventListener("click", playDrill);
    $("drillBack").addEventListener("click", renderTrainStart);
  }
  function next() {
    if (ended) return;
    const k = pickWeighted(pool, last);
    last = k;
    const m = M[k.romaji];
    const useKata = m && m.box >= 3 && Math.random() < .4;
    const shown = useKata ? k.katakana : k.hiragana;
    const opts = optionsFor(k, pool, "romaji");
    box.innerHTML = `
      <div class="timer-track"><div class="timer-bar" id="drillBar" style="width:100%"></div></div>
      <div class="quiz-meta"><span>答對 ${score}</span><span>第 ${total + 1} 題</span></div>
      <div class="quiz-big">${shown}</div>
      <div class="quiz-opts">${opts.map(o => `<button data-o="${o}">${o}</button>`).join("")}</div>
      <div class="drill-fb"></div>`;
    const shownAt = Date.now();
    let answered = false;
    box.querySelectorAll(".quiz-opts button").forEach(btn => btn.addEventListener("click", () => {
      if (answered || ended) return;
      answered = true;
      const ms = Date.now() - shownAt;
      const ok = btn.dataset.o === k.romaji;
      total++;
      if (ok) score++;
      roundRT.push({ k, ok, ms });
      grade(k.romaji, ok, ms);
      btn.classList.add(ok ? "right" : "wrong");
      if (!ok) box.querySelector(`[data-o="${k.romaji}"]`).classList.add("right");
      setTimeout(next, ok ? 220 : 900);
    }));
  }
  next();
}
renderTrainStart();

/* ===================== 測驗 ===================== */
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
  $("quizStreak").textContent = qStreak >= 2 ? `連對 ${qStreak}` : "";
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
  grade(q.kana.romaji, ok);
  if (ok) { qScore++; qStreak++; btn.classList.add("right"); $("quizFb").textContent = "答對了!"; $("quizFb").style.color = "var(--indigo)"; }
  else {
    qStreak = 0; btn.classList.add("wrong");
    [...$("quizOpts").children].find(b => b.textContent === q.answer).classList.add("right");
    $("quizFb").innerHTML = `<span style="color:var(--verm)">正確答案是「${q.answer}」</span>` + mnemoHTML(q.kana);
  }
  if (!q.audio) speak(q.kana.hiragana);
  setTimeout(() => { qIdx++; qIdx < quiz.length ? renderQ() : endQuiz(); }, ok ? 1000 : 2400);
}
function endQuiz() {
  $("quizPlay").hidden = true; $("quizDone").hidden = false;
  $("finalScore").textContent = qScore;
  const best = Number(localStorage.getItem("gojuon-best") ?? -1);
  if (qScore > best) localStorage.setItem("gojuon-best", qScore);
  $("finalMsg").textContent =
    qScore === 10 ? "滿分!五十音真的不用靠背了!" :
    qScore >= 7 ? "很棒!去「練功」把弱的字練到秒答。" :
    "沒關係,口訣多唸幾次,再去「間隔複習」鞏固記憶。";
  loadBest();
}
$("quizGo").addEventListener("click", startQuiz);
$("quizAgain").addEventListener("click", () => { $("quizDone").hidden = true; $("quizStart").hidden = false; });
loadBest();
