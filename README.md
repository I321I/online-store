# online store
此專案旨在建立一網站模擬電子商務網站的服務與功能，主要就瀏覽商品、登入至購物車結帳進行設計，提供完整且流暢的消費流程體驗。
<br><br>
## 關於專案
此專案是自主開發，目的在於深化自身實作網頁前端設計能力。網站具響應式網頁設計(RWD)。專案採 **Next.js 全端框架** 與 **Firebase 無伺服器資料庫 (Serverless DB)** 開發，嚴格遵守前後端分離，將前後端以 RESTful API 串接，並且以 Adapter Pattern 設計後端與資料庫溝通，以取得更好的維護性。
<br><br>
[**點此造訪專案網站**](https://i321ionline.store/zh-Hant)

## 畫面預覽
|桌面端介面|行動端介面|
|---|---|
|<img src="https://i.meee.com.tw/OnXrDuv.png" width="1200" height="800"/>|<img src="https://i.meee.com.tw/YJUZgBN.png" width="450" height="800"/>|

## 網頁功能：
- **流暢的跨裝置體驗**：全網站具響應式網頁設計(RWD)，並在行動端使用Sidebar以顧及便利性。
- **多語言支持(i18n)**：網頁提供中英雙語言介面供使用者切換。
- **資料庫(DB)**：登入、購物車、庫存以及商品等資訊藉由資料庫存取，以利使用者在不同裝置之間使用。
- **現代化安全登入**：以Magic Link來Email登入，將藉由傳送信件至信箱，點擊連接登入；擁有現今主流的單一登入(SSO)，採用OAuth以免使用者擔心資料外洩。並且整合登入與購物車功能，在帳戶間切換間享有各自的購物車資料。
- **購物車**：登入後，頁面右上的ICON顯示購物車內的商品數量。並且在購物車內可直接透過按鈕快速增減數量，當下同步後端與資料庫。填寫收件者資料則由Zod檢查輸入格式，確保有效資料的傳遞。商品結帳後將從庫存扣除相應數量。
- **庫存**：整合購物車與庫存系統，商品頁面可察看結帳後扣除的數量。

## 技術棧
### 前端
- **核心框架**：Next.js (React) / TypeScript / HTML5 / CSS3
- **樣式與動畫**：Tailwind CSS / shadcn/ui / Framer Motion
- **狀態管理**：Redux Toolkit
- **資料驗證**：Zod
- **多語系管理**：i18next

### 後端與雲端
- **後端端點**：Next.js API Routes (RESTful API 設計)
- **身分驗證**：Auth.js (NextAuth)
- **雲端資料庫**：Firebase (Firestore / Authentication)
- **託管平台**：Vercel (持續整合與自動化部署)
<br><br>
## 部署
本專案採用 **Vercel** 進行持續整合與部署 (CI/CD)。每次推送 (Push) 程式碼至 `main` 分支時，Vercel 皆會自動觸發建置並更新線上網頁。
- **託管平台**：Vercel
- **自動化流程**：GitHub Actions / Vercel Git Integration
- **環境變數**：已於 Vercel Dashboard 安全加密設定
