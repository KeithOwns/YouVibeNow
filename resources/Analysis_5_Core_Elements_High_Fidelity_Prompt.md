# Analysis: The 5 Core Elements of a High-Fidelity Prompt

> **Provenance:** Reconstructed 2026-06-29 from the Gemini chat log ("Analysis of High-Fidelity
> Prompt Elements", originally a vector-outline PDF with no extractable text). Substance preserved;
> over-reaching claims flagged in **Critical notes**.

## Terminology

"Good" prompt → prefer a precise adjective:
- **Deterministic** — for programmatic, repeatable execution.
- **High-Fidelity** — for maximum context preservation and fewer hallucinations *(the chosen term)*.
- Other candidates: High-Leverage, Performant.

## The five elements (outside-in order)

The claim is that a prompt is most reliable when structured **outside-in** — the most important
framing at the very start and very end, detail in the middle:

1. **Role / Persona** — who the model is acting as (prefix; sets the whole reasoning frame).
2. **Task / Objective** — the single concrete goal.
3. **Context / Inputs** — supporting material, files, constraints (the bulk; sits in the middle).
4. **Format / Output contract** — exact shape of the expected answer.
5. **Guardrails / Reinforcement** — what to avoid, plus a restatement of the key constraint
   (suffix; catches the model's attention on the way out).

The ordering rationale: models attend most strongly to the **beginning and end** of a prompt, so
the highest-stakes instructions (Role, Guardrails) are placed at those boundaries, and the
verbose-but-lower-stakes Context is parked in the middle.

## Why it maps to the file system

Each element can be pushed into the **Stateful Prompting Hierarchy** so the live prompt stays thin:
Role/Guardrails live in `CLAUDE.md`/`GEMINI.md`; Context lives in project docs and auto-memory; the
daily prompt only needs the Task. See [[Stateful_Prompting_Hierarchy]].

## Critical notes (read before treating this as gospel)

- **The boundary effect is real but it's a heuristic, not a law.** It rests on genuine findings —
  *Lost in the Middle* (Liu et al., 2023) and attention sinks (Xiao et al., 2023, StreamingLLM).
  The exact 5 elements and their strict order are a useful convention, **not** something the math
  mandates.
- **It still applies to modern long-context models.** Don't over-discount it — the mid-context
  accuracy dip persists even in current frontier models, though instruction tuning softens it.
- The mechanism is detailed (and partly corrected) in
  [[Analysis_Mathematical_Mechanics_High_Fidelity]].
