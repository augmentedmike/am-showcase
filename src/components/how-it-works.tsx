"use client";

import { useEffect, useState } from "react";

type Priority = "critical" | "high" | "normal" | "low";

const PRIORITY_STYLES: Record<Priority, { label: string; bg: string; text: string; border: string }> = {
  critical: { label: "critical", bg: "rgba(239,68,68,0.12)",   text: "#f87171", border: "rgba(239,68,68,0.25)" },
  high:     { label: "high",     bg: "rgba(249,115,22,0.12)",  text: "#fb923c", border: "rgba(249,115,22,0.25)" },
  normal:   { label: "normal",   bg: "rgba(113,113,122,0.15)", text: "#a1a1aa", border: "rgba(113,113,122,0.25)" },
  low:      { label: "low",      bg: "rgba(63,63,70,0.15)",    text: "#71717a", border: "rgba(63,63,70,0.25)" },
};

const COLUMN_ACCENTS = [
  { key: "backlog",    label: "Backlog",     dot: "#52525b", header: "#a1a1aa", border: "rgba(82,82,91,0.4)",   activeBorder: "rgba(82,82,91,0.9)" },
  { key: "inProgress", label: "In Progress", dot: "#00E5FF", header: "#00E5FF", border: "rgba(0,229,255,0.2)",  activeBorder: "rgba(0,229,255,0.7)" },
  { key: "inReview",   label: "In Review",   dot: "#f59e0b", header: "#fbbf24", border: "rgba(245,158,11,0.2)", activeBorder: "rgba(245,158,11,0.7)" },
  { key: "shipped",    label: "Shipped",     dot: "#22c55e", header: "#4ade80", border: "rgba(34,197,94,0.2)",  activeBorder: "rgba(34,197,94,0.7)" },
];

const COLUMN_CARDS = [
  [
    { title: "Homepage redesign", priority: "high" as Priority },
    { title: "Analytics dashboard", priority: "normal" as Priority },
    { title: "Mobile nav fix", priority: "low" as Priority },
  ],
  [
    { title: "API rate-limit handler", priority: "critical" as Priority },
    { title: "Search autocomplete", priority: "high" as Priority },
  ],
  [
    { title: "Auth flow refactor", priority: "high" as Priority },
    { title: "Dark mode tokens", priority: "normal" as Priority },
  ],
  [
    { title: "CI/CD pipeline", priority: "normal" as Priority },
    { title: "Onboarding emails", priority: "low" as Priority },
  ],
];

const STEPS = [
  {
    number: "01",
    title: "Assign work",
    body: "Drop a task into the backlog. AM reads the brief, gathers context, and writes acceptance criteria before touching any code.",
  },
  {
    number: "02",
    title: "AM executes",
    body: "AM works autonomously through each board state — researching, implementing, and verifying — one commit at a time.",
  },
  {
    number: "03",
    title: "You review and ship",
    body: "When criteria are met, AM flags the card for review. You approve, and a single clean commit lands on main.",
  },
];

function PriorityBadge({ priority }: { priority: Priority }) {
  const style = PRIORITY_STYLES[priority] ?? PRIORITY_STYLES.normal;
  return (
    <span
      className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wide shrink-0"
      style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}
    >
      {style.label}
    </span>
  );
}

function KanbanCard({
  title,
  priority,
  isActive,
}: {
  title: string;
  priority: Priority;
  isActive?: boolean;
}) {
  return (
    <div
      className="rounded-lg px-3 py-2.5"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: isActive
          ? "1px solid rgba(0,229,255,0.2)"
          : "1px solid rgba(255,255,255,0.06)",
        transition: "border-color 0.4s ease",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-zinc-200 leading-snug text-xs font-medium">{title}</span>
        <PriorityBadge priority={priority} />
      </div>
      {isActive && (
        <div className="flex items-center gap-1.5 mt-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span className="text-[10px] text-zinc-500">AM working</span>
        </div>
      )}
    </div>
  );
}

function KanbanColumn({
  colIndex,
  activeColIndex,
}: {
  colIndex: number;
  activeColIndex: number;
}) {
  const col = COLUMN_ACCENTS[colIndex];
  const cards = COLUMN_CARDS[colIndex];
  const isActive = colIndex === activeColIndex;

  return (
    <div
      className="flex flex-col min-w-[180px] flex-1 rounded-xl p-3"
      style={{
        background: "rgba(255,255,255,0.015)",
        border: `1px solid ${isActive ? col.activeBorder : col.border}`,
        opacity: isActive ? 1 : 0.55,
        transition: "border-color 0.5s ease, opacity 0.5s ease",
      }}
    >
      {/* Column header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="h-2 w-2 rounded-full shrink-0" style={{ background: col.dot }} />
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: col.header }}
        >
          {col.label}
        </span>
        <span className="ml-auto text-xs font-mono tabular-nums" style={{ color: "#52525b" }}>
          {cards.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2">
        {cards.map((card, i) => (
          <KanbanCard
            key={i}
            title={card.title}
            priority={card.priority}
            isActive={isActive && i === 0}
          />
        ))}
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="hidden lg:flex items-center justify-center shrink-0 px-1">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M3 8H13M9 4l4 4-4 4"
          stroke="#3f3f46"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function HowItWorks() {
  const [activeColIndex, setActiveColIndex] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveColIndex((prev) => (prev + 1) % 4);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="how-it-works" className="px-6 py-24 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <p
          className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
          style={{ color: "#00E5FF" }}
        >
          How it works
        </p>
        <h2
          className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6"
        >
          Your backlog, handled.
          <br />
          <span style={{ color: "#00E5FF" }}>End to end.</span>
        </h2>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "#777777" }}>
          AM picks up cards, writes the code, and ships clean commits — while you stay focused on what matters.
        </p>
      </div>

      {/* Kanban visualization */}
      <div className="overflow-x-auto pb-4 mb-14">
        <div className="flex gap-2 min-w-[640px] lg:min-w-0 lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
          {COLUMN_ACCENTS.map((_, i) => (
            <>
              <KanbanColumn key={i} colIndex={i} activeColIndex={activeColIndex} />
              {i < COLUMN_ACCENTS.length - 1 && <FlowArrow key={`arrow-${i}`} />}
            </>
          ))}
        </div>
      </div>

      {/* 3-step narrative */}
      <div className="grid sm:grid-cols-3 gap-6">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="rounded-2xl p-6"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="text-5xl font-bold mb-4 select-none"
              style={{ color: "rgba(0,229,255,0.12)", lineHeight: 1 }}
            >
              {step.number}
            </div>
            <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#777" }}>
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
