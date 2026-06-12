import type { ReactNode } from "react";

function renderLine(line: string, key: number) {
  const trimmed = line.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("## ")) {
    return (
      <h2 key={key} className="mt-8 font-heading text-2xl font-bold text-ink-950 dark:text-neutral-50 first:mt-0">
        {trimmed.slice(3)}
      </h2>
    );
  }
  if (trimmed.startsWith("# ")) {
    return (
      <h1 key={key} className="mt-6 font-heading text-3xl font-bold text-ink-950 dark:text-neutral-50 first:mt-0">
        {trimmed.slice(2)}
      </h1>
    );
  }
  if (trimmed.startsWith("- ")) {
    return (
      <li key={key} className="ml-4 list-disc text-body">
        {trimmed.slice(2).replace(/\*\*(.*?)\*\*/g, "$1")}
      </li>
    );
  }
  if (trimmed.startsWith("|")) return null;
  const html = trimmed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  return (
    <p
      key={key}
      className="mt-4 leading-relaxed text-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function ArticleContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: ReactNode[] = [];
  let listBuffer: string[] = [];

  function flushList(startKey: number) {
    if (listBuffer.length === 0) return;
    elements.push(
      <ul key={`ul-${startKey}`} className="mt-3 space-y-2">
        {listBuffer.map((l, i) => renderLine(l, startKey + i))}
      </ul>,
    );
    listBuffer = [];
  }

  lines.forEach((line, i) => {
    if (line.trim().startsWith("- ")) {
      listBuffer.push(line);
      return;
    }
    flushList(i);
    const el = renderLine(line, i);
    if (el) elements.push(el);
  });
  flushList(lines.length);

  return <article className="max-w-none">{elements}</article>;
}
