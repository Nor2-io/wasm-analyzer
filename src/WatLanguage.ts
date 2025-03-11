import * as monaco from "monaco-editor";

export function setupWatLanguage() {
    monaco.languages.register({ id: "wat" });
    monaco.languages.setLanguageConfiguration("wat", WatLanguage);
    monaco.languages.setMonarchTokensProvider("wat", WatTokensProvider);
}

//TODO: Add folding to s-expressions
//TODO: Add folding to loops
//TODO: Add folding to block comments
//TODO: Add folding to blocks
//TODO: Add validation rules to instruction calls
export const WatLanguage: monaco.languages.LanguageConfiguration = {
  comments: {
    lineComment: ";;",
    blockComment: ["(;", ";)"],
  },
  brackets: [["(", ")"]],
  autoClosingPairs: [
    { open: "(", close: ")" },
    { open: '"', close: '"' },
  ],
  surroundingPairs: [
    { open: "(", close: ")" },
    { open: '"', close: '"' },
  ],
};

export const WatTokensProvider: monaco.languages.IMonarchLanguage = {
  defaultToken: "white",
  tokenPostfix: ".wat",
  keywords: [
    "select",
    "func",
    "param",
    "result",
    "type",
    "module",
    "local",
    "drop",
    "table",
    "global",
    "export",
    "import",
    "memory",
    "elem",
    "data",
    "mut",
    "shared",
  ],
  controlKeywords: [
    "start",
    "block",
    "br",
    "br_if",
    "br_table",
    "loop",
    "end",
    "return",
    "call",
    "unreachable",
    "call_indirect",
  ],
  typeKeywords: ["i32", "i64", "f32", "f64", "v128", "funcref", "externref"],

  operators: [
    "!",
    "!=",
    "%",
    "%=",
    "&",
    "&=",
    "&&",
    "*",
    "*=",
    "+",
    "+=",
    "-",
    "-=",
    "->",
    ".",
    "..",
    "...",
    "/",
    "/=",
    ":",
    ";",
    "<<",
    "<<=",
    "<",
    "<=",
    "=",
    "==",
    "=>",
    ">",
    ">=",
    ">>",
    ">>=",
    "@",
    "^",
    "^=",
    "|",
    "|=",
    "||",
    "_",
    "?",
    "#",
  ],

  escapes: /\\([nrt0\"''\\]|x\h{2}|u\{\h{1,6}\})/,
  symbols: /[\#\!\%\&\*\+\-\.\/\:\;\<\=\>\@\^\|_\?]+/,
  intSuffixes: /i(32|64)/,
  floatSuffixes: /f(32|64)/,

  tokenizer: {
    root: [
      [
        /(offset|align)(?=\=)/,
        { token: "entity.other.attribute-name", next: "@integer" },
      ],

      [/\@[a-zA-Z0-9_\-][a-zA-Z0-9_\-]*!?|_[a-zA-Z0-9_\-]+/, "tag"],

      [
        /\$[a-zA-Z0-9!_\-+:#%$'/?`^<>.&=~\*][a-zA-Z0-9!_\-+:#%$'/?`^<>.&=~\*]*!?|_[a-zA-Z0-9!_\-+:#%$'/?`^<>.&=~\*]+/,
        "variable",
      ],
      [
        /(i32|i64|f32|f64|v128|funcref|externref|memory|global|local|data)(?=\.)/,
        "type.identifier",
        "@instructions",
      ],

      [/(i32|i64|f32|f64|v128|funcref|externref)(?!\.)/, "type.identifier"],

      [
        /[a-zA-Z][a-zA-Z0-9_\-]*!?|_[a-zA-Z0-9_\-]+/,
        {
          cases: {
            "@keywords": "keyword",
            "@controlKeywords": "keyword.control",
            "@default": "identifier",
          },
        },
      ],

      // Strings
      [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],

      // Numbers
      { include: "@numbers" },

      // Whitespace + comments
      { include: "@whitespace" },

      { include: "@invalid" },

      [/@symbols/, { cases: { "@operators": "operator", "@default": "" } }],
    ],

    instructions: [
      [/[ \t\r\n]+/, "white", "@pop"],
      [
        /(?:const|get|gt|gt_u|gt_s|lt|lt_u|lt_s|le_u|eqz|eq|ne|add|sub|mul|div|div_u|abs|floor|ge|ge_u|ge_s|le_s|le_u|load8_u|load8_s|promote_f32|trunc_f32_s|convert_i32_u|convert_i32_s|convert_i64_s|trunc_f64_s|wrap_i64|rem_s|and|or|xor|shr_u|shr_s|shl|load|store|fill|init|atomic.rmw.cmpxchg|.atomic.rmw.sub|drop|set|get|tee|extend_i32_u)/,
        "function",
        "@pop",
      ],
    ],

    invalid: [["[^\\s()]+", "invalid"]],

    whitespace: [
      [/[ \t\r\n]+/, "white"],
      [/\(;/, "comment", "@comment"],
      [/;;.*$/, "comment"],
    ],

    comment: [
      [/[^;;*]+/, "comment"],
      [/\(;/, "comment", "@push"],
      [/;\)/, "comment", "@pop"],
      [/[\);]/, "comment"],
    ],

    string: [
      [/[^\\"]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
    ],

    integer: [
      [/[ \t\r\n]+/, "white", "@pop"],
      [
        /[+-]?(?:0x[0-9a-fA-F][0-9a-fA-F]*|\d[\d]*)/,
        { token: "number.integer", next: "@pop" },
      ],
    ],
    numbers: [
      //Floating point infinity
      [/[+-]?inf/, { token: "number.float" }],

      //Floating point literal NaN
      [/[+-]?\\bnan:0x[0-9a-fA-F][0-9a-fA-F]*\\b/, { token: "number.float" }],

      //Floating point hexadecimal literal
      [
        /[+-]?0x([0-9a-fA-F]*\.[0-9a-fA-F]+|[0-9a-fA-F]+\.?)[Pp][+-]?[0-9]+/,
        { token: "number.float" },
      ],

      //Floating point literal
      [
        /[+-]?\\b[0-9][0-9]*(?:\\.[0-9][0-9]*)?(?:[eE][+-]?[0-9]+)?\\b/,
        { token: "number.float" },
      ],

      //Integer literal
      [
        /[+-]?(?:0x[0-9a-fA-F][0-9a-fA-F]*|\d[\d]*)/,
        { token: "number.integer" },
      ],
    ],
  },
};