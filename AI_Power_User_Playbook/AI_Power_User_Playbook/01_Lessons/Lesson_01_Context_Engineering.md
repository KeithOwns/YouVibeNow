# Lesson 1: Context Engineering

Now that we have unlearned the myth of micromanaging the AI in [[Lesson_00_Primer]], we must learn the new paradigm: **Context Engineering**.

This methodology is built heavily on the philosophy of **Andrej Karpathy** (former Director of AI at Tesla and founding member of OpenAI). Karpathy is arguably the leading authority on how human-AI interaction is evolving.

In 2023, Karpathy famously tweeted, *"The hottest new programming language is English."* His point was that we no longer need to write rigid, complex code (or rigid, complex prompts); we just need to state our goals. More recently, in 2025, he formally endorsed shifting away from "Prompt Engineering" entirely in favor of "Context Engineering."

## What is Context Engineering?
Karpathy defines Context Engineering as: *"The delicate art and science of filling the context window with just the right information for the next step."* (See [[01_Context_Engineering]] for the core theory).

> [!NOTE]
> **Prompt Engineering** is trying to force an empty, blank-slate AI to do something complex by writing a massive, complicated prompt.
> **Context Engineering** is building a background identity and system so that the AI already knows who you are and what you want. Your actual daily prompts become incredibly short.

## Thin Prompting
When your context is engineered properly (which we will do in [[Lesson_02_The_Baseline]] and [[Lesson_03_Digital_Twin]]), you enable **Thin Prompting**. 

Thin prompting is the practice of giving the AI brief, high-level, goal-oriented instructions. Because the AI already has all the context it needs running in the background, you just say "Draft the project plan" and it knows exactly how you want it formatted and what tone to use.

## Adam's Law
Why is Thin Prompting better? This is explained by **Adam's Law**: 
*Prompts crafted with simple, natural language yield smarter and more effective results from modern LLMs than overly complex, rigid prompts.*

By speaking to the AI naturally (Thin Prompting), you allow its sophisticated internal reasoning engine to take the lead. You aren't forcing it into a brittle constraint; you are unleashing its intelligence.

Next, we will look at how to actually engineer this context inside ChatGPT itself.

**Next:** [[Lesson_02_The_Baseline]]
