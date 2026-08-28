# 🐾 焦月 (Jiao Yue) 官方個人網站

<div align="center">

[![Website](https://img.shields.io/badge/Website-jiaoyue.gay-58a6ff?style=for-the-badge&logo=google-chrome&logoColor=white)](https://jiaoyue.gay/)
[![Email](https://img.shields.io/badge/Email-jiaoyue0325%40jiaoyue.gay-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:jiaoyue0325@jiaoyue.gay)
[![Discord](https://img.shields.io/badge/Discord-Join%20Server-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://jiaoyue.gay/discord)
[![Last Update](https://img.shields.io/badge/Updated-2026%2F08%2F28-success?style=for-the-badge&logo=clock&logoColor=white)](https://jiaoyue.gay/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE.md)

<p align="center">
  <b>台灣 Furry 創作者「焦月」的個人品牌、作品集與自我介紹網站。</b><br>
  展示數位繪圖、YouTube 創作、參與活動、社群連結與合作夥伴資訊。
</p>

[🌐 線上瀏覽](https://jiaoyue.gay/) • [💬 加入 Discord](https://jiaoyue.gay/discord) • [🎨 精選功能](#-核心特色與功能-features) • [⚙️ 開發指南](#-本地端運行與開發-local-development)

</div>

---

## 📖 專案簡介 (About)

本專案為 **焦月 (Jiao Yue)** 的個人官方網站前端專案。採用原生現代前端技術（HTML5 + Tailwind CSS + Vanilla JavaScript）構建，兼具極速載入效能、豐富視覺效果、多語系國際化與完整 SEO 結構化資料支援。

- **官方網址**：[https://jiaoyue.gay/](https://jiaoyue.gay/)
- **Discord 捷徑**：[https://jiaoyue.gay/discord/](https://jiaoyue.gay/discord/)
- **專案更新時間**：`2026/08/28`

---

## ✨ 核心特色與功能 (Features)

### 1. 🌐 多語系國際化支援 (i18n)
- 內建支援 5 種語言：**繁體中文 (`zh`)**、**簡體中文 (`zh-Hans`)**、**英文 (`en`)**、**日文 (`ja`)**、**韓文 (`ko`)**。
- 自動根據使用者瀏覽器偏好切換語言，並支援手動下拉切換與平滑文字切換動畫。

### 2. 🎨 多主題與深淺色模式 (Theme System)
- **深色 / 淺色模式**：即時切換或自動跟隨系統偏好設定（System Prefers Color Scheme）。
- **多款色系預設**：
  - 🔵 **經典藍 (Default)**
  - 🟣 **薰衣草紫 (Lavender)**
  - 🟢 **森林綠 (Forest)**
  - 🟠 **同同 (Tong Tong)**
- 透過 CSS 變數動態套用調色盤，切換無縫不卡頓。

### 3. 🖼️ 互動式作品集展示 (Portfolio & Works Modal)
- 支援分類瀏覽（YouTube 影片、PENUP 電繪、LINE 貼圖、合作繪圖等）。
- 獨立作品彈窗 (Modal Viewer)，支援詳細說明、創作工具標籤、外部高清圖庫連結與歷史上一頁 (`popstate`) 整合。

### 4. 📅 動態活動資訊模組 (Dynamic Event Renderer)
- 支援透過 JSON 資料動態載入並渲染各項 Furry / 開源年會等活動（如 UTFG、COSCUP）。
- 自動依目前語言載入對應語言版本的活動名稱與簡介，並顯示活動狀態標籤（即將推出 / 籌備中 / 已結束）。

### 5. ⏳ 個人獸設與生日倒數 (Furry Profile & Countdown)
- 柴犬獸人角色設定卡片（名稱、物種、外觀特徵、性格介紹）。
- 實時生日倒數計時器（每年 03 月 25 日自動重算目標時間）。

### 6. 🚀 效能與 SEO 優化 (SEO & Performance)
- **結構化資料**：動態注入 [Schema.org](https://schema.org) `Person` 與 `WebSite` JSON-LD，利於 Google 搜尋引擎索引。
- **社群卡片**：完整 Open Graph 與 Twitter/X Card 預覽設定。
- **效能調校**：圖片 Lazy Loading 延遲載入、CDN 字型 Preconnect 預連接優化。

---

## 🛠️ 技術棧 (Tech Stack)

| 領域 | 使用技術 |
| :--- | :--- |
| **前端架構** | HTML5, Vanilla JavaScript (ES6+), CSS3 |
| **樣式與排版** | [Tailwind CSS](https://tailwindcss.com/) (CDN / Config), CSS Variables |
| **字體與圖示** | [Font Awesome 6](https://fontawesome.com/), Google Fonts (Inter, Noto Sans TC) |
| **多語與設定** | 自研 i18n 語系字典模組 (`js/lang/`), 全域設定檔 (`js/site-config.js`) |
| **SEO & Meta** | Schema.org JSON-LD, Open Graph Protocol, Twitter Cards |
| **工具腳本** | Node.js (圖片屬性優化腳本 `optimize.js`, `check.js`) |

---

## 📂 專案目錄結構 (Project Structure)

```plaintext
jiaoyue.gay-web/
├── Events/                   # 活動資訊資料夾
│   ├── event_1/              # 活動 1 (JSON 設定與宣傳圖)
│   │   ├── event_1.json
│   │   └── event_*.png
│   └── event_2/              # 活動 2 (JSON 設定與宣傳圖)
│       ├── event_2.json
│       └── event_*.jpg
├── css/                      # 樣式表檔案
│   ├── animations.css        # 動畫過場效果
│   ├── events.css            # 活動區塊樣式
│   ├── input.css             # Tailwind 來源樣式
│   ├── snow.css              # 雪花特效樣式
│   ├── style.css             # 全域自訂樣式
│   ├── theme-default.css     # 經典藍主題
│   ├── theme-green.css       # 森林綠主題
│   ├── theme-purple.css      # 薰衣草紫主題
│   └── theme-tongtong.css    # 同同主題
├── discord/                  # Discord 轉址子頁面
│   └── index.html            # 多語系自動轉址至 Discord 邀請連結
├── js/                       # 前端功能邏輯
│   ├── lang/                 # 多語系翻譯字典
│   │   ├── en.js             # 英文
│   │   ├── ja.js             # 日文
│   │   ├── ko.js             # 韓文
│   │   ├── zh.js             # 繁體中文
│   │   └── zh-Hans.js        # 簡體中文
│   ├── eventRenderer.js      # 動態活動渲染器
│   ├── fireworks.js          # 煙火特效腳本
│   ├── lang.js               # 語系載入與切換控制器
│   ├── main.js               # 核心互動 (滾動偵測、倒數計時、選單等)
│   ├── seo.js                # JSON-LD 結構化資料與 Meta 管理
│   ├── site-config.js        # 網站全域配置、個人簡介與色彩設定
│   ├── snow.js               # 雪花動態效果
│   ├── tailwind-config.js    # Tailwind 客製配置
│   ├── theme.js              # 深淺色主題切換與系統監聽
│   └── works-modal.js        # 作品集彈窗與資料管理
├── backups/                  # 備份與版本留存
├── check.js                  # 圖片缺少屬性檢查輔助腳本
├── optimize.js               # 靜態檔案預處理優化腳本
├── settings.json             # 編輯器/開發設定
├── tailwind.config.js        # Tailwind 設定檔
├── works.json                # 作品清單資料庫 (可擴展)
└── README.md                 # 專案說明文件 (本檔案)
```

---

## 💻 本地端運行與開發 (Local Development)

本專案為純靜態網站，無需複雜的建置環境即可快速預覽與調試：

### 方法一：使用 VS Code Live Server 擴充套件（推薦）
1. 使用 Visual Studio Code 開啟專案資料夾。
2. 安裝 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 擴充套件。
3. 點擊編輯器右下角的 **Go Live** 按鈕即可在瀏覽器預覽。

### 方法二：使用 Node.js 快速建立靜態伺服器
```bash
# 使用 npx serve
npx serve .

# 或使用 http-server
npx http-server . -p 8080
```

### 方法三：使用 Python 內建 HTTP 伺服器
```bash
# Python 3
python -m http.server 8080
```
在瀏覽器開啟 `http://localhost:8080` 即可預覽網站。

---

## ⚙️ 設定與自訂指南 (Customization)

### 1. 修改個人資訊與主題色調
編輯 [`js/site-config.js`](file:///C:/Users/yumin/OneDrive/Documents/GitHub/jiaoyue.gay-web/js/site-config.js)：
- `profile`: 修改個人名稱、稱號、簡介、獸設物種、個性描述與生日。
- `theme.presets`: 自訂或新增主題色票（深/淺色背景、卡片底色、重點色）。
- `seo`: 設定網站名稱、描述與社群外部連結。

### 2. 新增或編輯作品集項目
編輯 [`js/works-modal.js`](file:///C:/Users/yumin/OneDrive/Documents/GitHub/jiaoyue.gay-web/js/works-modal.js) 中的 `worksData` 陣列：
```javascript
{
    id: 'my_new_work',
    titleKey: 'work_new_title',        // 對應 js/lang/*.js 內的語系 key
    descriptionKey: 'work_new_desc',  // 對應 js/lang/*.js 內的語系 key
    tools: 'PENUP App, Photoshop',     // 創作工具
    imageUrl: 'images/exhibit/work_x.webp',
    link: 'https://www.penup.com/artwork/...'
}
```

### 3. 新增活動 (Events)
在 `Events/` 目錄下建立新資料夾（例如 `event_3`），並建立 `event_3.json`：
```json
{
    "titles": {
        "zh-tw": "活動標題",
        "en": "Event Title"
    },
    "descriptions": {
        "zh-tw": "活動內容描述",
        "en": "Event Description"
    },
    "link": "https://example.com/event",
    "img": "Events/event_3/cover.png",
    "finished": false,
    "isTentative": false
}
```
並在 [`js/eventRenderer.js`](file:///C:/Users/yumin/OneDrive/Documents/GitHub/jiaoyue.gay-web/js/eventRenderer.js) 的 `eventSources` 清單中加入該 JSON 路徑。

### 4. 擴充多國語言詞條
在 [`js/lang/`](file:///C:/Users/yumin/OneDrive/Documents/GitHub/jiaoyue.gay-web/js/lang/) 對應的語言檔案中新增相應的鍵值對（如 `zh.js`, `en.js`, `ja.js`, `ko.js`）。

---

## 🌐 社群與聯絡方式 (Contact & Socials)

歡迎透過以下管道關注焦月與交流互動：

- **聯絡信箱 (Email)**：[jiaoyue0325@jiaoyue.gay](mailto:jiaoyue0325@jiaoyue.gay)
- **官方網站**：[https://jiaoyue.gay/](https://jiaoyue.gay/)
- **YouTube**：[@焦月 Jiao Yue](https://www.youtube.com/channel/UCfn_S3F7gIG9-komcsLMPLA)
- **X (Twitter)**：[@xingxing1443469](https://x.com/xingxing1443469)
- **Instagram**：[@louis1234433](https://www.instagram.com/louis1234433)
- **Bilibili**：[焦月 Jiao Yue](https://space.bilibili.com/1352630702)
- **Discord 伺服器**：[加入社群](https://jiaoyue.gay/discord)

---

## 📄 授權條款 (License)

本專案原始碼以 [MIT License](LICENSE.md) 授權釋出。  
網站內包含之角色設定、圖像素材、插畫繪圖及專屬文字著作權均屬 **焦月 (Jiao Yue)** 及原作者所有，未經授權請勿擅自轉載或作商業用途。

<div align="center">
  <sub>Made with ❤️ by 焦月 Jiao Yue • 讓創意照亮網路的每一個角落</sub>
</div>