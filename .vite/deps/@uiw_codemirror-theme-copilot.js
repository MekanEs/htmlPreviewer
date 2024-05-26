import {
  _extends
} from "./chunk-PQEZCWQY.js";
import {
  EditorView,
  HighlightStyle,
  syntaxHighlighting,
  tags
} from "./chunk-OEDDWPXS.js";
import "./chunk-ZJ4C2ABA.js";

// node_modules/@uiw/codemirror-themes/esm/index.js
var createTheme = (_ref) => {
  var {
    theme,
    settings = {},
    styles = []
  } = _ref;
  var themeOptions = {
    ".cm-gutters": {}
  };
  var baseStyle = {};
  if (settings.background) {
    baseStyle.backgroundColor = settings.background;
  }
  if (settings.backgroundImage) {
    baseStyle.backgroundImage = settings.backgroundImage;
  }
  if (settings.foreground) {
    baseStyle.color = settings.foreground;
  }
  if (settings.fontSize) {
    baseStyle.fontSize = settings.fontSize;
  }
  if (settings.background || settings.foreground) {
    themeOptions["&"] = baseStyle;
  }
  if (settings.fontFamily) {
    themeOptions["&.cm-editor .cm-scroller"] = {
      fontFamily: settings.fontFamily
    };
  }
  if (settings.gutterBackground) {
    themeOptions[".cm-gutters"].backgroundColor = settings.gutterBackground;
  }
  if (settings.gutterForeground) {
    themeOptions[".cm-gutters"].color = settings.gutterForeground;
  }
  if (settings.gutterBorder) {
    themeOptions[".cm-gutters"].borderRightColor = settings.gutterBorder;
  }
  if (settings.caret) {
    themeOptions[".cm-content"] = {
      caretColor: settings.caret
    };
    themeOptions[".cm-cursor, .cm-dropCursor"] = {
      borderLeftColor: settings.caret
    };
  }
  var activeLineGutterStyle = {};
  if (settings.gutterActiveForeground) {
    activeLineGutterStyle.color = settings.gutterActiveForeground;
  }
  if (settings.lineHighlight) {
    themeOptions[".cm-activeLine"] = {
      backgroundColor: settings.lineHighlight
    };
    activeLineGutterStyle.backgroundColor = settings.lineHighlight;
  }
  themeOptions[".cm-activeLineGutter"] = activeLineGutterStyle;
  if (settings.selection) {
    themeOptions["&.cm-focused .cm-selectionBackground, & .cm-line::selection, & .cm-selectionLayer .cm-selectionBackground, .cm-content ::selection"] = {
      background: settings.selection + " !important"
    };
  }
  if (settings.selectionMatch) {
    themeOptions["& .cm-selectionMatch"] = {
      backgroundColor: settings.selectionMatch
    };
  }
  var themeExtension = EditorView.theme(themeOptions, {
    dark: theme === "dark"
  });
  var highlightStyle = HighlightStyle.define(styles);
  var extension = [themeExtension, syntaxHighlighting(highlightStyle)];
  return extension;
};

// node_modules/@uiw/codemirror-theme-copilot/esm/color.js
var config = {
  background: "#232a2f",
  foreground: "#939da5",
  selection: "#204062",
  selectionMatch: "#204062",
  cursor: "#939da5",
  dropdownBackground: "#1a2023",
  activeLine: "#4469832b",
  matchingBracket: "#204062",
  keyword: "#ba8ef7",
  storage: "#ba8ef7",
  variable: "#939da5",
  parameter: "#939da5",
  function: "#ffea6b",
  string: "#5bec95",
  constant: "#939da5",
  type: "#89ddff",
  class: "#ffea6b",
  number: "#89ddff",
  comment: "#707a84",
  heading: "#5bec95",
  invalid: "#ff6a80",
  regexp: "#56adb7",
  tag: "#ff6a80"
};

// node_modules/@uiw/codemirror-theme-copilot/esm/index.js
var defaultSettingsCopilot = {
  background: config.background,
  foreground: config.foreground,
  caret: config.cursor,
  selection: config.selection,
  selectionMatch: config.selectionMatch,
  gutterBackground: config.background,
  gutterForeground: config.foreground,
  lineHighlight: config.activeLine
};
var copilotInit = (options) => {
  var {
    theme = "dark",
    settings = {},
    styles = []
  } = options || {};
  return createTheme({
    theme,
    settings: _extends({}, defaultSettingsCopilot, settings),
    styles: [{
      tag: tags.keyword,
      color: config.keyword
    }, {
      tag: [tags.name, tags.deleted, tags.character, tags.macroName],
      color: config.variable
    }, {
      tag: [tags.propertyName],
      color: config.function
    }, {
      tag: [tags.processingInstruction, tags.string, tags.inserted, tags.special(tags.string)],
      color: config.string
    }, {
      tag: [tags.function(tags.variableName), tags.labelName],
      color: config.function
    }, {
      tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)],
      color: config.constant
    }, {
      tag: [tags.definition(tags.name), tags.separator],
      color: config.variable
    }, {
      tag: [tags.className],
      color: config.class
    }, {
      tag: [tags.number, tags.changed, tags.annotation, tags.modifier, tags.self, tags.namespace],
      color: config.number
    }, {
      tag: [tags.typeName],
      color: config.type,
      fontStyle: config.type
    }, {
      tag: [tags.operator],
      color: config.keyword
    }, {
      tag: [tags.url, tags.escape, tags.regexp, tags.link],
      color: config.regexp
    }, {
      tag: [tags.meta, tags.comment],
      color: config.comment
    }, {
      tag: tags.tagName,
      color: config.tag
    }, {
      tag: tags.strong,
      fontWeight: "bold"
    }, {
      tag: tags.emphasis,
      fontStyle: "italic"
    }, {
      tag: tags.link,
      textDecoration: "underline"
    }, {
      tag: tags.heading,
      fontWeight: "bold",
      color: config.heading
    }, {
      tag: [tags.atom, tags.special(tags.variableName)],
      color: config.variable
    }, {
      tag: tags.invalid,
      color: config.invalid
    }, {
      tag: tags.strikethrough,
      textDecoration: "line-through"
    }, {
      tag: [tags.operatorKeyword, tags.bool, tags.null, tags.variableName],
      color: config.constant
    }, ...styles]
  });
};
var copilot = copilotInit();
export {
  copilot,
  copilotInit,
  defaultSettingsCopilot
};
//# sourceMappingURL=@uiw_codemirror-theme-copilot.js.map
