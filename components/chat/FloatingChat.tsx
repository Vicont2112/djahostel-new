"use client";

import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { useCallback, useState } from "react";

const CHIPS_UK = [
  "Є місця на ці дати?",
  "Скільки коштує приватна кімната?",
  "Як добратися від вокзалу?",
  "Правила заселення",
  "Що поруч?",
];

function partsToText(parts: UIMessage["parts"]): string {
  if (!parts?.length) return "";
  return parts
    .filter(
      (p): p is { type: "text"; text: string } =>
        p.type === "text" && typeof p.text === "string",
    )
    .map((p) => p.text)
    .join("");
}

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const { messages, sendMessage, status, stop } = useChat();

  const busy = status === "streaming" || status === "submitted";

  const onChip = useCallback(
    (text: string) => {
      void sendMessage({ text });
    },
    [sendMessage],
  );

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="dja-chat-panel"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-olive-deep text-[#faf8f4] shadow-md ring-1 ring-olive-muted/50 transition hover:bg-olive focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="sr-only">
          {open ? "Закрити чат" : "Відкрити чат з помічником"}
        </span>
        <ChatBubbleIcon className="h-7 w-7" />
      </button>

      <div
        id="dja-chat-panel"
        role="dialog"
        aria-label="Чат з помічником хостелу"
        className={`fixed bottom-24 right-5 z-50 flex w-[min(100vw-2.5rem,22rem)] flex-col overflow-hidden rounded-2xl border border-olive-muted/50 bg-card shadow-lg transition-all duration-200 sm:w-[24rem] ${
          open
            ? "pointer-events-auto max-h-[min(70vh,32rem)] translate-y-0 opacity-100"
            : "pointer-events-none max-h-0 translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-olive-muted/35 bg-olive-muted/25 px-4 py-3">
          <div>
            <p className="font-serif text-base font-medium text-foreground">
              Помічник DJA
            </p>
            <p className="text-xs text-muted">Спокійно відповімо на питання</p>
          </div>
          {busy && (
            <button
              type="button"
              onClick={() => void stop()}
              className="text-xs font-medium text-olive underline-offset-2 hover:underline"
            >
              Стоп
            </button>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 overflow-y-auto bg-background/40 px-3 py-3">
          {messages.length === 0 && (
            <p className="rounded-xl border border-olive-muted/30 bg-card px-3 py-2.5 text-sm leading-relaxed text-muted">
              Вітаємо. Запитайте про дати, номери чи район — зараз демо-відповіді;
              далі підключимо ваш агента й шахматку.
            </p>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[95%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                m.role === "user"
                  ? "ml-auto bg-olive-deep text-[#faf8f4]"
                  : "mr-auto border border-olive-muted/40 bg-card text-foreground"
              }`}
            >
              {partsToText(m.parts)}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 border-t border-olive-muted/35 bg-olive-muted/15 px-3 py-2.5">
          {CHIPS_UK.map((c) => (
            <button
              key={c}
              type="button"
              disabled={busy}
              onClick={() => onChip(c)}
              className="rounded-full border border-olive-muted/50 bg-card px-2.5 py-1.5 text-left text-[11px] leading-snug text-foreground transition hover:border-olive/40 hover:bg-background disabled:opacity-45 sm:text-xs"
            >
              {c}
            </button>
          ))}
        </div>

        <form
          className="flex gap-2 border-t border-olive-muted/35 bg-card p-3"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const text = String(fd.get("msg") ?? "").trim();
            if (!text || busy) return;
            void sendMessage({ text });
            e.currentTarget.reset();
          }}
        >
          <input
            name="msg"
            placeholder="Напишіть повідомлення…"
            disabled={busy}
            className="min-w-0 flex-1 rounded-xl border border-olive-muted/50 bg-background px-3 py-2 text-sm text-foreground outline-none ring-ring placeholder:text-muted focus:ring-2"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={busy}
            className="rounded-xl bg-accent px-3 py-2 text-sm font-medium text-white transition hover:bg-accent-hover disabled:opacity-45"
          >
            Надіслати
          </button>
        </form>
      </div>
    </>
  );
}

function ChatBubbleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}
