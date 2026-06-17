# /teach — Copilot CLI Extension

A [Copilot CLI](https://githubnext.com/projects/copilot-cli/) extension that adds a `/teach` slash command. When invoked, it generates a beautiful, self-contained HTML lesson on any topic and opens it in a browser canvas side panel.

## Usage

```
/teach CSS Grid
/teach how to solve a Rubik's cube
/teach the basics of Git rebasing
```

## Installation

Copy the `extension.mjs` file into your Copilot CLI extensions directory:

```bash
# User-scoped (available in all projects)
mkdir -p ~/.copilot/extensions/teach
cp extension.mjs ~/.copilot/extensions/teach/

# Or project-scoped
mkdir -p .github/extensions/teach
cp extension.mjs .github/extensions/teach/
```

Then reload extensions in Copilot CLI (run `/clear` or restart).

## How It Works

The extension registers an `onUserPromptSubmitted` hook that intercepts prompts starting with `/teach`. It rewrites the prompt to instruct the agent to:

1. Generate a complete, styled HTML lesson on the requested topic
2. Save it to a temporary file
3. Open it in a browser canvas for side-by-side viewing

## License

MIT
