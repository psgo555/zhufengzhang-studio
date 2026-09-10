# 朱豐璋刻印部

純前端品牌網站，React + Vite + GSAP。包含響應式排版、落印進場、捲動工藝流程、橫向展示、服務詳情對話框與 FAQ。

## 本機執行

```sh
npm install
npm run dev
```

Windows PowerShell 如受執行原則限制，請使用 `npm.cmd`。

## 建置

```sh
npm run build
npm run preview
```

將 `dist/` 部署至靜態網站主機即可。未使用後端或表單資料收集服務，詢問入口直接連至店家提供的 Facebook。

## 內容維護

- 主要文字、品項與 Facebook 網址：`src/main.jsx`
- 樣式及手機版：`src/style.css`
- 書法字體及墨色紙紋：`src/ink.css`，全站自託管霞鶩文楷 TC（400 / 700），授權收錄於 `public/licenses/LXGW-WenKai-TC-OFL.txt`；字型來源：https://github.com/lxgw/LxgwWenkaiTC
- 情境影像：`public/images/`，包含首頁靜物 `seals.png`、工藝近拍 `craft.png`、石章組合 `stone.png`、印章禮盒 `gift.png`（皆為 AI 生成示意，非店家實拍作品）
- 目前未刊登未經確認的地址、電話、營業時間、價格與取件承諾。上線前請由店家核對內容，並以實際產品及工藝照片替換示意圖。
- 工藝動畫包含桌面捲動固定場景；手機與減少動態模式使用自然捲動與按鈕切換。
