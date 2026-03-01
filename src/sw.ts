chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "get-config-response") {
    chrome.runtime.sendMessage(message);
  }
});
