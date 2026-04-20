import { useState, useRef, useEffect, useCallback } from "react";
import {
  X,
  Send,
  Sparkles,
  User,
  Bot,
  Trash2,
  Copy,
  Check,
  ChevronRight,
  AlertCircle,
  Loader2,
} from "lucide-react";
import type { ChatMessage } from "../data/careerAIEngine";
import { SUGGESTED_PROMPTS } from "../data/careerAIEngine";
import type { AIState } from "../hooks/useCareerAI";

interface Props {
  messages: ChatMessage[];
  aiState: AIState;
  aiError: string | null;
  streamingId: string | null;
  usageCount: number;
  freeLimit: number;
  onSend: (msg: string) => void;
  onClear: () => void;
  onClose: () => void;
}

// ─── Markdown-lite renderer ───────────────────────────────────────────────────
function renderContent(text: string): JSX.Element {
  const lines = text.split("\n");
  const elements: JSX.Element[] = [];
  let key = 0;

  for (const line of lines) {
    if (!line.trim()) {
      elements.push(<br key={key++} />);
      continue;
    }

    // Bold: **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const formatted = parts.map((p, i) => {
      if (p.startsWith("**") && p.endsWith("**")) {
        return <strong key={i} style={{ color: "#FFFFFF", fontWeight: 600 }}>{p.slice(2, -2)}</strong>;
      }
      return <span key={i}>{p}</span>;
    });

    // Bullet points
    if (line.startsWith("• ") || line.startsWith("- ")) {
      elements.push(
        <div key={key++} className="flex items-start gap-2 my-0.5">
          <span style={{ color: "#4ADE80", marginTop: 2 }}>•</span>
          <span>{formatted.slice(1)}</span>
        </div>
      );
      continue;
    }

    // Numbered list
    const numMatch = line.match(/^(\d+)\. (.+)/);
    if (numMatch) {
      elements.push(
        <div key={key++} className="flex items-start gap-2 my-0.5">
          <span style={{ color: "#4ADE80", minWidth: 16, fontWeight: 600 }}>{numMatch[1]}.</span>
          <span>{formatted.slice(1)}</span>
        </div>
      );
      continue;
    }

    elements.push(<p key={key++} className="my-0.5">{formatted}</p>);
  }

  return <>{elements}</>;
}

// ─── Single message bubble ────────────────────────────────────────────────────
function MessageBubble({
  msg,
  isStreaming,
}: {
  msg: ChatMessage;
  isStreaming: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const isUser = msg.role === "user";

  const copyText = () => {
    navigator.clipboard.writeText(msg.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const timeStr = new Date(msg.timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex gap-3 group ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={
          isUser
            ? { background: "linear-gradient(135deg,#4ADE80,#22C55E)", color: "#111418" }
            : { background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.25)", color: "#4ADE80" }
        }
      >
        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
      </div>

      {/* Bubble */}
      <div className={`flex flex-col gap-1 max-w-[78%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className="px-4 py-3 rounded-2xl text-sm leading-relaxed"
          style={
            isUser
              ? {
                  background: "rgba(74,222,128,0.12)",
                  border: "1px solid rgba(74,222,128,0.25)",
                  color: "#E5E7EB",
                  borderBottomRightRadius: 4,
                }
              : {
                  backgroundColor: "#1A1F24",
                  border: "1px solid #2A2F35",
                  color: "#D1D5DB",
                  borderBottomLeftRadius: 4,
                }
          }
        >
          {isUser ? (
            msg.content
          ) : msg.content ? (
            <div className="text-sm leading-relaxed" style={{ color: "#D1D5DB" }}>
              {renderContent(msg.content)}
              {isStreaming && (
                <span
                  className="inline-block w-0.5 h-4 ml-0.5 align-middle animate-pulse"
                  style={{ backgroundColor: "#4ADE80" }}
                />
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2" style={{ color: "#9AA4B2" }}>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span className="text-xs">Thinking…</span>
            </div>
          )}
        </div>

        {/* Timestamp + copy */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px]" style={{ color: "#4B5563" }}>{timeStr}</span>
          {!isUser && msg.content && (
            <button
              onClick={copyText}
              className="flex items-center gap-1 text-[10px] transition-colors"
              style={{ color: copied ? "#4ADE80" : "#4B5563" }}
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main modal ───────────────────────────────────────────────────────────────
export function CareerChatModal({
  messages,
  aiState,
  aiError,
  streamingId,
  usageCount,
  freeLimit,
  onSend,
  onClear,
  onClose,
}: Props) {
  const [input, setInput] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLTextAreaElement>(null);
  const isLimited = usageCount >= freeLimit;
  const isBusy    = aiState === "streaming" || aiState === "thinking";

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Focus input on open
  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSend = useCallback(() => {
    if (!input.trim() || isBusy || isLimited) return;
    onSend(input);
    setInput("");
    inputRef.current?.focus();
  }, [input, isBusy, isLimited, onSend]);

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    if (confirmClear) {
      onClear();
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 2800);
    }
  };

  const remaining = freeLimit - usageCount;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full flex flex-col overflow-hidden"
        style={{
          maxWidth: 720,
          height: "min(92vh, 700px)",
          backgroundColor: "#111418",
          border: "1px solid #2A2F35",
          borderRadius: 20,
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid #2A2F35", backgroundColor: "#1A1F24" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,rgba(74,222,128,0.2),rgba(34,197,94,0.1))", color: "#4ADE80" }}
            >
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: "#FFFFFF" }}>Career AI Coach</p>
              <p className="text-xs" style={{ color: "#9AA4B2" }}>
                {isBusy ? (
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                    Thinking…
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Online
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Usage meter */}
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
              style={{
                backgroundColor: isLimited ? "rgba(248,113,113,0.1)" : "rgba(255,255,255,0.04)",
                border: isLimited ? "1px solid rgba(248,113,113,0.3)" : "1px solid #2A2F35",
                color: isLimited ? "#F87171" : "#9AA4B2",
              }}
            >
              <Sparkles className="w-3 h-3" />
              {isLimited ? "Limit reached" : `${remaining} / ${freeLimit} free`}
            </div>

            {/* Clear chat */}
            {messages.length > 0 && (
              <button
                onClick={handleClear}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all text-xs"
                title={confirmClear ? "Click again to confirm" : "Clear chat"}
                style={{
                  backgroundColor: confirmClear ? "rgba(248,113,113,0.12)" : "rgba(255,255,255,0.04)",
                  border: confirmClear ? "1px solid rgba(248,113,113,0.3)" : "1px solid #2A2F35",
                  color: confirmClear ? "#F87171" : "#9AA4B2",
                }}
                onMouseEnter={(e) => {
                  if (!confirmClear) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  if (!confirmClear) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
                }}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Close */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid #2A2F35", color: "#9AA4B2" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)")}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Messages ── */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-5 py-5 space-y-4"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#2A2F35 transparent" }}
        >
          {messages.length === 0 ? (
            /* Welcome state */
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,rgba(74,222,128,0.2),rgba(34,197,94,0.1))", color: "#4ADE80" }}
              >
                <Bot className="w-7 h-7" />
              </div>
              <div>
                <p className="font-semibold mb-1.5" style={{ color: "#FFFFFF" }}>Career AI Coach</p>
                <p className="text-sm max-w-xs" style={{ color: "#9AA4B2" }}>
                  Ask me anything about your career path, skills, salaries, or interview prep.
                </p>
              </div>

              {/* Suggested prompts */}
              <div className="flex flex-col gap-2 w-full max-w-sm">
                {SUGGESTED_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => onSend(p)}
                    disabled={isLimited}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-left transition-all"
                    style={{
                      backgroundColor: "#1A1F24",
                      border: "1px solid #2A2F35",
                      color: "#9AA4B2",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#4ADE80";
                      e.currentTarget.style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#2A2F35";
                      e.currentTarget.style.color = "#9AA4B2";
                    }}
                  >
                    <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#4ADE80" }} />
                    {p}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                msg={msg}
                isStreaming={msg.id === streamingId}
              />
            ))
          )}
        </div>

        {/* ── Error / limit banner ── */}
        {(aiError || isLimited) && (
          <div
            className="flex items-start gap-3 mx-5 mb-3 px-4 py-3 rounded-xl text-sm"
            style={{
              backgroundColor: "rgba(248,113,113,0.08)",
              border: "1px solid rgba(248,113,113,0.25)",
              color: "#F87171",
            }}
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p className="flex-1">
              {aiError ?? `You've used all ${freeLimit} free queries. Upgrade to Pro for unlimited Career AI access.`}
            </p>
          </div>
        )}

        {/* ── Input area ── */}
        <div
          className="px-5 pb-5 pt-3 flex-shrink-0"
          style={{ borderTop: "1px solid #2A2F35" }}
        >
          {/* Suggested prompts (when chat has messages) */}
          {messages.length > 0 && !isLimited && (
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {SUGGESTED_PROMPTS.slice(0, 3).map((p) => (
                <button
                  key={p}
                  onClick={() => { onSend(p); }}
                  disabled={isBusy}
                  className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs transition-all"
                  style={{ backgroundColor: "#1A1F24", border: "1px solid #2A2F35", color: "#9AA4B2", whiteSpace: "nowrap" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#4ADE80";
                    e.currentTarget.style.color = "#4ADE80";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#2A2F35";
                    e.currentTarget.style.color = "#9AA4B2";
                  }}
                >
                  {p.length > 35 ? p.slice(0, 35) + "…" : p}
                </button>
              ))}
            </div>
          )}

          <div
            className="flex items-end gap-3 rounded-xl px-4 py-3"
            style={{ backgroundColor: "#1A1F24", border: "1px solid #2A2F35" }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={isLimited}
              placeholder={isLimited ? "Upgrade to Pro to continue chatting…" : "Ask anything about your career…"}
              rows={1}
              className="flex-1 resize-none bg-transparent outline-none text-sm leading-relaxed"
              style={{
                color: "#FFFFFF",
                caretColor: "#4ADE80",
                maxHeight: 120,
                overflowY: "auto",
              }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = Math.min(el.scrollHeight, 120) + "px";
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isBusy || isLimited}
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all active:scale-95"
              style={{
                background:
                  !input.trim() || isBusy || isLimited
                    ? "rgba(255,255,255,0.06)"
                    : "linear-gradient(135deg,#4ADE80,#22C55E)",
                color:
                  !input.trim() || isBusy || isLimited ? "#4B5563" : "#111418",
              }}
            >
              {isBusy ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-[10px] text-center mt-2" style={{ color: "#374151" }}>
            Press Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
