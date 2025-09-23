export enum MicroIntent {
  Search = "SEARCH",
  FillForm = "FILL_FORM",
  Navigate = "NAVIGATE",
  HelpSeek = "HELP_SEEK",
  Cancel = "CANCEL",
  Confirm = "CONFIRM",
  Explore = "EXPLORE",
  FocusShift = "FOCUS_SHIFT",
  ErrorRecover = "ERROR_RECOVER",
  Idle = "IDLE",
  HoverPreview = "HOVER_PREVIEW",
  MultiTask = "MULTITASK",
  AdjustPersonalize = "ADJUST_PERSONALIZE",
  Unknown = "UNKNOWN"
}

interface EventTargetInfo {
  element_id?: string;       // e.g., "btn-search"
  element_type?: string;     // e.g., "button", "input"
  element_text?: string;     // e.g., visible text on button
}

// Event Attributes (varies per event_type)
interface EventAttributes {
  // Click / Pointer
  x?: number;                        // clientX
  y?: number;                        // clientY
  button?: "left" | "right" | "middle";

  // Keyboard
  key?: string;                      // e.g., "a", "Enter", "Escape"
  modifiers?: string[];              // e.g., ["Shift", "Ctrl"]

  // Scroll
  deltaX?: number;
  deltaY?: number;
  scrollTop?: number;
  scrollLeft?: number;

  // Focus / Selection
  selectionText?: string;            // for select events

  // Navigation
  from_url?: string;
  to_url?: string;
}

interface EventTargetInfo {
  element_id?: string;
  element_type?: string;
  element_text?: string;
}

interface UIEventLog {
  event_id: string;
  timestamp: string;
  event_type:
    | "click"
    | "dblclick"
    | "keydown"
    | "keyup"
    | "input"
    | "change"
    | "submit"
    | "reset"
    | "focus"
    | "blur"
    | "select"
    | "scroll"
    | "mouseover"
    | "mouseout"
    | "navigation";
  target: EventTargetInfo;
  attributes?: EventAttributes;
}


interface SessionLog {
  session_id: string;
  user_id?: string;
  start_time: string;
  end_time?: string;
  intent_label?: MicroIntent;   // use enum here
  events: UIEventLog[]; //Array of ascending order timestamped Events
}

