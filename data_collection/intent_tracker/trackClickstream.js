let active = true;
console.log("Content script loaded");

function handleClick(e) {
  //eventLog.push({ type: "click", tag: e.target.tagName, id: e.target.id, class: e.target.className, timestamp: Date.now(), url: window.location.href });
  console.log("Click captured!");
}

function handleDblClick(e) {
  //eventLog.push({ type: "dblclick", tag: e.target.tagName, id: e.target.id, class: e.target.className, timestamp: Date.now(), url: window.location.href });
  console.log("Double click captured!");
}

function handleKeyDown(e) {
  //eventLog.push({ type: "keydown", key: e.key, timestamp: Date.now(), url: window.location.href });
  console.log("Keydown captured!");
}

function handleKeyUp(e) {
  //eventLog.push({ type: "keyup", key: e.key, timestamp: Date.now(), url: window.location.href });
  console.log("Keyup captured!");
}

function handleInput(e) {
  //eventLog.push({ type: "input", value: e.target.value, timestamp: Date.now(), url: window.location.href });
  console.log("Input captured!");
}

function handleChange(e) {
  //eventLog.push({ type: "change", value: e.target.value, timestamp: Date.now(), url: window.location.href });
  console.log("Change captured!");
}

function handleSubmit(e) {
  //eventLog.push({ type: "submit", formId: e.target.id, timestamp: Date.now(), url: window.location.href });
  console.log("Form submitted!");
}

function handleReset(e) {
  //eventLog.push({ type: "reset", formId: e.target.id, timestamp: Date.now(), url: window.location.href });
  console.log("Form reset!");
}

function handleFocus(e) {
  //eventLog.push({ type: "focus", tag: e.target.tagName, id: e.target.id, timestamp: Date.now(), url: window.location.href });
  console.log("Focus captured!");
}

function handleBlur(e) {
  //eventLog.push({ type: "blur", tag: e.target.tagName, id: e.target.id, timestamp: Date.now(), url: window.location.href });
  console.log("Blur captured!");
}

function handleSelect(e) {
  //eventLog.push({ type: "select", tag: e.target.tagName, id: e.target.id, timestamp: Date.now(), url: window.location.href });
  console.log("Select captured!");
}

function handleScroll() {
  //eventLog.push({ type: "scroll", scrollY: window.scrollY, timestamp: Date.now(), url: window.location.href });
  console.log("Scroll captured!");
}

function handleMouseOver(e) {
  //eventLog.push({ type: "mouseover", tag: e.target.tagName, id: e.target.id, timestamp: Date.now(), url: window.location.href });
  console.log("Mouseover captured!");
}

function handleMouseOut(e) {
  //eventLog.push({ type: "mouseout", tag: e.target.tagName, id: e.target.id, timestamp: Date.now(), url: window.location.href });
  console.log("Mouseout captured!");
}

function handleNavigation() {
  //eventLog.push({ type: "navigation", url: window.location.href, timestamp: Date.now() });
  console.log("Navigation captured!");
}



function addEventListeners() {
    document.addEventListener("click", handleClick);
    document.addEventListener("dblclick", handleDblClick);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("input", handleInput);
    document.addEventListener("change", handleChange);
    document.addEventListener("submit", handleSubmit);
    document.addEventListener("reset", handleReset);
    document.addEventListener("focus", handleFocus, true);
    document.addEventListener("blur", handleBlur, true);
    document.addEventListener("select", handleSelect);
    document.addEventListener("scroll", handleScroll);
    // document.addEventListener("mouseover", handleMouseOver);
    // document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("popstate", handleNavigation);
    window.addEventListener("pushstate", handleNavigation);
}

function removeEventListeners() {
if (!capturing) return;
    capturing = false;

    document.removeEventListener("click", handleClick);
    document.removeEventListener("dblclick", handleDblClick);
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("keyup", handleKeyUp);
    document.removeEventListener("input", handleInput);
    document.removeEventListener("change", handleChange);
    document.removeEventListener("submit", handleSubmit);
    document.removeEventListener("reset", handleReset);
    document.removeEventListener("focus", handleFocus, true);
    document.removeEventListener("blur", handleBlur, true);
    document.removeEventListener("select", handleSelect);
    document.removeEventListener("scroll", handleScroll);
    document.removeEventListener("mouseover", handleMouseOver);
    document.removeEventListener("mouseout", handleMouseOut);
    window.removeEventListener("popstate", handleNavigation);
    window.removeEventListener("pushstate", handleNavigation);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "START_CAPTURE") {
        console.log("Adding event listeners");
        addEventListeners();
    }
    if (message.type === "END_CAPTURE") {
        console.log("Removing event listeners");
        removeEventListeners();
    }
});