// background.js からのメッセージを監視
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "COPY") {
    // 1. テキストを流し込むための一時的な要素を作成
    const textarea = document.createElement("textarea");
    textarea.value = msg.text;

    // 2. 画面外に配置してユーザーの邪魔をしないようにする
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    textarea.style.left = "-9999px";

    document.body.appendChild(textarea);
    
    // 3. テキストを選択してコピーを実行
    textarea.focus();
    textarea.select();

    try {
      // Manifest V3のオフスクリーンドキュメントではこれが標準的なコピー方法
      const successful = document.execCommand("copy");
      if (successful) {
        console.log("クリップボードへのコピーに成功したで！");
      } else {
        console.error("execCommand が失敗したわ。");
      }
    } catch (e) {
      console.error("コピー処理中にエラー発生:", e);
    }

    // 4. 使い終わった要素はすぐに削除
    document.body.removeChild(textarea);
  }
});