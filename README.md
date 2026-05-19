# Nakaru Clash Arena

Nakaru Clash Arena is a deployable browser game built with HTML, CSS, JavaScript, and Three.js/WebGL. It is a 3D arena fighting game with original anime-inspired characters, CPU combat, health bars, meter, mobile controls, hit sparks, damage numbers, screen shake, dynamic camera movement, 3D projectiles, shadows, and cinematic ultimate effects.

## Legal Note

This project does not include copyrighted anime/game characters, names, logos, stages, music, moves, UI, or assets. All fighters and move names are original.

## Playable Features

- Main menu with Play, Character Select, Controls, and Credits
- Six original fighters:
  - Nakaru, the Undefined Wanderer and Thread/Code Fighter
  - Ember Kai
  - Luna Vey
  - Bolt Ren
  - Terra Jinn
  - Nova Saint
- Player vs CPU
- Health and meter bars
- Timer
- Jumping, dashing, blocking, knockback
- Basic attack, special attack, ranged energy blast, and ultimate
- CPU AI that follows, attacks, blocks, uses ranged attacks, and spends ultimate meter
- Mobile on-screen controls
- Victory/defeat screen and restart flow
- 3D WebGL arena with lighting, shadows, camera movement, and original placeholder fighter models

## Controls

- A / D: move
- Double tap A / D: dash
- W: jump
- S: block
- J: basic attack
- K: special attack
- L: energy blast
- U: ultimate when meter is full

## Nakaru Move Set

Nakaru is a dark-skinned original wanderer with long hair, a beard, a black Nakaru-San hoodie/sweatsuit, glowing thread-code aura, and a selectable straw hat or black headband look.

- Basic Attack: Thread Jab
- Special Attack: Syntax Break
- Ranged Attack: Code Thread Shot
- Dash Move: Undefined Step
- Block: Debug Guard
- Ultimate: Rewrite Reality

## Run Locally

Serve the folder with any static server. Because the game uses JavaScript modules and Three.js, a local server is better than opening `index.html` directly as a file.

Example with Node:

```bash
npx serve .
```

Then open the local URL shown by the server.

## Deploy

This is a static site. You can deploy the `nakaru-clash-arena` folder to:

- Vercel
- Netlify
- Render static site
- GitHub Pages
- IONOS static webspace

For Vercel or Netlify, drag and drop the `nakaru-clash-arena` folder or connect a GitHub repository containing these files at the root:

```text
index.html
styles.css
game.js
assets/
README.md
```

No backend or environment variables are required for version 1.

## Dependency

The game imports Three.js from jsDelivr:

```text
https://cdn.jsdelivr.net/npm/three@0.184.0/build/three.module.js
```

Make sure the deployed site has normal internet access so the browser can load that module.
