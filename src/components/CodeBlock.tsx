import { Fragment } from "react";

const KEYWORDS = new Set([
  "const", "let", "var", "function", "return", "if", "else", "for", "while", "type",
  "interface", "export", "import", "from", "default", "await", "async", "new", "class",
  "extends", "implements", "readonly", "as", "of", "in", "null", "undefined", "true",
  "false", "void", "typeof", "instanceof", "continue", "break", "try", "catch", "finally",
  "throw", "switch", "case", "do", "yield", "satisfies", "keyof",
]);

const TOKEN = new RegExp(
  [
    "(\\/\\*[\\s\\S]*?\\*\\/|\\/\\/[^\\n]*)", // comments
    "(\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*'|`(?:\\\\.|[^`\\\\])*`)", // strings
    "(--[a-zA-Z][\\w-]*)", // css custom properties
    "(\\b\\d+(?:\\.\\d+)?(?:px|rem|em|ms|s|%)?\\b|#[0-9a-fA-F]{3,8}\\b)", // numbers / hex
    "([A-Za-z_$][\\w$]*)(?=\\s*\\()", // function calls
    "([A-Za-z_$][\\w$]*)", // identifiers
  ].join("|"),
  "g",
);

/** A deliberately small highlighter: enough colour to read, no runtime cost. */
export function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of code.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      nodes.push(
        <span className="tok-pun" key={key++}>
          {code.slice(lastIndex, index)}
        </span>,
      );
    }

    const [full, comment, string, cssVar, number, fn, ident] = match;
    let className = "";
    if (comment) className = "tok-com";
    else if (string) className = "tok-str";
    else if (cssVar) className = "tok-key";
    else if (number) className = "tok-num";
    else if (fn) className = KEYWORDS.has(fn) ? "tok-key" : "tok-fn";
    else if (ident) className = KEYWORDS.has(ident) ? "tok-key" : "";

    nodes.push(
      <span className={className || undefined} key={key++}>
        {full}
      </span>,
    );
    lastIndex = index + full.length;
  }

  if (lastIndex < code.length) {
    nodes.push(
      <span className="tok-pun" key={key++}>
        {code.slice(lastIndex)}
      </span>,
    );
  }

  return (
    <pre className="code-block" tabIndex={0} role="region" aria-label={`${lang} code sample`}>
      <code>
        {nodes.map((node, index) => (
          <Fragment key={index}>{node}</Fragment>
        ))}
      </code>
    </pre>
  );
}
