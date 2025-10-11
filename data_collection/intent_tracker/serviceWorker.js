chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in serviceWorker:", message);
    if (message.type === "START_CAPTURE") {
        console.log("Event logged:");
    }
    if (message.type === "END_CAPTURE") {
        console.log("Event logging ended.");
    }
})

console.log("serviceWorker.js");