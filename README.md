# 五十音不靠背 · 學習遊戲

> 認得字源、記住口訣,假名不用死背。

A Japanese kana learning app for Traditional Chinese (zh-TW) speakers.
Every kana evolved from a Chinese character, so the app teaches recognition
through three hooks: the source kanji, a Taiwanese-flavored homophone
mnemonic, and spaced-repetition drills. Kana etymology and example words
come from the book《五十音不靠背:學過一次記得一輩子的假名課》(神奇裘莉 著).

**Live demo:** <https://shkao.github.io/gojuon/>

## 功能

- **五十音表**:清音、濁音、半濁音、拗音四套圖表,平/片假名切換。點假名展開「漢字 ➜ 假名」演變、諧音口訣、例詞與發音;熟練度以色條畫在每格上(熱力圖)。
- **諧音口訣**:每個清音一句台味諧音,一次綁住平假名、片假名、字源漢字和讀音,例如「禰豆子的禰=ね(ne)」「世界的世,台語唸 sè,直接就是 se」。
- **練功(科學記憶)**
  - *間隔複習*:Leitner 盒制間隔重複(答對升級、答錯歸零),依到期日排程,每輪混入新字。
  - *限時速答*:60 秒快答訓練「看到就反應」,記錄每個假名的反應時間,弱與慢的字加權出現。
- **字源翻卡 / 配對 / 測驗**:主動回憶翻卡、字源配對遊戲、十題混合測驗(讀音、互認、字源、聽力),成績全部回饋到同一套熟練度紀錄(localStorage)。
- **發音播放**:瀏覽器內建 Web Speech API 日語語音,免音檔、可離線。

## 視覺

清爽極簡的浮世繪風格:和紙底色、青海波(seigaiha)紋樣、藍染與朱色點綴、明朝體字型,標題是 AI 生成的浮世繪虎斑貓。

## 使用

純靜態網站,直接開 `index.html`,或:

```bash
python3 -m http.server 8000
```

手機可用 Safari「加入主畫面」全螢幕執行。發音需要系統日語語音(macOS/iOS 內建 Kyoko)。

## 專案結構

```
index.html          頁面結構
assets/
  css/style.css     浮世繪風格樣式(含手機/桌機響應式)
  js/data.js        假名資料:字源、口訣、例詞 + 衍生濁音/半濁音/拗音
  js/app.js         遊戲邏輯:熱力圖、SRS、速答、測驗、發音
  img/hero.jpg      浮世繪虎斑貓(AI 生成)
```

## 致謝與授權

- 字源解說與例詞取材自《五十音不靠背》(神奇裘莉 著,本書未隨附於本專案)。
- 程式碼以 [MIT License](LICENSE) 釋出。
