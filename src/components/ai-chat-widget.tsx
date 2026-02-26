"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Loader2, SendHorizonal } from "lucide-react";

type Message = {
  role: "assistant" | "user";
  text: string;
};

const QUICK_QUESTIONS = [
  "Who is Abdalrahman?",
  "What are his top skills?",
  "How can I contact him?",
];

function getAnswer(input: string) {
  const q = input.toLowerCase();

  if (q.includes("who") || q.includes("about") || q.includes("summary")) {
    return "Abdalrahman Alqashi is a cybersecurity student at JUST. He focuses on CTFs, vulnerability discovery, and practical offensive security learning.";
  }

  if (
    q.includes("skill") ||
    q.includes("stack") ||
    q.includes("tech") ||
    q.includes("tool")
  ) {
    return "Top skills: Linux, Python, Docker, C++, Assembly, and security problem solving through CTF-style challenges.";
  }

  if (q.includes("contact") || q.includes("linkedin") || q.includes("instagram") || q.includes("reach")) {
    return "You can contact him through LinkedIn: linkedin.com/in/abdalrahman-alqashi and Instagram: @abd.alyousef_07.";
  }

  if (q.includes("goal") || q.includes("career") || q.includes("future")) {
    return "His goal is to grow as a cybersecurity professional who finds vulnerabilities early, protects systems, and keeps learning continuously.";
  }

  return "I can help with: who he is, skills, goals, and contact info. Try one of the quick questions.";
}

function RobotEyes({ isOpen }: { isOpen: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPjThemeActive, setIsPjThemeActive] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const syncThemeState = () => {
      setIsPjThemeActive(root.classList.contains("pj-theme"));
    };

    syncThemeState();

    const observer = new MutationObserver(syncThemeState);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let raf = 0;

    const onMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) {
        return;
      }

      if (raf !== 0) {
        return;
      }

      raf = window.requestAnimationFrame(() => {
        const rect = containerRef.current!.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;
        const angle = Math.atan2(dy, dx);
        const distance = Math.min(2.6, Math.hypot(dx, dy) / 95);

        setOffset({
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        });

        raf = 0;
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (raf !== 0) {
        window.cancelAnimationFrame(raf);
      }
    };
  }, []);

  const eyeScale = useMemo(() => (isOpen ? 1 : 0.95), [isOpen]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none relative flex h-10 w-10 items-center justify-center"
      aria-hidden
    >
      {isPjThemeActive ? (
        <>
          <span className="pj-robot-shemagh" />
        </>
      ) : null}

      <div className="pj-robot-core">
        <span className="pj-robot-headshine" />

        <div className="h-5 w-5 rounded-full bg-card/90 border border-border/70 flex items-center justify-center">
          <span
            className="h-2.5 w-2.5 rounded-full bg-foreground transition-transform duration-75"
            style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${eyeScale})` }}
          />
        </div>
        <div className="h-5 w-5 rounded-full bg-card/90 border border-border/70 flex items-center justify-center">
          <span
            className="h-2.5 w-2.5 rounded-full bg-foreground transition-transform duration-75"
            style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${eyeScale})` }}
          />
        </div>

        <span className="pj-robot-mouth" />
      </div>
    </div>
  );
}

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);
  const [emptyAttempt, setEmptyAttempt] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const replyTimeoutRef = useRef<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi! I’m Abdalrahman’s AI assistant. Ask me about his background, skills, or contact info.",
    },
  ]);

  const send = (text: string) => {
    if (isSending) {
      return;
    }

    const value = text.trim();
    if (!value) {
      return;
    }

    const answer = getAnswer(value);

    setMessages((prev) => [...prev, { role: "user", text: value }]);
    setIsSending(true);
    setIsAssistantTyping(true);
    setInput("");

    if (replyTimeoutRef.current !== null) {
      window.clearTimeout(replyTimeoutRef.current);
    }

    replyTimeoutRef.current = window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", text: answer }]);
      setIsAssistantTyping(false);
      setIsSending(false);
      replyTimeoutRef.current = null;
    }, 560);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!input.trim() && !isSending) {
      setEmptyAttempt(true);
      inputRef.current?.focus();
      return;
    }

    send(input);
  };

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsMounted(false);
    }, 340);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const focusId = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 120);

    return () => {
      window.clearTimeout(focusId);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const node = messagesContainerRef.current;
    if (!node) {
      return;
    }

    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [messages, isAssistantTyping, isMounted]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const onPointerDown = (event: MouseEvent) => {
      if (!widgetRef.current) {
        return;
      }

      const target = event.target as Node;
      if (!widgetRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current !== null) {
        window.clearTimeout(replyTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!emptyAttempt) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setEmptyAttempt(false);
    }, 650);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [emptyAttempt]);

  return (
    <div
      ref={widgetRef}
      className="fixed z-50 flex flex-col items-start gap-3 pj-chat-anchor left-[max(0.8rem,env(safe-area-inset-left))] bottom-[max(5.25rem,calc(env(safe-area-inset-bottom)+4.25rem))] md:bottom-[max(0.8rem,env(safe-area-inset-bottom))]"
    >
      {isMounted ? (
        <div
          className={`pj-chat-shell pj-chat-panel pj-chat-luxe-panel w-[min(92vw,22rem)] rounded-2xl border border-border/70 bg-card/95 backdrop-blur-xl shadow-lg p-3 space-y-3 origin-bottom-left ${
            isOpen ? "pj-chat-panel-enter" : "pj-chat-panel-exit pointer-events-none"
          }`}
        >
          <div className="pj-chat-luxe-title pj-chat-pop-item pj-pop-delay-1 text-sm font-semibold text-foreground">AI Chat about Abdalrahman</div>

          <div ref={messagesContainerRef} className="pj-chat-list pj-chat-pop-item pj-pop-delay-2 max-h-64 overflow-y-auto space-y-2 pr-1">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-xl px-3 py-2 text-sm ${
                  message.role === "assistant"
                    ? "pj-chat-msg pj-chat-msg-assistant pj-chat-bubble-assistant bg-muted/70 text-foreground border border-border/60"
                    : "pj-chat-msg pj-chat-msg-user pj-chat-bubble-user bg-secondary text-secondary-foreground border border-border/60 ml-6"
                }`}
              >
                {message.text}
              </div>
            ))}

            {isAssistantTyping ? (
              <div className="pj-chat-typing rounded-xl px-3 py-2 text-sm bg-muted/70 text-foreground border border-border/60 inline-flex items-center gap-1.5">
                <span className="pj-chat-dot" />
                <span className="pj-chat-dot" />
                <span className="pj-chat-dot" />
                <span className="ml-1 text-xs text-muted-foreground">AI is typing...</span>
              </div>
            ) : null}
          </div>

          <div className="pj-chat-pop-item pj-pop-delay-3 flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => send(question)}
                disabled={isSending}
                className="pj-chat-chip pj-chat-btn rounded-lg border border-border/70 bg-muted/55 px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {question}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="pj-chat-pop-item pj-pop-delay-4 flex items-center gap-2">
            <input
              value={input}
              ref={inputRef}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask anything about him..."
              disabled={isSending}
              className={`pj-chat-input flex-1 rounded-lg border border-border/70 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none focus:ring-2 focus:ring-ring/40 ${
                emptyAttempt ? "pj-chat-input-attention" : ""
              }`}
            />
            <button
              type="submit"
              disabled={isSending}
              className={`pj-chat-send rounded-lg border border-border/70 bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground hover:bg-muted transition-colors ${
                emptyAttempt ? "pj-chat-send-attention" : ""
              }`}
            >
              <span className="pj-chat-send-glow" aria-hidden />
              <span className="pj-chat-send-shine" aria-hidden />
              <span className="pj-chat-send-inner inline-flex items-center gap-1.5">
                {isSending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <SendHorizonal className="h-3.5 w-3.5" />}
                {isSending ? "Sending..." : "Send"}
              </span>
            </button>
          </form>

          <div
            className={`text-xs text-muted-foreground transition-all duration-300 ${
              emptyAttempt ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
            }`}
          >
            Write a message or tap a quick question.
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open AI chat"
        className={`pj-chat-trigger pj-chat-trigger-btn h-14 w-14 rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-lg flex items-center justify-center hover:bg-muted transition-all duration-200 active:scale-95 ${
          isOpen ? "pj-chat-trigger-open" : "pj-chat-trigger-idle"
        }`}
      >
        <RobotEyes isOpen={isOpen} />
      </button>
    </div>
  );
}
