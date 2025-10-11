let isCapturing = false;
let eventLog = [];


document.getElementById("startCapture").addEventListener("click", () => {
  console.log("Start Capture button clicked");
  chrome.runtime.sendMessage({ type: "START_CAPTURE" });
  if (!isCapturing) {
    isCapturing = true;
    addEventListeners();
    console.log("✅ Session capture started");
  }
});

document.getElementById("endCapture").addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "END_CAPTURE"});
  console.log("End Capture button clicked");
  if (isCapturing) {
    isCapturing = false;
    removeEventListeners();
    console.log("🛑 Session capture ended");
  }
});

