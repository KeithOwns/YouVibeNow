import React, { useState, useEffect, useCallback } from "react";

// ---- utilities ----
const todayKey = () => new Date().toISOString().slice(0, 10);
const fmtDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

const MOODS = ["😞", "😕", "😐", "🙂", "😄"];
const PROMPTS = [
  "What's the one thing that would make today a win?",
  "What drained you yesterday, and how do you avoid it today?",
  "Name one small thing you're proud of this week.",
  "What are you avoiding right now?",
  "Who could you reach out to today?",
  "What's a rule you're ready to break?",
];

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ---- storage helpers ----
async function loadState() {
  try {
    const res = await window.storage.get("life-coach:state");
    return res ? JSON.parse(res.value) : null;
  } catch {
    return null;
  }
}
async function saveState(state) {
  try {
    await window.storage.set("life-coach:state", JSON.stringify(state));
  } catch (e) {
    console.error("save failed", e);
  }
}

const emptyState = () => ({
  goals: [],
  entries: {}, // dateKey -> { mood, intention, reflection }
  coachNotes: {}, // dateKey -> suggested next step text
});

// ---- coach: ask Claude for one concrete next step, given the user's data ----
async function fetchNextStep(context) {
  const prompt = `You are a direct, warm personal life coach. Based on the person's current data below, tell them the ONE next step they should take right now. Be specific and concrete, not generic. 1-2 short sentences, imperative voice, no preamble, no hedging, no "consider" or "maybe". If there isn't much data yet, encourage a specific first action (like setting one goal or doing today's check-in) rather than something vague.

DATA:
${context}

Respond with only the next step, nothing else.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 200,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await response.json();
  const text = (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join(" ")
    .trim();
  if (!text) throw new Error("empty response");
  return text;
}

function buildCoachContext(state, todayKeyStr) {
  const goals = state.goals || [];
  const active = goals.filter((g) => !g.done).map((g) => `- ${g.text}`);
  const done = goals.filter((g) => g.done).map((g) => `- ${g.text}`);

  const last7 = [];
  let d = new Date(todayKeyStr + "T00:00:00");
  for (let i = 0; i < 7; i++) {
    const k = d.toISOString().slice(0, 10);
    const e = state.entries[k];
    if (e) {
      last7.push(
        `${k}: mood=${e.mood != null ? MOODS[e.mood] : "n/a"}${
          e.intention ? `, intention="${e.intention}"` : ""
        }${e.reflection ? `, reflection="${e.reflection}"` : ""}`
      );
    }
    d.setDate(d.getDate() - 1);
  }

  return [
    `Active goals:\n${active.length ? active.join("\n") : "(none set)"}`,
    `Completed goals:\n${done.length ? done.join("\n") : "(none yet)"}`,
    `Recent check-ins (most recent first):\n${last7.length ? last7.join("\n") : "(no entries yet)"}`,
  ].join("\n\n");
}

export default function LifeCoach() {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("today");
  const [newGoal, setNewGoal] = useState("");
  const [promptIdx] = useState(() => Math.floor(Math.random() * PROMPTS.length));
  const [coachLoading, setCoachLoading] = useState(false);
  const [coachError, setCoachError] = useState(false);

  useEffect(() => {
    (async () => {
      const loaded = (await loadState()) || emptyState();
      if (!loaded.coachNotes) loaded.coachNotes = {};
      if (!loaded.seededAssessmentGoal) {
        loaded.goals = [
          {
            id: uid(),
            text: "Define and hit one aiit.support outcome this month (client target, revenue number, or offer launch)",
            done: false,
            created: todayKey(),
          },
          ...loaded.goals,
        ];
        const tKey = todayKey();
        loaded.entries[tKey] = {
          ...loaded.entries[tKey],
          intention:
            loaded.entries[tKey]?.intention ||
            "Prioritize aiit.support above PatchW11, YouTube, and MCP experiments today.",
        };
        loaded.seededAssessmentGoal = true;
        await saveState(loaded);
      }
      setState(loaded);
      setLoading(false);
      if (!loaded.coachNotes[todayKey()]) {
        requestNextStep(loaded);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestNextStep = useCallback(async (stateForContext) => {
    setCoachLoading(true);
    setCoachError(false);
    try {
      const context = buildCoachContext(stateForContext, todayKey());
      const text = await fetchNextStep(context);
      persist((prev) => ({
        ...prev,
        coachNotes: { ...prev.coachNotes, [todayKey()]: text },
      }));
    } catch (e) {
      console.error("coach fetch failed", e);
      setCoachError(true);
    } finally {
      setCoachLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = useCallback((updater) => {
    setState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveState(next);
      return next;
    });
  }, []);

  if (loading || !state) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-neutral-500 font-mono text-sm tracking-wide">
          loading field notes…
        </div>
      </div>
    );
  }

  const key = todayKey();
  const today = state.entries[key] || { mood: null, intention: "", reflection: "" };
  const goals = state.goals || [];
  const activeGoals = goals.filter((g) => !g.done);
  const doneGoals = goals.filter((g) => g.done);

  // streak: consecutive days (including today) with any entry
  const streak = (() => {
    let count = 0;
    let d = new Date();
    while (true) {
      const k = d.toISOString().slice(0, 10);
      const e = state.entries[k];
      if (e && (e.mood != null || e.intention || e.reflection)) {
        count++;
        d.setDate(d.getDate() - 1);
      } else break;
    }
    return count;
  })();

  const updateToday = (patch) => {
    persist((prev) => ({
      ...prev,
      entries: { ...prev.entries, [key]: { ...prev.entries[key], ...today, ...patch } },
    }));
  };

  const addGoal = () => {
    const text = newGoal.trim();
    if (!text) return;
    persist((prev) => {
      const next = {
        ...prev,
        goals: [{ id: uid(), text, done: false, created: key }, ...prev.goals],
      };
      requestNextStep(next);
      return next;
    });
    setNewGoal("");
  };

  const toggleGoal = (id) =>
    persist((prev) => {
      const next = {
        ...prev,
        goals: prev.goals.map((g) => (g.id === id ? { ...g, done: !g.done } : g)),
      };
      requestNextStep(next);
      return next;
    });

  const removeGoal = (id) =>
    persist((prev) => ({ ...prev, goals: prev.goals.filter((g) => g.id !== id) }));

  const history = Object.entries(state.entries)
    .filter(([, v]) => v.mood != null || v.intention || v.reflection)
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .slice(0, 21);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans">
      <div className="max-w-md mx-auto px-5 pt-8 pb-24">
        {/* header */}
        <div className="flex items-baseline justify-between mb-1">
          <h1 className="text-[13px] tracking-[0.2em] uppercase text-amber-500 font-mono">
            Field Notes
          </h1>
          <span className="text-[11px] font-mono text-neutral-600">
            {streak > 0 ? `${streak}d streak` : "no streak yet"}
          </span>
        </div>
        <p className="text-2xl font-semibold text-neutral-50 mb-5 tracking-tight">
          {fmtDate(key)}
        </p>

        {/* next step */}
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/[0.03] border border-amber-500/20 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] uppercase tracking-wider text-amber-500 font-mono">
              Next step
            </span>
            <button
              onClick={() => requestNextStep(state)}
              disabled={coachLoading}
              className="text-[11px] font-mono text-neutral-500 hover:text-amber-400 disabled:opacity-40 transition-colors"
            >
              {coachLoading ? "thinking…" : "↻ new take"}
            </button>
          </div>
          {coachLoading ? (
            <p className="text-sm text-neutral-500 italic">Reading your notes…</p>
          ) : coachError ? (
            <p className="text-sm text-neutral-500">
              Couldn't reach the coach right now.{" "}
              <button
                onClick={() => requestNextStep(state)}
                className="text-amber-400 underline underline-offset-2"
              >
                Try again
              </button>
            </p>
          ) : (
            <p className="text-sm text-neutral-200 leading-relaxed">
              {state.coachNotes?.[key] || "Do today's check-in to get your first next step."}
            </p>
          )}
        </div>

        {/* tabs */}
        <div className="flex gap-1 mb-6 border-b border-neutral-800">
          {[
            ["today", "Today"],
            ["goals", `Goals ${activeGoals.length ? `(${activeGoals.length})` : ""}`],
            ["history", "History"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={
                "px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors " +
                (tab === id
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-neutral-500 hover:text-neutral-300")
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* TODAY */}
        {tab === "today" && (
          <div className="space-y-6">
            <section>
              <div className="text-[11px] uppercase tracking-wider text-neutral-500 mb-2 font-mono">
                Mood check
              </div>
              <div className="flex justify-between bg-neutral-900 rounded-xl p-2 border border-neutral-800">
                {MOODS.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => updateToday({ mood: i })}
                    className={
                      "text-2xl w-11 h-11 rounded-lg flex items-center justify-center transition-all " +
                      (today.mood === i
                        ? "bg-amber-500/20 scale-110 ring-1 ring-amber-500/50"
                        : "hover:bg-neutral-800 opacity-60 hover:opacity-100")
                    }
                  >
                    {m}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <div className="text-[11px] uppercase tracking-wider text-neutral-500 mb-2 font-mono">
                Today's intention
              </div>
              <textarea
                value={today.intention}
                onChange={(e) => updateToday({ intention: e.target.value })}
                placeholder="What matters most today?"
                rows={2}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm resize-none placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50"
              />
            </section>

            <section>
              <div className="text-[11px] uppercase tracking-wider text-neutral-500 mb-2 font-mono">
                Reflection · {PROMPTS[promptIdx]}
              </div>
              <textarea
                value={today.reflection}
                onChange={(e) => updateToday({ reflection: e.target.value })}
                placeholder="Write a few honest lines…"
                rows={4}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm resize-none placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50"
              />
            </section>
          </div>
        )}

        {/* GOALS */}
        {tab === "goals" && (
          <div className="space-y-5">
            <div className="flex gap-2">
              <input
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addGoal()}
                placeholder="Add a goal…"
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-sm placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50"
              />
              <button
                onClick={addGoal}
                className="px-4 rounded-xl bg-amber-500 text-neutral-950 text-sm font-semibold hover:bg-amber-400 transition-colors"
              >
                Add
              </button>
            </div>

            {activeGoals.length === 0 && doneGoals.length === 0 && (
              <p className="text-sm text-neutral-600 text-center py-8">
                No goals yet. What are you working toward?
              </p>
            )}

            {activeGoals.length > 0 && (
              <div className="space-y-2">
                {activeGoals.map((g) => (
                  <GoalRow key={g.id} goal={g} onToggle={toggleGoal} onRemove={removeGoal} />
                ))}
              </div>
            )}

            {doneGoals.length > 0 && (
              <div>
                <div className="text-[11px] uppercase tracking-wider text-neutral-600 mb-2 mt-4 font-mono">
                  Completed
                </div>
                <div className="space-y-2">
                  {doneGoals.map((g) => (
                    <GoalRow key={g.id} goal={g} onToggle={toggleGoal} onRemove={removeGoal} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* HISTORY */}
        {tab === "history" && (
          <div className="space-y-3">
            {history.length === 0 && (
              <p className="text-sm text-neutral-600 text-center py-8">
                Your check-ins will show up here.
              </p>
            )}
            {history.map(([dateKey, e]) => (
              <div
                key={dateKey}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-3"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-neutral-500">{fmtDate(dateKey)}</span>
                  {e.mood != null && <span className="text-lg">{MOODS[e.mood]}</span>}
                </div>
                {e.intention && (
                  <p className="text-sm text-neutral-300 mb-1">
                    <span className="text-neutral-600">Intention: </span>
                    {e.intention}
                  </p>
                )}
                {e.reflection && (
                  <p className="text-sm text-neutral-400 leading-relaxed">{e.reflection}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function GoalRow({ goal, onToggle, onRemove }) {
  return (
    <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 group">
      <button
        onClick={() => onToggle(goal.id)}
        className={
          "w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors " +
          (goal.done
            ? "bg-amber-500 border-amber-500 text-neutral-950"
            : "border-neutral-600 hover:border-amber-500")
        }
      >
        {goal.done && "✓"}
      </button>
      <span
        className={
          "text-sm flex-1 " + (goal.done ? "line-through text-neutral-600" : "text-neutral-200")
        }
      >
        {goal.text}
      </span>
      <button
        onClick={() => onRemove(goal.id)}
        className="text-neutral-700 hover:text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ✕
      </button>
    </div>
  );
}
