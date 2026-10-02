V4.14.2 HF13｜變更密碼入口精簡版

請將以下 3 個檔案上傳到 GitHub main，覆蓋同名檔案：
1. index.html
2. auth-security-v4.14.2.html
3. service-worker.js

本版處理：
- 移除「開啟獨立變更密碼頁」
- 移除「前往變更密碼」
- 保留唯一的「變更會員密碼」表單
- 首頁與安全頁切換到 hf13
- Service Worker 快取升級為 hf13

測試入口：
https://avg168.github.io/independent-points/?v=4142hf13
