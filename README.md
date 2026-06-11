# 五十音不靠背 · 學習遊戲

> 認得字源,假名不用死背。

A Japanese kana learning game built around one idea: every kana evolved from a
Chinese character, so learners who already read Chinese can recognize kana
instead of memorizing them. Inspired by the book
《五十音不靠背:學過一次記得一輩子的假名課》(神奇裘莉 著).

**Live demo:** <https://shkao.github.io/gojuon/>

## 功能

- **五十音表**:清音、濁音、半濁音、拗音四套完整圖表,平/片假名切換。點任一假名展開「漢字 ➜ 假名」演變說明與例詞。
- **字源翻卡**:正面出字源漢字(如「安」),翻面看它變成的假名、讀音與演變說明。
- **字源配對**:記憶翻翻樂,把字源漢字和對應的平假名配成對。
- **測驗挑戰**:十題混合出題(讀音、平片假名互認、字源、聽力),可自選範圍,本機保存最佳紀錄。
- **發音播放**:使用瀏覽器內建 Web Speech API 的日語語音,免音檔、可離線。

## 使用

純靜態網站,沒有建置步驟,直接開啟 `index.html` 即可,或起一個本機伺服器:

```bash
python3 -m http.server 8000
```

手機上可用 Safari「加入主畫面」以全螢幕 App 模式執行。發音需要系統安裝日語語音(macOS/iOS 內建 Kyoko)。

## 專案結構

```
index.html          頁面結構
assets/
  css/style.css     樣式(含手機/桌機響應式)
  js/data.js        假名資料:46 清音字源 + 衍生濁音、半濁音、拗音
  js/app.js         遊戲邏輯與發音
  img/hero.png      標題插圖
```

## 致謝與授權

- 字源解說與例詞取材自《五十音不靠背》(神奇裘莉 著,本書未隨附於本專案)。
- 程式碼以 [MIT License](LICENSE) 釋出。
