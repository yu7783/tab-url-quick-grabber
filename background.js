async function ensureOffscreen() {
  const existing = await chrome.offscreen.hasDocument();
  if (existing) return;

  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: ["CLIPBOARD"],
    justification: "Copy tab URLs"
  });
}

chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg.type === "COPY_REQUEST") {
    try {
      await ensureOffscreen();
      
      // 修正ポイント：少しだけ待つか、確実に送れるまでリトライする
      // ここでは一番確実な「ちょっと待ってから送る」方法をとるで
      setTimeout(() => {
        chrome.runtime.sendMessage({
          type: "COPY",
          text: msg.text
        }).catch(err => console.error("送られへんかった:", err));
      }, 100); 

    } catch (e) {
      console.error("Backgroundエラー:", e);
    }
  }
});