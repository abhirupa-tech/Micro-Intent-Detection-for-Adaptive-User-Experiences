let active = true;
console.log("Content script loaded");

/** @type {SessionLog} */
let sessionLog = [];
/** @type {SessionLog[]} */
let sessionLogs = [];

/** @type {UIEventLog[]} */
let eventLogs = [];

function buildEventLog(e, type) {
  return {
    event_id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    event_type: type,
    target: {
      element_id: e.target.id || null,
      element_type: e.target.tagName || null,
      element_text: e.target.innerText || null,
    },
    attributes: extractAttributes(e, type),
  };
}

/** @param {Event} e @param {string} type */
function extractAttributes(e, type) {
  switch (type) {
    case "click":
    case "dblclick":
      return {
        x: e.clientX,
        y: e.clientY,
        button: ["left", "middle", "right"][e.button],
      };
    case "keydown":
    case "keyup":
      return {
        key: e.key,
        modifiers: ["Shift", "Ctrl", "Alt", "Meta"].filter((k) =>
          e.getModifierState(k)
        ),
      };
    case "scroll":
      return { scrollTop: window.scrollY, scrollLeft: window.scrollX };
    case "input":
    case "change":
      return { value: e.target.value };
    case "select":
      return {
        selectionText: e.target.value?.substring(
          e.target.selectionStart,
          e.target.selectionEnd
        ),
      };
    case "navigation":
      return { from_url: document.referrer, to_url: location.href };
    default:
      return {};
  }
}

function handleClick(e) {
  sessionLog.events.push(buildEventLog(e, "click"));
  console.log("Click captured!");
}

function handleDblClick(e) {
  sessionLog.events.push(buildEventLog(e, "dblclick"));
  console.log("Double click captured!");
}

function handleKeyDown(e) {
  sessionLog.events.push(buildEventLog(e, "keydown"));
  console.log("Keydown captured!");
}

function handleKeyUp(e) {
  sessionLog;
  console.log("Keyup captured!");
}

function handleInput(e) {
  sessionLog.events.push(buildEventLog(e, "input"));
  console.log("Input captured!");
}

function handleChange(e) {
  sessionLog.events.push(buildEventLog(e, "change"));
  console.log("Change captured!");
}

function handleSubmit(e) {
  sessionLog.events.push(buildEventLog(e, "submit"));
  console.log("Form submitted!");
}

function handleReset(e) {
  sessionLog.events.push(buildEventLog(e, "reset"));
  console.log("Form reset!");
}

function handleFocus(e) {
  sessionLog.events.push(buildEventLog(e, "focus"));
  console.log("Focus captured!");
}

function handleBlur(e) {
  sessionLog.events.push(buildEventLog(e, "blur"));
  console.log("Blur captured!");
}

function handleSelect(e) {
  sessionLog.events.push(buildEventLog(e, "select"));
  console.log("Select captured!");
}

function handleScroll() {
  sessionLog.events.push(buildEventLog(new Event("scroll"), "scroll"));
  console.log("Scroll captured!");
}

function handleMouseOver(e) {
  sessionLog.events.push(buildEventLog(e, "mouseover"));
  console.log("Mouseover captured!");
}

function handleMouseOut(e) {
  sessionLog.events.push(buildEventLog(e, "mouseout"));
  console.log("Mouseout captured!");
}

function handleNavigation() {
  sessionLog.events.push(buildEventLog(new Event("navigation"), "navigation"));
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

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "START_CAPTURE") {
    console.log("Adding event listeners");
    sessionLogs = await chrome.storage.local.get("sessionClickStreamLogs");
    sessionLog.sessionId = crypto.randomUUID();
    sessionLog.startTime = new Date().toISOString();
    sessionLog.events = [];
    addEventListeners();
  }
  if (message.type === "END_CAPTURE") {
    console.log("Removing event listeners");
    removeEventListeners();

    sessionLog.endTime = new Date().toISOString();
  }

  if (message.type === "SUBMIT_INTENT") {
    console.log("Received SUBMIT_EVENTS message");

    sessionLog.microIntent = message.intentLabel || "UNKNOWN";
    sessionLogs.push(sessionLog);
    await chrome.storage.local.set({ sessionClickStreamLogs: sessionLogs });
  }
});
