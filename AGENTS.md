# AGENTS.md

## Purpose

This file defines simple working rules for AI-assisted development of this repository.

The goal is to keep changes understandable, small, testable, and easy to review without adding unnecessary process.

## Working rules

1. Start with the minimum context needed for the current task.
2. Read additional files only when the task actually requires them.
3. Prefer small, focused changes over broad rewrites.
4. Do not change unrelated files or behavior.
5. Before editing, understand the current implementation and the requested scope.
6. After a change, run the smallest relevant validation or test available.
7. If the result of a write or deployment is uncertain, verify the real state before retrying.
8. Do not hide failures. Report what failed and what remains unknown.
9. Keep user-facing results concise:
   - what changed,
   - what was tested,
   - whether it passed,
   - what the next useful step is.
10. Preserve easy rollback whenever a change could affect working functionality.

## Change modes

### READ-ONLY

Use for inspection, diagnosis, planning, review, and understanding the current project state.

No project files are changed.

### CONTROLLED CHANGE

Use for a clear, bounded implementation request.

Preferred flow:

context → inspect → change → validate → report

If a larger or risky change is needed, stop and explain why before expanding the scope.

## Context discipline

- Do not load or summarize the whole repository unless necessary.
- Prefer the file or folder directly relevant to the task.
- Do not repeat large amounts of project history in every response.
- If a work thread becomes long or mixes several stages, produce a short handoff containing only:
  - current goal,
  - what is done,
  - open issue,
  - exact next step.

## Project principle

This repository should stay simpler than the problem it solves.

Do not introduce new frameworks, services, abstractions, automation, or documentation layers unless they provide a clear practical benefit to the current project.


## Media-to-web workflow

When a task asks to generate or edit media **and** implement it into the website, the task is not complete at media generation.

Required flow:

1. Work only on the branch explicitly named by the user; for the current live redesign this is `feature/redesign-v2`.
2. Generate the approved image/video with the requested media tool. Prefer Higgsfield when the goal is to demonstrate the Higgsfield workflow.
3. Store the resulting asset in the repository as a plain .webp file in `assets/img/`.
4. Update the relevant HTML/CSS/JS so the asset is actually used on the site.
5. Verify the target branch, asset paths, page references, responsive behavior when relevant, and that no replaced placeholder remains.
6. Commit the implementation.
7. Only then report the step as complete.

For the key-shelf project, also follow `docs/key-shelf-master-plan.md`.

Do not stop after producing a media asset when the user's task includes website implementation.


## Vychytávky media-to-web workflow

For tutorial/project work, `feature/redesign-v2` is the source-of-truth branch unless the user explicitly names another branch.

When a task asks for a new tutorial visual, Higgsfield asset, image-to-video clip, or other media **and** asks to integrate it into the website, the task is not complete after generation.

Required flow:

1. Inspect the current target page and existing approved master visual.
2. Create the minimum necessary media. Prefer Higgsfield MCP for workflows that must continue directly into repository edits.
3. Keep product identity consistent with the approved master: geometry, wood, proportions, metal parts, hook count, tray, and magnet position.
4. Store final website assets in this repository. Do not leave a temporary/external generation URL as the final site dependency.
5. Update the relevant HTML and, only when needed, CSS/JS.
6. Remove/replace the placeholder for that exact step.
7. Validate paths, page structure, responsive behavior, and that previously approved steps still remain intact.
8. Verify the real state on `feature/redesign-v2` after writes.
9. Report the commit(s) and validation result.
10. Do not start the next visual step until the current one is integrated and validated.

### Definition of done for a tutorial step

A tutorial step is DONE only when all applicable items are true:

- approved image/video exists,
- asset is stored in the repository,
- target page references the new asset,
- placeholder/external temporary asset is removed,
- required controls (for example “▶ Pozrieť pohyb”) work,
- desktop/mobile behavior is reasonable,
- validation passes on `feature/redesign-v2`,
- changes are committed.

### Higgsfield credit discipline

- Estimate cost before paid MCP generation when possible.
- Start with one image generation and one short video generation.
- Retry only after identifying a concrete defect worth spending more credits on.
- Reuse the approved master/reference media instead of regenerating the product identity.


### Tool availability preflight

Before claiming that GitHub or Higgsfield tools are unavailable, the agent MUST inspect the deferred connector catalog through Code Mode (`ALL_TOOLS`) for:
- `mcp__GitHub__*`
- `mcp__Higgsfield__*`

A shallow check of only the visible top-level tool list is not sufficient.

For Vychytávky media-to-web tasks, do NOT use the standalone ChatGPT image generation tool as the first execution step when the same request also requires repository integration. That tool is a terminal-style image workflow and can interrupt the rest of the implementation chain.

Use the Higgsfield connector for image/video generation when the output must continue into:
Higgsfield → repository asset → HTML/CSS/JS → validation → commit.

If the required connector truly is missing after an `ALL_TOOLS` check, then report the limitation. Otherwise continue the implementation and do not stop after media generation.

### Hard execution gate for master-workflow requests

For requests such as `Implementuj ... podľa master workflowu`:

1. The FIRST execution step must be a Code Mode `ALL_TOOLS` check for the required GitHub and Higgsfield connectors.
2. Do not infer connector availability from the visible top-level tool list.
3. If the required connectors are present, continue the implementation in the same task; do not return a capability-limit response.
4. Do not call standalone ChatGPT ImageGen for this workflow. Use Higgsfield MCP for media that must continue into repository edits.
5. Do not send the final user-facing completion message until either:
   - the media is integrated, validated, and committed to the requested branch, or
   - a real connector/API error has occurred after an attempted tool call, in which case report that concrete error.


## Connector availability invariant

For this project, GitHub and Higgsfield MCP connectors are expected to be available unless an actual `ALL_TOOLS` check proves otherwise.

Before any statement that these connectors are unavailable:
1. inspect `ALL_TOOLS` through Code Mode,
2. verify the exact required actions,
3. if they are present, use them and continue the task,
4. report a limitation only after a real connector/API call fails.

For requests that say `implementuj`, `zapracuj`, or `podľa master workflowu`, connector preflight is mandatory and must happen before any user-facing capability claim.

Do not rely on the visible top-level tool list as evidence of connector availability.
