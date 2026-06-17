# /teach — Copilot CLI Extension

A [Copilot CLI](https://githubnext.com/projects/copilot-cli/) extension that adds a `/teach` slash command. It integrates the **teach skill** methodology — mission-driven, stateful learning with lessons, learning records, resources, and reference documents — and automatically opens HTML lessons in a browser canvas side panel.

## Usage

```
/teach CSS Grid
/teach how to solve a Rubik's cube
/teach the basics of Git rebasing
```

## How It Works

When you type `/teach <topic>`, the extension:

1. Intercepts the prompt via an `onUserPromptSubmitted` hook
2. Loads the full **teach skill** methodology from `~/.agents/skills/teach/` (SKILL.md and all format files)
3. Injects it as `additionalContext` so the agent follows the skill's pedagogy — missions, zone of proximal development, knowledge/skills/wisdom framework, learning records, etc.
4. Adds a rule requiring the agent to open lesson HTML files in a **browser canvas** for side-by-side viewing

## Prerequisites

The extension expects the [teach skill](https://github.com/mattpocock/skills) by [Matt Pocock](https://github.com/mattpocock) at `~/.agents/skills/teach/`:

```
~/.agents/skills/teach/
  SKILL.md
  MISSION-FORMAT.md
  RESOURCES-FORMAT.md
  LEARNING-RECORD-FORMAT.md
  GLOSSARY-FORMAT.md
```

If the skill files are missing, the extension still works — it just won't inject the methodology context.

## Installation

```bash
# User-scoped (available in all projects)
mkdir -p ~/.copilot/extensions/teach
cp extension.mjs ~/.copilot/extensions/teach/
```

Then reload extensions in Copilot CLI (run `/clear` or restart).

## Credits

The teaching methodology used by this extension is the **teach skill** by [Matt Pocock](https://github.com/mattpocock), from [mattpocock/skills](https://github.com/mattpocock/skills). It provides the mission-driven, stateful learning framework — including lessons, learning records, zone of proximal development, and the knowledge/skills/wisdom philosophy.

## License

MIT
