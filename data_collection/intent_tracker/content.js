let isCapturing = false;
let eventLog = [];

function handleClick(e) {
  eventLog.push({
    type: "click",
    tag: e.target.tagName,
    id: e.target.id,
    class: e.target.className,
    timestamp: Date.now(),
    url: window.location.href
  });
  console.log("Click captured:", eventLog[eventLog.length - 1]);
}

function handleScroll() {
  eventLog.push({
    type: "scroll",
    scrollY: window.scrollY,
    timestamp: Date.now(),
    url: window.location.href
  });
  console.log("Scroll captured:", eventLog[eventLog.length - 1]);
}

document.getElementById("startCapture").addEventListener("click", () => {
    console.log("Start Capture button clicked");
  if (!isCapturing) {
    isCapturing = true;
    addEventListeners();
    console.log("✅ Session capture started");
  }
});

document.getElementById("endCapture").addEventListener("click", () => {
    console.log("End Capture button clicked");
  if (isCapturing) {
    isCapturing = false;
    removeEventListeners();
    console.log("🛑 Session capture ended");
  }
});

function addEventListeners() {
    document.addEventListener("click", handleClick);
    document.addEventListener("scroll", handleScroll);
    }

function removeEventListeners() {
    document.removeEventListener("click", handleClick);
    document.removeEventListener("scroll", handleScroll);
    }
