chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onMessage.addListener(async(message, sender, sendResponse) => {
  console.log("Message received in serviceWorker:", message);
    if (message.type === "START_CAPTURE") {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true }); //Get the current active tab
        console.log("Active tab:", tab);
        try{
            if (tab.id) {
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['trackClickstream.js']
                });
                console.log("Started capturing clickstream data on tab:", tab.id);
                chrome.tabs.sendMessage(tab.id, { type: "START_CAPTURE" });
            }
        }catch(err)
        {
            console.error("Error executing script:", err);
        }
    }
    if (message.type === "END_CAPTURE") {
        chrome.tabs.sendMessage(sender.tab.id, { type: "END_CAPTURE" });
        console.log("Stopped capturing clickstream data on tab:", sender.tab.id);
    }

})

console.log("serviceWorker.js");