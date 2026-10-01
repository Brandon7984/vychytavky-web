# Key shelf master plan

Branch: `feature/redesign-v2`

Goal: Build the second Vychytávky project ("Polička na kľúče") while demonstrating a practical ChatGPT + GitHub/Codex-role + Higgsfield workflow.

## Persistent rule

A project step is complete only when its approved media is implemented in the website and verified on `feature/redesign-v2`. Generating an image or video alone is not completion.

## Current state

- [x] Key-shelf project page exists.
- [x] Approved master product visual is integrated.
- [x] Step 1: paper planning / dimensions visual is integrated.
- [x] Step 2: cut wooden parts visual is integrated.
- [ ] Step 6: Higgsfield reference-based still image of hooks + magnetic section.
- [ ] Step 6: Higgsfield 5–8 s image-to-video clip.
- [ ] Step 6: still + video integrated into `key-shelf.html`.
- [ ] Step 6: responsive video UI and "▶ Pozrieť pohyb" interaction verified.
- [ ] Remaining steps 3, 4, 5, 7 produced and integrated with the same product identity.

## Step 6 acceptance criteria

1. Use the approved master product visual as a reference input.
2. Preserve the same light oak, proportions, five black hooks, upper shelf, lower tray, right-side black magnetic strip, and overall design.
3. Create one photorealistic Higgsfield still that clearly shows installation/use of hooks and the magnetic section.
4. Create one short 5–8 second Higgsfield image-to-video clip with realistic hand/key movement and no product morphing.
5. Preflight Higgsfield credit cost before generation; avoid unnecessary retries.
6. Put the approved image and video into the repo using the existing asset strategy.
7. Replace the Step 6 placeholder in `key-shelf.html`.
8. Add a responsive "▶ Pozrieť pohyb" video affordance; no audible autoplay, use `muted` and `playsinline`, and use the still as poster when practical.
9. Verify paths, branch, desktop/mobile layout, and that Steps 1 and 2 remain unchanged.
10. Commit all changes before reporting completion.
