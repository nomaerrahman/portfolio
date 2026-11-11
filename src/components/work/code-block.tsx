"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import type { CodeSnippet } from "@/lib/types";
import { copyToClipboard } from "@/lib/utils";

const KEYWORDS =
  /\b(def|return|class|import|from|export|default|async|await|const|let|function|if|else|for|in|new|type|interface)\b/g;

/** Minimal, dependency-free highlighter. Swap for Shiki if you want full grammar support. */
function highlight(code: string) {
  const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return code
    .split("\n")
    .map((line) => {
      const commentIdx = line.search(/(#|\/\/)\s/);
      const body = commentIdx >= 0 ? line.slice(0, commentIdx) : line;
      const comment = commentIdx >= 0 ? line.slice(commentIdx) : "";
      let html = escape(body)
        .replace(/(&quot;|"|'|`)(.*?)\1/g, '<span style="color:hsl(var(--academic))">$&</span>')
        .replace(KEYWORDS, '<span style="color:hsl(var(--corporate))">$1</span>')
        .replace(/(@\w+)/g, '<span style="color:hsl(var(--accent))">$1</span>');
      if (comment) html += `<span style="opacity:.45">${escape(comment)}</span>`;
      return html;
    })
    .join("\n");
}

export function CodeBlock({ snippet }: { snippet: CodeSnippet }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-bg">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5">
            <i className="h-2.5 w-2.5 rounded-full bg-fg/15" />
            <i className="h-2.5 w-2.5 rounded-full bg-fg/15" />
            <i className="h-2.5 w-2.5 rounded-full bg-fg/15" />
          </span>
          <span className="font-mono text-xs text-muted">{snippet.filename}</span>
        </div>
        <button
          onClick={async () => {
            if (await copyToClipboard(snippet.code)) {
              setCopied(true);
              setTimeout(() => setCopied(false), 1600);
            }
          }}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] text-muted transition hover:bg-elevated hover:text-fg"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="scrollbar-none overflow-x-auto p-4 text-[12.5px] leading-relaxed">
        <code className="font-mono" dangerouslySetInnerHTML={{ __html: highlight(snippet.code) }} />
      </pre>
    </div>
  );
}
