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
3. Store the resulting asset in the repository or in the repository's existing chunked-media format.
4. Update the relevant HTML/CSS/JS so the asset is actually used on the site.
5. Verify the target branch, asset paths, page references, responsive behavior when relevant, and that no replaced placeholder remains.
6. Commit the implementation.
7. Only then report the step as complete.

For the key-shelf project, also follow `docs/key-shelf-master-plan.md`.

Do not stop after producing a media asset when the user's task includes website implementation.
