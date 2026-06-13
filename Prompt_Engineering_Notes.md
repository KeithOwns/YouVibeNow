# Prompt Engineering and LLM Use Notes

## Model Selection
- **Speed vs. Capability:** The "Fast" (or Low) models, like Gemini 3.5 Fast, generate tokens significantly faster and have lower latency. They are great for simple tasks, quick text generation, or real-time needs.
- **Reliability for Code and Complex Tasks:** The "Pro" (or High) models, like Gemini 3.1 Pro, are much larger and more capable. They are specifically trained and optimized for complex reasoning, problem-solving, and difficult coding tasks. Always prefer the Pro models when reliability and logic are paramount.

## General Prompt Engineering Lessons
1. **Be Specific and Clear:** Clearly state the goal, context, and desired format of the output. 
2. **Provide Context:** The more relevant context you provide, the better the model can tailor its response to your specific situation.
3. **Chain of Thought:** For complex problems, ask the model to "think step-by-step" or break the problem down into smaller sub-tasks.
4. **Iterative Refinement:** Don't expect perfection on the first try. Use follow-up prompts to refine the output, correct mistakes, or add features.
5. **Role Prompting:** Assigning a role to the AI (e.g., "Act as an expert Python developer...") can help set the tone and structure of the response.
6. **Examples (Few-Shot Prompting):** Providing a few examples of desired inputs and outputs can significantly improve the model's accuracy and adherence to specific formats.
