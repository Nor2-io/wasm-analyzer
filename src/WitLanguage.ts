import * as monaco from "monaco-editor";

export function setupWitLanguage() {
    monaco.languages.register({ id: "wit" });
    monaco.languages.setLanguageConfiguration("wit", WitLanguage);
    monaco.languages.setMonarchTokensProvider("wit", WitTokensProvider);
}

//TODO: Add folding to loops
//TODO: Add folding to block comments
//TODO: Add folding to blocks
export const WitLanguage: monaco.languages.LanguageConfiguration = {
    comments: {
        lineComment: "///",
        blockComment: null,
      },
      //folding: { markers: { start: /^\{/, end: /^\}/ }, offSide: false },
      brackets: [
        ["(", ")"],
        ["{", "}"],
        ["<", ">"],
      ],
      autoClosingPairs: [
        { open: "(", close: ")" },
        { open: "{", close: "}" },
        { open: "<", close: ">" },
        { open: '"', close: '"' },
      ],
      surroundingPairs: [
        { open: "(", close: ")" },
        { open: "{", close: "}" },
        { open: "<", close: ">" },
        { open: '"', close: '"' },
      ],
};

export const WitTokensProvider: monaco.languages.IMonarchLanguage = {
    defaultToken: "invalid",
    tokenPostfix: ".wit",
    keywords: [
      "package",
      "world",
      "interface",
      "use",
      "type",
      "func",
      "import",
      "export",
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
    typeKeywords: [
      "u8",
      "u16",
      "u32",
      "u64",
      "s8",
      "s16",
      "s32",
      "s64",
      "f32",
      "f64",
      "enum",
      "result",
      "list",
      "record",
      "resource",
      "tuple",
    ],
  
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
    symbols: /[\#\!\%\&\*\+\-\.\,\/\:\;\<\=\>\@\^\|_\?]+/,
  
    identifierStart: /[a-z][a-z0-9]*/,
    identifier: /@identifierStart(?:[\-][a-z][0-9a-z]*)*/,
  
    type: /u8|u16|u32|u64|s8|s16|s32|s64|f32|f64|bool/,
    typeGenerics: /result|option|tuple|list/,
    keyType: /enum|resource|record|variant/,
  
    tokenizer: {
      root: [
        // Whitespace + comments
        { include: "@whitespace" },
  
        [/(package)\s+/, { token: "type.identifier", next: "@package" }],
  
        [
          /(interface)(\s+)(@identifier)(\s*\{\s*)/,
          [
            "type.identifier",
            "white",
            "function",
            { token: "white", next: "@interface" },
          ],
        ],
  
        [
          /(world)(\s+)(@identifier)(\s*\{\s*)/,
          [
            "type.identifier",
            "white",
            "function",
            { token: "white", next: "@world" },
          ],
        ],
      ],
  
      package: [
        [
          /(@identifier)(\:)(@identifier)/,
          { token: "meta.package-decl.wit", next: "@pop" },
        ],
        [/[ \t\r\n]+/, "white", "@pop"],
      ],
  
      world: [
        [/[ \s\t\r\n]*\}/, { token: "white", next: "@pop" }],
        [
          /(import)(\s*)(@identifier)(:)(@identifier)(\/)(@identifier)(\@)([0-9].[0-9].[0-9])/,
          [
            "keyword",
            "white",
            "type.identifier",
            "white",
            "type.identifier",
            "white",
            "type.identifier",
            "white",
            { token: "white" },
          ],
        ],
        [
          /(export)(\s*)(@identifier)(:)(@identifier)(\/)(@identifier)(\@)([0-9].[0-9].[0-9])/,
          [
            "keyword",
            "white",
            "type.identifier",
            "white",
            "type.identifier",
            "white",
            "type.identifier",
            "white",
            { token: "white" },
          ],
        ],
      ],
  
      interface: [
        // Whitespace + comments
        { include: "@whitespace" },
        [/[ \s\t\r\n]*\}/, { token: "white", switchTo: "@root" }],
  
        [/\s*\b(enum)\b\s+/, { token: "keyword", next: "@enum" }],
  
        [
          /(type)(\s*)(@identifier)(\s*)(=)(\s*)(@type)/,
          [
            "keyword",
            "white",
            "tag",
            "white",
            "white",
            "white",
            { token: "type.identifier" },
          ],
        ],
  
        [
          /(use)(\s*)(@identifier)(:)(@identifier)(\/)(@identifier)(\.\{\s*)/,
          [
            "keyword",
            "white",
            "type.identifier",
            "white",
            "type.identifier",
            "white",
            "type.identifier",
            { token: "white", next: "@use" },
          ],
        ],
  
        [/(@identifier)(\s*\:\s*)/, ["alias", { token: "white", next: "@func" }]],
  
        {
          include: "@genericType",
        },
  
        [/@type/, "type.identifier"],
  
        [/@keyType/, "type.identifier"],
  
        [
          /@identifier/,
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
  
        [/@symbols/, { cases: { "@operators": "operator", "@default": "" } }],
      ],
  
      enum: [
        [/[\r\n]+/, "white", "@pop"],
        { include: "@comment" },
        [
          "((?<![\\-\\w])@identifier)\\s*(\\{)\\s*",
          { token: "type.identifier", next: "@enumCases" },
        ],
      ],
  
      enumCases: [
        [/[\r\n]+/, "white", "@pop"],
        { include: "@comment" },
        [
          "\\s*\\b((?<![\\-\\w])@identifier)\\b",
          { token: "variable.other.enummember.id.enum-cases.wit" },
        ],
        [/\,/, "punctuation.comma.wit"],
        [/\}/, { token: "white", switchTo: "@interface" }],
      ],
  
      use: [
        [/[\r\n]+/, "white", "@pop"],
        { include: "@comment" },
        ["\\s*\\b((?<![\\-\\w])@identifier)\\b", { token: "tag" }],
        [/\,/, "punctuation.comma.wit"],
        [/\}/, { token: "white", next: "@pop" }],
      ],
  
      types: [[/@type/, "type.identifier", "@pop"]],
  
      genericType: [
        [
          /(@typeGenerics)(\s*\<\s*)/,
          ["keyword", { token: "white", next: "@innerType" }],
        ],
      ],
  
      innerType: [
        [/[\r\n]+/, "white", "@pop"],
        { include: "@comment" },
        [/@type/, "type.identifier"],
        [
          /(@typeGenerics)(\s*\<\s*)/,
          ["keyword", { token: "white", next: "@innerType" }],
        ],
        ["\\s*\\b((?<![\\-\\w])@identifier)\\b", { token: "tag" }],
        [/\,/, "punctuation.comma.wit"],
        [/(\>)([\r\n]*)/, { token: "white", switchTo: "@interface" }],
        [/\>/, { token: "white", next: "@pop" }],
      ],
  
      func: [
        [
          /(\s*)(func)(\s*\(\s*)/,
          ["white", "keyword", { token: "white", next: "@fields" }],
        ],
        [/\s*\-\>\s*/, "white", "@anyType"],
        [/[ \t\r\n]*/, { token: "white", next: "@pop" }],
      ],
  
      anyType: [
        { include: "@genericType" },
        { include: "@types" },
        [/@identifier/, { token: "tag", next: "@pop" }],
        [/\s*[\r\n]*/, { token: "white", switchTo: "@pop" }],
      ],
  
      fields: [
        [/[\r\n]+/, "white", "@pop"],
        [
          /(@identifier)(\s*)(\:)(\s*)/,
          ["white", "white", "white", { token: "white", next: "@anyType" }],
        ],
        [/\,/, "punctuation.comma.wit"],
        [/\)/, { token: "white", next: "@pop" }],
      ],
  
      whitespace: [[/[ \t\r\n]+/, "white"], { include: "@comment" }],
  
      comment: [[/\/\/\/.*$/, "comment"]],
  
      string: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
      ],
    },
};