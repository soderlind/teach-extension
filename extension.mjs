// Extension: teach
// Intercepts /teach commands and opens HTML output in a browser canvas

import { joinSession } from "@github/copilot-sdk/extension";

const session = await joinSession({
    hooks: {
        onUserPromptSubmitted: async (input) => {
            const match = input.prompt.match(/^\/teach\s+(.*)/s);
            if (!match) return;

            const topic = match[1].trim();

            return {
                modifiedPrompt: `The user asked to learn about: "${topic}"

Create a single, self-contained HTML file that teaches this topic. The HTML must:
- Be a complete, valid HTML document with inline CSS and JS (no external dependencies)
- Have a modern, visually appealing design with good typography and spacing
- Use a clean color scheme (dark header, light content area)
- Include clear headings, explanations, and practical code examples where relevant
- Use syntax highlighting for code blocks (inline CSS-based)
- Be educational and well-structured with sections

Save the HTML file to a temporary location using bash (e.g. /tmp/teach-<slug>.html where <slug> is a short kebab-case version of the topic), then open it in a browser canvas using open_canvas with canvasId "browser" and the file URL (file:///tmp/teach-<slug>.html). Use a unique instanceId like "teach-<slug>".

IMPORTANT: You MUST open the browser canvas after writing the file. Do not just show the HTML in chat.`,
            };
        },
    },
    tools: [],
});
