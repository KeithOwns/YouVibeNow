# Architecture Decision Records (ADRs)

This folder captures decisions that had real alternatives and lasting consequences — the *why*
behind a choice. It is deliberately separate from the other two records:

- **Git commit history** — the play-by-play: every individual change, as it happened.
- **`HISTORY.md`** — a terse, Keep-a-Changelog-style summary of notable *shipped* changes.
- **`docs/adr/`** (here) — the *why*, for decisions with real alternatives and consequences.

## When to write one

Write an ADR when a decision:
- had genuine alternatives that were considered and rejected, and
- would mislead or confuse a future reader (human or AI agent) if they didn't know why the
  rejected alternatives weren't chosen.

Routine fixes, content edits, and refactors do **not** need an ADR — log those tersely in
`HISTORY.md` and let the commit message carry the detail.

## Format

One file per decision: `NNNN-short-title.md`, numbered sequentially. Never renumber or delete —
a reversed or superseded decision gets a *new* ADR that links back, with the old one's `Status`
updated to `Superseded by ADR-NNNN`.

```markdown
# ADR-NNNN: Title

Date: YYYY-MM-DD
Status: Proposed | Accepted | Deferred | Superseded by ADR-NNNN

## Context
What problem forced this decision.

## Decision
What was chosen.

## Alternatives considered
What else was on the table, and why it lost.

## Consequences
What this commits us to, and any known tradeoffs/follow-ups.
```

No ADRs exist yet in this repo — none of the work to date has involved a decision with real
rejected alternatives worth recording. The first one goes here when that changes.
