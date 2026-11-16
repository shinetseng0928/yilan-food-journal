# 宜大吃什麼｜我的美食手帳

分享作者在宜蘭大學附近的用餐紀錄，以溫暖手帳風呈現。首批內容為歡喜堂、人吉牛丼、義響家，心得與價格均依作者提供資料整理。

## 本機瀏覽
用瀏覽器開啟專案根目錄的 `index.html`，不需安裝套件或編譯。
請將完整資料夾保留在一起，HTML 會以相對路徑載入 `assets/` 中的 CSS 與 JavaScript。

## 功能
- 首頁顯示共用格式的美食卡片。
- 點擊「翻開這一頁」可閱讀完整心得。
- 可按關閉按鈕或 Escape 關閉筆記，焦點回到原按鈕。
- 支援手機與桌面版面。
- 尚無餐點照片，圖案皆為已標示的裝飾插畫。

## 目錄
```text
AGENTS.md                 專案規則
README.md                 使用與維護說明
index.html                首頁與共用詳情對話框
assets/css/styles.css     全站風格與手機版面
assets/js/food-data.js     店家、餐點、價格與心得
assets/js/app.js           讀取資料並呈現共用版型
```
有照片時再建立 `assets/images/`，放入有權使用的照片。

## 新增一篇食記
1. 先閱讀 `AGENTS.md`。
2. 在 `assets/js/food-data.js` 的陣列加入一個店家物件，使用唯一 id。
3. 填入作者提供的餐點、價格、心得；未知資訊省略，不編造。
4. 重新整理網站，新卡片與詳情會自動出現，不必修改 HTML。
5. 測試卡片開啟、關閉、Escape、Tab，以及手機版面。

給 AI 的指令範例：
> 先讀 AGENTS.md，依我提供的店名、餐點、價格與心得新增一篇食記。只更新內容資料，沿用共用版型，不新增未提供的感想。

## 檢查
有 Node.js 時，可執行：
```sh
node --check assets/js/food-data.js
node --check assets/js/app.js
```
這些指令只檢查語法，不能取代實際開啟網站測試互動與版面。

## GitHub Pages 發布（第四步）
1. 在自己的 GitHub 建立 repository，例如 `yilan-food-journal`。
2. 將這個專案資料夾內的檔案與 `assets` 目錄上傳到 repository 根目錄。確保 `index.html` 位於根目錄。
3. 到 Settings → Pages，選擇 Deploy from a branch，再選 main 與 /(root)，儲存。
4. 等待部署成功，開啟 Pages 提供的網址，確認三張卡片與詳情可以正常使用。
5. 作業繳交 GitHub repository 網址與公開網站網址。

目前這份檔案提供發布流程；沒有實際上傳及部署成功以前，不代表已完成第四步。
