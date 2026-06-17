// Extension: teach
// Intercepts /teach commands, injects the teach skill methodology,
// and instructs the agent to open HTML lessons in a browser canvas.

import { joinSession } from "@github/copilot-sdk/extension";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const SKILL_DIR = join(
	process.env.HOME,
	".agents",
	"skills",
	"teach",
);

async function loadSkillFiles() {
	const files = [
		"SKILL.md",
		"MISSION-FORMAT.md",
		"RESOURCES-FORMAT.md",
		"LEARNING-RECORD-FORMAT.md",
		"GLOSSARY-FORMAT.md",
	];
	const sections = [];
	for (const f of files) {
		try {
			let content = await readFile(join(SKILL_DIR, f), "utf-8");
			// Strip YAML frontmatter from SKILL.md
			if (f === "SKILL.md") {
				content = content.replace(/^---[\s\S]*?---\n*/, "");
			}
			sections.push(`## ${f}\n\n${content.trim()}`);
		} catch {
			// File missing — skip silently
		}
	}
	return sections.join("\n\n---\n\n");
}

const skillContext = await loadSkillFiles();

const session = await joinSession({
	hooks: {
		onUserPromptSubmitted: async (input) => {
			const match = input.prompt.match(/^\/teach\s+(.*)/s);
			if (!match) return;

			const topic = match[1].trim();

			return {
				modifiedPrompt: topic,
				additionalContext: `<teach-skill>
${skillContext}

---

## Browser Canvas Rule

After creating any lesson HTML file (in ./lessons/), you MUST open it in a
browser canvas so the user can read it side-by-side with the chat.

Use open_canvas with:
- canvasId: "browser"
- instanceId: "teach-lesson" (reuse this to replace the previous lesson)
- input.url: the file:// URL pointing to the lesson HTML file
- input.title: the lesson title

Do NOT just show the HTML in chat. Always open the canvas.
</teach-skill>`,
			};
		},
	},
	tools: [],
});

