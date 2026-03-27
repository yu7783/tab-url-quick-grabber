document.addEventListener("DOMContentLoaded", async () => {
  const win = await chrome.windows.getCurrent({ populate: true });
  const siteList = document.getElementById("site-list");
  
  // ドメイン一覧を抽出（重複排除）
  const domains = [...new Set(win.tabs
    .map(tab => {
      try { return new URL(tab.url).hostname; } catch(e) { return null; }
    })
    // 修正ポイント：chrome:// に加えて chrome-extension:// も除外
    .filter(d => d && !d.includes("chrome://") && !d.includes("chrome-extension://"))
  )];

  if (domains.length === 0) {
    siteList.textContent = "対象のサイトが見つからんわ。";
    return;
  }

  domains.forEach(domain => {
    const div = document.createElement("div");
    div.className = "site-item";
    div.textContent = domain;
    div.onclick = (e) => copyUrls(e, domain, win.tabs);
    siteList.appendChild(div);
  });
});

async function copyUrls(e, domain, allTabs) {
  const urls = allTabs
    .filter(tab => tab.url && tab.url.includes(domain))
    .map(tab => tab.url);

  // Background経由でクリップボードへ
  await chrome.runtime.sendMessage({ type: "COPY_REQUEST", text: urls.join("\n") });
  
  const targetElement = e.target;
  targetElement.textContent = "コピー完了！";
  setTimeout(() => window.close(), 800); 
}