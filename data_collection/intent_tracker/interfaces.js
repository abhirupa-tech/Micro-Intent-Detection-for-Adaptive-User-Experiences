/**
 * @enum {string}
 */
const MicroIntent = {
  Search: "SEARCH",
  FillForm: "FILL_FORM",
  Navigate: "NAVIGATE",
  HelpSeek: "HELP_SEEK",
  Cancel: "CANCEL",
  Confirm: "CONFIRM",
  Explore: "EXPLORE",
  FocusShift: "FOCUS_SHIFT",
  ErrorRecover: "ERROR_RECOVER",
  Idle: "IDLE",
  HoverPreview: "HOVER_PREVIEW",
  MultiTask: "MULTITASK",
  AdjustPersonalize: "ADJUST_PERSONALIZE",
  Unknown: "UNKNOWN",
};

/**
 * @typedef {Object} EventTargetInfo
 * @property {string} [element_id]
 * @property {string} [element_type]
 * @property {string} [element_text]
 */

/**
 * @typedef {Object} EventAttributes
 * @property {number} [x]
 * @property {number} [y]
 * @property {"left"|"right"|"middle"} [button]
 * @property {string} [key]
 * @property {string[]} [modifiers]
 * @property {number} [deltaX]
 * @property {number} [deltaY]
 * @property {number} [scrollTop]
 * @property {number} [scrollLeft]
 * @property {string} [selectionText]
 * @property {string} [from_url]
 * @property {string} [to_url]
 */

/**
 * @typedef {Object} UIEventLog
 * @property {string} event_id
 * @property {string} timestamp
 * @property {"click"|"dblclick"|"keydown"|"keyup"|"input"|"change"|"submit"|"reset"|
 *            "focus"|"blur"|"select"|"scroll"|"mouseover"|"mouseout"|"navigation"} event_type
 * @property {EventTargetInfo} target
 * @property {EventAttributes} [attributes]
 */

/**
 * @typedef {Object} SessionLog
 * @property {string} session_id
 * @property {string} start_time
 * @property {string} [end_time]
 * @property {MicroIntent} [intent_label]
 * @property {UIEventLog[]} events
 */
