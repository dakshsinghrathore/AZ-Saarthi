chrome.storage.local.get(["apiKey"], ({ apiKey }) => {
  if (apiKey) document.getElementById("apiKey").value = apiKey;
});

document.getElementById("botSendKeyButton").addEventListener("click", () => {
  const apiKey = document.getElementById("apiKey").value;
  if (!apiKey) return console.error("API Key is empty");

  chrome.storage.local.set({ apiKey }, () => {
    console.log("API Key saved successfully.");
    document.getElementById("successMessage").style.display = "block";
    setTimeout(() => window.close(), 1000);

    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab) chrome.tabs.sendMessage(tab.id, { type: "SET_API_KEY", apiKey });
    });
  });
});
