import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.184.0/build/three.module.js";

const canvas = document.querySelector("#gameCanvas");

const panels = {
  menu: document.querySelector("#menuPanel"),
  select: document.querySelector("#selectPanel"),
  controls: document.querySelector("#controlsPanel"),
  credits: document.querySelector("#creditsPanel"),
  result: document.querySelector("#resultPanel")
};

const ui = {
  playerName: document.querySelector("#playerName"),
  cpuName: document.querySelector("#cpuName"),
  playerHealthBar: document.querySelector("#playerHealthBar"),
  cpuHealthBar: document.querySelector("#cpuHealthBar"),
  playerMeterBar: document.querySelector("#playerMeterBar"),
  cpuMeterBar: document.querySelector("#cpuMeterBar"),
  playerMeterText: document.querySelector("#playerMeterText"),
  cpuMeterText: document.querySelector("#cpuMeterText"),
  timerText: document.querySelector("#timerText"),
  fighterGrid: document.querySelector("#fighterGrid"),
  selectedFighterText: document.querySelector("#selectedFighterText"),
  nakaruLookButton: document.querySelector("#nakaruLookButton"),
  introText: document.querySelector("#introText"),
  ultimateBanner: document.querySelector("#ultimateBanner"),
  resultTitle: document.querySelector("#resultTitle"),
  resultCopy: document.querySelector("#resultCopy")
};

const characters = {
  nakaru: {
    id: "nakaru",
    name: "Nakaru",
    title: "Undefined Wanderer",
    className: "Thread/Code Fighter",
    role: "Balanced technical fighter",
    difficulty: "Medium",
    description: "A mysterious wanderer who bends reality through glowing threads of code.",
    colors: { primary: "#0b0b12", secondary: "#6d28d9", accent: "#38bdf8", gold: "#facc15", skin: "#5a2f1d" },
    stats: { power: 7, speed: 8, defense: 6, range: 7 },
    moves: {
      basic: { name: "Thread Jab", damage: 8, range: 1.15, cooldown: 280, knockback: 4 },
      special: { name: "Syntax Break", damage: 16, range: 1.45, cooldown: 1200, stun: 500, knockback: 8 },
      blast: { name: "Code Thread Shot", damage: 10, speed: 11, cooldown: 650, knockback: 5 },
      dash: { name: "Undefined Step", distance: 2.6, cooldown: 700 },
      block: { name: "Debug Guard", damageReduction: 0.65 },
      ultimate: { name: "Rewrite Reality", damage: 38, range: 4.8, cooldown: 0, meterCost: 100, knockback: 18 }
    }
  },
  emberKai: {
    id: "ember-kai",
    name: "Ember Kai",
    title: "Cinder Striker",
    className: "Fire Brawler",
    description: "A close-range pressure fighter who turns every opening into a flame rush.",
    colors: { primary: "#2b0d07", secondary: "#ff5b36", accent: "#ffd166", gold: "#ffcc5c", skin: "#8a4b2b" },
    stats: { power: 8, speed: 6, defense: 5, range: 5 },
    moves: {
      basic: { name: "Cinder Hook", damage: 10, range: 1.05, cooldown: 330, knockback: 5 },
      special: { name: "Blaze Rush", damage: 17, range: 1.65, cooldown: 980, knockback: 9 },
      blast: { name: "Flare Shot", damage: 9, speed: 9, cooldown: 720, knockback: 5 },
      dash: { name: "Ash Step", distance: 1.9, cooldown: 700 },
      block: { name: "Coal Guard", damageReduction: 0.5 },
      ultimate: { name: "Inferno Break", damage: 37, range: 4.6, meterCost: 100, knockback: 16 }
    }
  },
  lunaVey: {
    id: "luna-vey",
    name: "Luna Vey",
    title: "Moonlit Duelist",
    className: "Moon Blade Fighter",
    description: "A graceful blade artist with swift footwork and silver arcs.",
    colors: { primary: "#201d3d", secondary: "#bca7ff", accent: "#eff6ff", gold: "#d7c7ff", skin: "#7d4a33" },
    stats: { power: 6, speed: 8, defense: 5, range: 7 },
    moves: {
      basic: { name: "Crescent Cut", damage: 8, range: 1.45, cooldown: 280, knockback: 4 },
      special: { name: "Moonstep Edge", damage: 15, range: 2.05, cooldown: 900, knockback: 8 },
      blast: { name: "Silver Arc", damage: 9, speed: 10, cooldown: 680, knockback: 4 },
      dash: { name: "Moonstep", distance: 2.25, cooldown: 620 },
      block: { name: "Lunar Parry", damageReduction: 0.55 },
      ultimate: { name: "Eclipse Waltz", damage: 34, range: 5.4, meterCost: 100, knockback: 14 }
    }
  },
  boltRen: {
    id: "bolt-ren",
    name: "Bolt Ren",
    title: "Storm Runner",
    className: "Lightning Speed Fighter",
    description: "A speed specialist who wins with fast angles and quick shocks.",
    colors: { primary: "#081622", secondary: "#35d8ff", accent: "#fff06a", gold: "#fff06a", skin: "#6d3b24" },
    stats: { power: 6, speed: 10, defense: 4, range: 6 },
    moves: {
      basic: { name: "Spark Jab", damage: 7, range: 1.05, cooldown: 230, knockback: 4 },
      special: { name: "Thunder Drift", damage: 14, range: 1.95, cooldown: 760, knockback: 8 },
      blast: { name: "Volt Needle", damage: 8, speed: 13, cooldown: 540, knockback: 4 },
      dash: { name: "Storm Skip", distance: 2.9, cooldown: 540 },
      block: { name: "Static Guard", damageReduction: 0.45 },
      ultimate: { name: "Stormline Flash", damage: 32, range: 6, meterCost: 100, knockback: 15 }
    }
  },
  terraJinn: {
    id: "terra-jinn",
    name: "Terra Jinn",
    title: "Stonewall Sage",
    className: "Earth Tank",
    description: "A grounded powerhouse who absorbs pressure and answers with heavy blows.",
    colors: { primary: "#172112", secondary: "#8fbe62", accent: "#f2c879", gold: "#d6b06a", skin: "#704225" },
    stats: { power: 8, speed: 4, defense: 10, range: 4 },
    moves: {
      basic: { name: "Stone Knuckle", damage: 11, range: 1, cooldown: 360, knockback: 6 },
      special: { name: "Quake Guard", damage: 18, range: 1.7, cooldown: 1100, knockback: 10 },
      blast: { name: "Boulder Pulse", damage: 11, speed: 7, cooldown: 820, knockback: 7 },
      dash: { name: "Fault Shift", distance: 1.45, cooldown: 800 },
      block: { name: "Bedrock Brace", damageReduction: 0.75 },
      ultimate: { name: "Mountain Crown", damage: 40, range: 4.2, meterCost: 100, knockback: 18 }
    }
  },
  novaSaint: {
    id: "nova-saint",
    name: "Nova Saint",
    title: "Cosmic Channeler",
    className: "Cosmic Energy Fighter",
    description: "A ranged energy fighter who controls space with bright starbursts.",
    colors: { primary: "#250b2f", secondary: "#ff6fd8", accent: "#8ffcff", gold: "#f9d66b", skin: "#71412d" },
    stats: { power: 7, speed: 6, defense: 6, range: 9 },
    moves: {
      basic: { name: "Star Tap", damage: 8, range: 1.2, cooldown: 300, knockback: 4 },
      special: { name: "Orbit Bloom", damage: 16, range: 2.35, cooldown: 1040, knockback: 7 },
      blast: { name: "Comet Ray", damage: 12, speed: 11, cooldown: 650, knockback: 5 },
      dash: { name: "Nova Glide", distance: 2.05, cooldown: 670 },
      block: { name: "Orbit Shell", damageReduction: 0.55 },
      ultimate: { name: "Celestial Anthem", damage: 36, range: 6.2, meterCost: 100, knockback: 13 }
    }
  }
};

const fighters = Object.values(characters);
let selectedFighter = characters.nakaru;
let nakaruHeadwear = "straw";
let player;
let cpu;
let state = "menu";
let matchTime = 99;
let roundStart = 0;
let last = performance.now();
let shake = 0;
let freezeUntil = 0;
let ultimateUntil = 0;
let cpuThinkAt = 0;
let cpuIntent = {};
let projectiles = [];
let particles = [];
let damageNumbers = [];
let afterImages = [];
let codeGlyphs = [];
let pendingUltimates = [];
let lastTap = { a: 0, d: 0 };

const keys = new Set();
const pressed = new Set();
const touch = { left: false, right: false, jump: false, block: false, attack: false, special: false, blast: false, ultimate: false };

const arena = { halfWidth: 8.8, halfDepth: 3.2, ground: 0 };

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = new THREE.Color("#07060d");
scene.fog = new THREE.Fog("#07060d", 13, 28);

const camera = new THREE.PerspectiveCamera(45, 16 / 9, 0.1, 80);
const clock = new THREE.Clock();
const cameraTarget = new THREE.Vector3(0, 1.3, 0);

const world = new THREE.Group();
scene.add(world);

const materials = new Map();
function mat(color, roughness = 0.5, metalness = 0.05, emissive = "#000000", emissiveIntensity = 0) {
  const key = `${color}-${roughness}-${metalness}-${emissive}-${emissiveIntensity}`;
  if (!materials.has(key)) {
    materials.set(key, new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness,
      emissive,
      emissiveIntensity
    }));
  }
  return materials.get(key);
}

function emissiveMat(color, intensity = 1.35) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: intensity,
    roughness: 0.25,
    metalness: 0.12
  });
}

function showPanel(name) {
  Object.entries(panels).forEach(([key, panel]) => panel.classList.toggle("active", key === name));
}

function setState(next) {
  state = next;
  if (next === "playing") Object.values(panels).forEach((panel) => panel.classList.remove("active"));
  else showPanel(next);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function colorOf(fighter, key = "accent") {
  return fighter.config.colors[key] || fighter.config.colors.accent;
}

function move(fighter, name) {
  return fighter.config.moves[name] || {};
}

function moveName(fighter, name) {
  return move(fighter, name).name || name;
}

function framesFromMs(ms, fallback) {
  return ms ? Math.max(1, Math.round(ms / 16.67)) : fallback;
}

function initials(name) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2);
}

function createArena() {
  const hemi = new THREE.HemisphereLight("#9bc9ff", "#140913", 1.2);
  scene.add(hemi);

  const key = new THREE.DirectionalLight("#fff0be", 2.3);
  key.position.set(-5, 9, 8);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 30;
  key.shadow.camera.left = -12;
  key.shadow.camera.right = 12;
  key.shadow.camera.top = 10;
  key.shadow.camera.bottom = -10;
  scene.add(key);

  const rim = new THREE.PointLight("#6d28d9", 4, 18);
  rim.position.set(0, 3.5, -5.2);
  scene.add(rim);

  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(19, 0.35, 7.2),
    mat("#14111d", 0.68, 0.08)
  );
  floor.position.y = -0.18;
  floor.receiveShadow = true;
  world.add(floor);

  const glass = new THREE.Mesh(
    new THREE.BoxGeometry(17.6, 0.06, 5.9),
    mat("#21163a", 0.36, 0.18, "#351a68", 0.08)
  );
  glass.position.y = 0.03;
  glass.receiveShadow = true;
  world.add(glass);

  const grid = new THREE.GridHelper(18, 18, "#facc15", "#6d28d9");
  grid.position.y = 0.07;
  grid.material.transparent = true;
  grid.material.opacity = 0.22;
  world.add(grid);

  for (let i = 0; i < 10; i += 1) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 1.6, 12), mat(i % 2 ? "#6d28d9" : "#facc15", 0.4, 0.25, i % 2 ? "#6d28d9" : "#facc15", 0.22));
    post.position.set(-8.3 + i * 1.85, 0.8, -3.35);
    post.castShadow = true;
    world.add(post);
  }

  const ring = new THREE.Mesh(new THREE.TorusGeometry(5.9, 0.025, 8, 120), emissiveMat("#6d28d9", 0.8));
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.11;
  world.add(ring);
}

class Fighter {
  constructor(config, x, isCpu = false) {
    this.config = config;
    this.name = config.name;
    this.isCpu = isCpu;
    this.position = new THREE.Vector3(x, 0, isCpu ? -0.35 : 0.35);
    this.velocity = new THREE.Vector3();
    this.facing = isCpu ? -1 : 1;
    this.health = 100;
    this.meter = 0;
    this.grounded = true;
    this.blocking = false;
    this.cooldowns = { basic: 0, special: 0, blast: 0, ultimate: 0, dash: 0 };
    this.frames = { basic: 0, special: 0, ultimate: 0, hit: 0 };
    this.stun = 0;
    this.headwear = config.id === "nakaru" ? nakaruHeadwear : "headband";
    this.group = config.id === "nakaru" ? createNakaruModel(this) : createFighterModel(this);
    this.group.position.copy(this.position);
    this.group.rotation.y = this.facing > 0 ? Math.PI / 2 : -Math.PI / 2;
    world.add(this.group);
  }

  dispose() {
    world.remove(this.group);
  }
}

function mesh(geometry, material, position, scale = [1, 1, 1]) {
  const m = new THREE.Mesh(geometry, material);
  m.position.set(position[0], position[1], position[2]);
  m.scale.set(scale[0], scale[1], scale[2]);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function createFighterModel(fighter) {
  const c = fighter.config.colors;
  const group = new THREE.Group();
  const body = mesh(new THREE.CapsuleGeometry(0.32, 0.82, 8, 18), mat(c.primary, 0.48, 0.06), [0, 1.12, 0], [1, 1.08, 0.82]);
  const chest = mesh(new THREE.BoxGeometry(0.68, 0.5, 0.18), emissiveMat(c.secondary, 0.28), [0, 1.34, 0.23]);
  const head = mesh(new THREE.SphereGeometry(0.24, 24, 18), mat(c.skin, 0.55, 0.03), [0, 2.04, 0]);
  const hair = mesh(new THREE.SphereGeometry(0.255, 18, 12), mat("#111111", 0.72), [0, 2.16, -0.04], [1.08, 0.55, 0.9]);
  const armL = mesh(new THREE.CapsuleGeometry(0.09, 0.55, 6, 12), mat(c.primary, 0.5), [-0.43, 1.23, 0.02]);
  const armR = mesh(new THREE.CapsuleGeometry(0.09, 0.55, 6, 12), mat(c.primary, 0.5), [0.43, 1.23, 0.02]);
  const legL = mesh(new THREE.CapsuleGeometry(0.11, 0.55, 6, 12), mat("#111827", 0.58), [-0.18, 0.48, 0.02]);
  const legR = mesh(new THREE.CapsuleGeometry(0.11, 0.55, 6, 12), mat("#111827", 0.58), [0.18, 0.48, 0.02]);
  const aura = new THREE.PointLight(c.accent, 1.4, 3);
  aura.position.set(0, 1.25, 0.15);
  group.add(body, chest, head, hair, armL, armR, legL, legR, aura);
  group.userData = { armL, armR, aura };
  return group;
}

function createNakaruModel(fighter) {
  const group = new THREE.Group();
  const c = fighter.config.colors;
  const body = mesh(new THREE.CapsuleGeometry(0.34, 0.88, 9, 20), mat(c.primary, 0.58, 0.08), [0, 1.12, 0], [1, 1.08, 0.88]);
  const trim = mesh(new THREE.BoxGeometry(0.76, 0.07, 0.05), emissiveMat(c.accent, 0.8), [0, 1.48, 0.31]);
  const zipper = mesh(new THREE.BoxGeometry(0.035, 0.62, 0.055), emissiveMat(c.accent, 0.75), [0, 1.16, 0.33]);
  const logo = mesh(new THREE.BoxGeometry(0.18, 0.18, 0.065), emissiveMat(c.gold, 1), [0, 1.3, 0.36]);
  const head = mesh(new THREE.SphereGeometry(0.25, 28, 20), mat(c.skin, 0.54, 0.04), [0, 2.04, 0.02]);
  const hairTop = mesh(new THREE.SphereGeometry(0.27, 18, 12), mat("#070707", 0.7), [0, 2.17, -0.04], [1.08, 0.52, 0.95]);
  const hairL = mesh(new THREE.BoxGeometry(0.12, 0.62, 0.11), mat("#070707", 0.75), [-0.23, 1.86, 0]);
  const hairR = mesh(new THREE.BoxGeometry(0.12, 0.62, 0.11), mat("#070707", 0.75), [0.23, 1.86, 0]);
  const beard = mesh(new THREE.SphereGeometry(0.18, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat("#050505", 0.75), [0, 1.88, 0.12], [1, 0.75, 0.6]);
  const armL = mesh(new THREE.CapsuleGeometry(0.09, 0.58, 6, 12), mat(c.primary, 0.54), [-0.46, 1.22, 0.05]);
  const armR = mesh(new THREE.CapsuleGeometry(0.09, 0.58, 6, 12), mat(c.primary, 0.54), [0.46, 1.22, 0.05]);
  const handGlow = mesh(new THREE.SphereGeometry(0.08, 16, 12), emissiveMat(c.accent, 1.6), [0.62, 1.16, 0.16]);
  const legL = mesh(new THREE.CapsuleGeometry(0.11, 0.58, 6, 12), mat("#111827", 0.62), [-0.18, 0.48, 0.02]);
  const legR = mesh(new THREE.CapsuleGeometry(0.11, 0.58, 6, 12), mat("#111827", 0.62), [0.18, 0.48, 0.02]);
  const shoeL = mesh(new THREE.BoxGeometry(0.26, 0.08, 0.32), emissiveMat(c.gold, 0.5), [-0.18, 0.1, 0.08]);
  const shoeR = mesh(new THREE.BoxGeometry(0.26, 0.08, 0.32), emissiveMat(c.gold, 0.5), [0.18, 0.1, 0.08]);
  const headwear = makeNakaruHeadwear(fighter.headwear);
  const aura = new THREE.PointLight(c.accent, 2.4, 4.5);
  aura.position.set(0, 1.3, 0.2);
  group.add(body, trim, zipper, logo, head, hairTop, hairL, hairR, beard, armL, armR, handGlow, legL, legR, shoeL, shoeR, headwear, aura);
  group.userData = { armL, armR, aura, headwear, handGlow };
  return group;
}

function makeNakaruHeadwear(kind) {
  const group = new THREE.Group();
  if (kind === "headband") {
    group.add(mesh(new THREE.BoxGeometry(0.62, 0.08, 0.34), mat("#030306", 0.58), [0, 2.2, 0.02]));
    group.add(mesh(new THREE.BoxGeometry(0.16, 0.085, 0.36), emissiveMat("#6d28d9", 0.9), [0, 2.2, 0.04]));
  } else {
    group.add(mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.055, 48), mat("#d6a84f", 0.74, 0.04), [0, 2.26, 0]));
    group.add(mesh(new THREE.CylinderGeometry(0.24, 0.31, 0.18, 32), mat("#c8963c", 0.8, 0.04), [0, 2.36, 0]));
  }
  return group;
}

function rebuildNakaruHeadwear() {
  for (const fighter of [player, cpu]) {
    if (!fighter || fighter.config.id !== "nakaru") continue;
    fighter.headwear = nakaruHeadwear;
    fighter.group.remove(fighter.group.userData.headwear);
    fighter.group.userData.headwear = makeNakaruHeadwear(nakaruHeadwear);
    fighter.group.add(fighter.group.userData.headwear);
  }
}

function renderCharacterSelect() {
  ui.fighterGrid.innerHTML = "";
  fighters.forEach((fighter) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `fighter-card${fighter.id === selectedFighter.id ? " selected" : ""}`;
    card.innerHTML = `
      <div class="portrait" style="background: linear-gradient(145deg, ${fighter.colors.secondary}, ${fighter.colors.accent})">${initials(fighter.name)}</div>
      <div>
        <h3>${fighter.name}</h3>
        <p>${fighter.title}</p>
        <p>${fighter.description}</p>
      </div>
      <div class="stats">
        ${Object.entries(fighter.stats).map(([stat, value]) => `
          <div class="stat-line">
            <span>${stat}</span>
            <div class="stat-track"><span style="width:${value * 10}%"></span></div>
          </div>
        `).join("")}
      </div>
    `;
    card.addEventListener("click", () => {
      selectedFighter = fighter;
      ui.selectedFighterText.textContent = `Selected: ${fighter.name}`;
      renderCharacterSelect();
      updateNakaruLookButton();
      playTone(520, 0.05, "triangle", 0.03);
    });
    ui.fighterGrid.appendChild(card);
  });
  updateNakaruLookButton();
}

function updateNakaruLookButton() {
  const isNakaru = selectedFighter.id === "nakaru";
  ui.nakaruLookButton.hidden = !isNakaru;
  ui.nakaruLookButton.textContent = `Nakaru Look: ${nakaruHeadwear === "straw" ? "Straw Hat" : "Black Headband"}`;
}

function chooseCpu() {
  const choices = fighters.filter((fighter) => fighter.id !== selectedFighter.id);
  return choices[Math.floor(Math.random() * choices.length)];
}

function startMatch() {
  if (player) player.dispose();
  if (cpu) cpu.dispose();
  for (const obj of [...projectiles, ...particles, ...afterImages, ...codeGlyphs]) world.remove(obj.mesh);
  projectiles = [];
  particles = [];
  damageNumbers = [];
  afterImages = [];
  codeGlyphs = [];
  pendingUltimates = [];
  freezeUntil = 0;
  ultimateUntil = 0;
  player = new Fighter(selectedFighter, -3.2, false);
  cpu = new Fighter(chooseCpu(), 3.2, true);
  roundStart = performance.now();
  matchTime = 99;
  ui.introText.textContent = `${player.name} vs ${cpu.name}`;
  ui.introText.classList.add("show");
  setTimeout(() => ui.introText.classList.remove("show"), 1700);
  updateHud();
  setState("playing");
}

function distance(a, b) {
  return a.position.distanceTo(b.position);
}

function doDamage(target, source, amount, knockback, label, opts = {}) {
  if (target.health <= 0 || (target.stun > 0 && !opts.bypassStun)) return false;
  const direction = Math.sign(target.position.x - source.position.x) || source.facing;
  const blocked = target.blocking && Math.sign(direction) !== Math.sign(target.facing);
  const reduction = move(target, "block").damageReduction ?? 0.55;
  const finalDamage = blocked ? Math.ceil(amount * (1 - reduction)) : amount;
  target.health = clamp(target.health - finalDamage, 0, 100);
  target.velocity.x += direction * knockback * (blocked ? 0.12 : 0.22);
  target.velocity.y += blocked ? 0.6 : 1.6;
  target.stun = blocked ? 12 : opts.stunFrames || 20;
  target.frames.hit = 12;
  source.meter = clamp(source.meter + finalDamage * 0.8, 0, 100);
  target.meter = clamp(target.meter + finalDamage * 0.28, 0, 100);
  spawnBurst(target.position, blocked ? "#9edcff" : colorOf(source), blocked ? "Guard" : label);
  addDamageNumber(target.position, blocked ? `-${finalDamage} guard` : `-${finalDamage}`);
  shake = Math.max(shake, blocked ? 0.12 : 0.28);
  updateHud();
  playTone(blocked ? 220 : 118, 0.05, blocked ? "triangle" : "sawtooth", 0.035);
  return true;
}

function tryBasic(attacker, defender) {
  const data = move(attacker, "basic");
  if (attacker.cooldowns.basic > 0 || attacker.stun > 0) return;
  attacker.cooldowns.basic = framesFromMs(data.cooldown, 18);
  attacker.frames.basic = attacker.config.id === "nakaru" ? 18 : 10;
  const inRange = distance(attacker, defender) <= data.range + 0.85 && Math.abs(attacker.position.y - defender.position.y) < 1.2;
  if (!inRange) return playTone(310, 0.035, "triangle", 0.02);
  if (attacker.config.id === "nakaru") {
    for (let i = 0; i < 3; i += 1) {
      doDamage(defender, attacker, Math.ceil(data.damage / 3), data.knockback + i, data.name, { bypassStun: i > 0, stunFrames: 9 + i * 2 });
      spawnThreadSlash(attacker, 0.45 + i * 0.18);
    }
  } else {
    doDamage(defender, attacker, data.damage, data.knockback, data.name);
  }
}

function trySpecial(attacker, defender) {
  const data = move(attacker, "special");
  if (attacker.cooldowns.special > 0 || attacker.stun > 0) return;
  attacker.cooldowns.special = framesFromMs(data.cooldown, 52);
  attacker.frames.special = 20;
  if (attacker.config.id === "nakaru") {
    attacker.position.x += attacker.facing * 0.45;
    spawnThreadSlash(attacker, 1.15);
  } else {
    attacker.velocity.x += attacker.facing * 3.4;
  }
  addAfterImage(attacker);
  if (distance(attacker, defender) <= data.range + 0.9) {
    doDamage(defender, attacker, data.damage, data.knockback, data.name, { stunFrames: framesFromMs(data.stun, 26) });
  } else if (attacker.config.stats.range >= 7) {
    createProjectile(attacker, "special");
  }
}

function tryBlast(attacker) {
  const data = move(attacker, "blast");
  if (attacker.cooldowns.blast > 0 || attacker.stun > 0) return;
  attacker.cooldowns.blast = framesFromMs(data.cooldown, 38);
  createProjectile(attacker, "blast");
}

function dash(fighter, direction) {
  const data = move(fighter, "dash");
  if (fighter.cooldowns.dash > 0 || fighter.blocking) return;
  if (fighter.config.id === "nakaru") {
    addAfterImage(fighter);
    fighter.position.x = clamp(fighter.position.x + direction * data.distance, -arena.halfWidth, arena.halfWidth);
    spawnBurst(fighter.position, colorOf(fighter), data.name);
  } else {
    fighter.velocity.x = direction * (5.2 + fighter.config.stats.speed * 0.38);
    addAfterImage(fighter);
  }
  fighter.cooldowns.dash = framesFromMs(data.cooldown, 36);
  playTone(760, 0.04, "triangle", 0.025);
}

function tryUltimate(attacker, defender) {
  const data = move(attacker, "ultimate");
  if (attacker.cooldowns.ultimate > 0 || attacker.meter < (data.meterCost || 100) || attacker.stun > 0) return;
  attacker.meter = clamp(attacker.meter - (data.meterCost || 100), 0, 100);
  attacker.cooldowns.ultimate = framesFromMs(data.cooldown, 180);
  attacker.frames.ultimate = 78;
  ultimateUntil = performance.now() + 1300;
  ui.ultimateBanner.textContent = data.name;
  ui.ultimateBanner.classList.add("show");
  setTimeout(() => ui.ultimateBanner.classList.remove("show"), 1050);
  if (attacker.config.id === "nakaru") {
    freezeUntil = performance.now() + 430;
    createCodeGlyphs(attacker.position);
    pendingUltimates.push({ attacker, defender, at: freezeUntil, data });
  } else {
    resolveUltimate(attacker, defender, data);
  }
  shake = Math.max(shake, 0.55);
  playTone(86, 0.22, "sawtooth", 0.055);
}

function resolveUltimate(attacker, defender, data) {
  spawnShockwave(attacker.position, colorOf(attacker, "gold"));
  if (distance(attacker, defender) <= data.range) {
    doDamage(defender, attacker, data.damage, data.knockback, data.name, { bypassStun: true, stunFrames: 34 });
  }
}

function createProjectile(owner, kind) {
  const data = move(owner, kind === "special" ? "special" : "blast");
  const geometry = owner.config.id === "nakaru"
    ? new THREE.CapsuleGeometry(0.07, 0.65, 6, 14)
    : new THREE.SphereGeometry(kind === "special" ? 0.18 : 0.14, 18, 12);
  const meshObj = new THREE.Mesh(geometry, emissiveMat(colorOf(owner), 1.6));
  meshObj.castShadow = true;
  meshObj.position.copy(owner.position).add(new THREE.Vector3(owner.facing * 0.75, 1.15, 0));
  meshObj.rotation.z = Math.PI / 2;
  world.add(meshObj);
  projectiles.push({
    mesh: meshObj,
    owner,
    velocity: new THREE.Vector3(owner.facing * (data.speed || 9), 0, 0),
    life: 1.45,
    damage: data.damage || 10,
    knockback: data.knockback || 5,
    label: data.name || kind
  });
  owner.meter = clamp(owner.meter + 4, 0, 100);
  playTone(owner.config.id === "nakaru" ? 650 : 520, 0.05, "square", 0.03);
}

function spawnBurst(position, color, label = "") {
  for (let i = 0; i < 18; i += 1) {
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.035 + Math.random() * 0.035, 8, 6), emissiveMat(color, 1.8));
    p.position.copy(position).add(new THREE.Vector3(0, 1.15, 0));
    world.add(p);
    particles.push({
      mesh: p,
      velocity: new THREE.Vector3((Math.random() - 0.5) * 4.5, Math.random() * 3.8, (Math.random() - 0.5) * 2.4),
      life: 0.35 + Math.random() * 0.2
    });
  }
  if (label) addDamageNumber(position, label, color);
}

function spawnThreadSlash(fighter, reach) {
  const slash = new THREE.Mesh(new THREE.TorusGeometry(reach, 0.018, 8, 64, Math.PI * 1.08), emissiveMat(colorOf(fighter), 2));
  slash.position.copy(fighter.position).add(new THREE.Vector3(fighter.facing * 0.55, 1.25, 0));
  slash.rotation.set(Math.PI / 2, 0, fighter.facing > 0 ? -0.35 : Math.PI + 0.35);
  world.add(slash);
  particles.push({ mesh: slash, velocity: new THREE.Vector3(fighter.facing * 0.35, 0.4, 0), life: 0.18, spin: 8 });
}

function spawnShockwave(position, color) {
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.035, 10, 96), emissiveMat(color, 2.1));
  ring.rotation.x = Math.PI / 2;
  ring.position.copy(position).setY(0.12);
  world.add(ring);
  particles.push({ mesh: ring, velocity: new THREE.Vector3(), life: 0.72, grow: 8 });
  for (let i = 0; i < 44; i += 1) spawnBurst(position, i % 2 ? "#38bdf8" : "#facc15");
}

function createCodeGlyphs(center) {
  const glyphs = ["{}", "</>", "01", "N", "if", "=>", "return", "debug"];
  for (let i = 0; i < 34; i += 1) {
    const canvasText = document.createElement("canvas");
    canvasText.width = 256;
    canvasText.height = 128;
    const g = canvasText.getContext("2d");
    g.fillStyle = i % 2 ? "#38bdf8" : "#facc15";
    g.font = "900 42px Consolas, monospace";
    g.textAlign = "center";
    g.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], 128, 74);
    const texture = new THREE.CanvasTexture(canvasText);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.9 }));
    sprite.position.set(center.x + (Math.random() - 0.5) * 9, 1 + Math.random() * 4.2, (Math.random() - 0.5) * 4.8);
    sprite.scale.set(0.9, 0.45, 1);
    world.add(sprite);
    codeGlyphs.push({ mesh: sprite, life: 1.1 + Math.random() * 0.5, velocity: new THREE.Vector3(0, 0.75 + Math.random(), 0) });
  }
}

function addAfterImage(fighter) {
  const clone = fighter.group.clone(true);
  clone.traverse((child) => {
    if (child.material) {
      child.material = child.material.clone();
      child.material.transparent = true;
      child.material.opacity = 0.28;
      child.material.depthWrite = false;
    }
  });
  clone.position.copy(fighter.group.position);
  clone.rotation.copy(fighter.group.rotation);
  world.add(clone);
  afterImages.push({ mesh: clone, life: 0.28 });
}

function addDamageNumber(position, text, color = "#fff7cb") {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 96;
  const g = c.getContext("2d");
  g.fillStyle = color;
  g.font = "900 30px Arial";
  g.textAlign = "center";
  g.fillText(text, 128, 52);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true }));
  sprite.position.copy(position).add(new THREE.Vector3(0, 2.25, 0));
  sprite.scale.set(1.1, 0.42, 1);
  world.add(sprite);
  damageNumbers.push({ mesh: sprite, life: 0.8, velocity: new THREE.Vector3(0, 0.55, 0) });
}

function playerInput(now) {
  if (!player || player.stun > 0 || now < freezeUntil) return;
  const left = keys.has("a") || touch.left;
  const right = keys.has("d") || touch.right;
  const speed = 2.8 + player.config.stats.speed * 0.22;
  player.blocking = keys.has("s") || touch.block;
  if (left && !player.blocking) {
    player.velocity.x -= speed * 0.09;
    player.facing = -1;
  }
  if (right && !player.blocking) {
    player.velocity.x += speed * 0.09;
    player.facing = 1;
  }
  if ((pressed.has("w") || touch.jump) && player.grounded && !player.blocking) {
    player.velocity.y = 6.6 + player.config.stats.speed * 0.12;
    player.grounded = false;
    touch.jump = false;
  }
  if (pressed.has("a")) handleTapDash("a", now, -1);
  if (pressed.has("d")) handleTapDash("d", now, 1);
  if (pressed.has("j") || touch.attack) { tryBasic(player, cpu); touch.attack = false; }
  if (pressed.has("k") || touch.special) { trySpecial(player, cpu); touch.special = false; }
  if (pressed.has("l") || touch.blast) { tryBlast(player); touch.blast = false; }
  if (pressed.has("u") || touch.ultimate) { tryUltimate(player, cpu); touch.ultimate = false; }
}

function handleTapDash(key, now, direction) {
  if (now - lastTap[key] < 240) dash(player, direction);
  lastTap[key] = now;
}

function cpuInput(now) {
  if (!cpu || !player || cpu.stun > 0 || now < freezeUntil) return;
  if (now > cpuThinkAt) {
    const dx = player.position.x - cpu.position.x;
    const dist = Math.abs(dx);
    cpuIntent = {
      direction: Math.sign(dx) || cpu.facing,
      block: Math.random() < 0.16 && dist < 2.4,
      jump: Math.random() < 0.08 && cpu.grounded
    };
    cpu.facing = cpuIntent.direction;
    if (cpu.meter >= 100 && dist < move(cpu, "ultimate").range) tryUltimate(cpu, player);
    else if (dist < 1.25 && Math.random() < 0.64) tryBasic(cpu, player);
    else if (dist < 2.1 && Math.random() < 0.42) trySpecial(cpu, player);
    else if (dist > 2.5 && Math.random() < 0.58) tryBlast(cpu);
    cpuThinkAt = now + 250 + Math.random() * 280;
  }
  cpu.blocking = cpuIntent.block;
  if (!cpu.blocking) cpu.velocity.x += (cpuIntent.direction || 0) * (0.16 + cpu.config.stats.speed * 0.014);
  if (cpuIntent.jump && cpu.grounded) {
    cpu.velocity.y = 6.4;
    cpu.grounded = false;
  }
}

function updateFighter(fighter, dt) {
  Object.keys(fighter.cooldowns).forEach((key) => { fighter.cooldowns[key] = Math.max(0, fighter.cooldowns[key] - 1); });
  Object.keys(fighter.frames).forEach((key) => { fighter.frames[key] = Math.max(0, fighter.frames[key] - 1); });
  fighter.stun = Math.max(0, fighter.stun - 1);
  fighter.meter = clamp(fighter.meter + dt * 1.6, 0, 100);
  fighter.velocity.y -= 15 * dt;
  const cap = fighter.blocking ? 1.2 : 4.2 + fighter.config.stats.speed * 0.25;
  fighter.velocity.x = clamp(fighter.velocity.x, -cap, cap);
  fighter.position.addScaledVector(fighter.velocity, dt);
  fighter.position.x = clamp(fighter.position.x, -arena.halfWidth, arena.halfWidth);
  fighter.position.z = clamp(fighter.position.z, -arena.halfDepth, arena.halfDepth);
  if (fighter.position.y <= arena.ground) {
    fighter.position.y = arena.ground;
    fighter.velocity.y = 0;
    fighter.grounded = true;
  }
  fighter.velocity.x *= fighter.grounded ? 0.82 : 0.94;
  const opponent = fighter === player ? cpu : player;
  if (opponent) fighter.facing = opponent.position.x >= fighter.position.x ? 1 : -1;
  fighter.group.position.copy(fighter.position);
  fighter.group.rotation.y = THREE.MathUtils.lerp(fighter.group.rotation.y, fighter.facing > 0 ? Math.PI / 2 : -Math.PI / 2, 0.28);
  animateFighterModel(fighter);
}

function animateFighterModel(fighter) {
  const t = performance.now() * 0.008;
  const bob = fighter.grounded ? Math.sin(t + fighter.position.x) * 0.025 : 0.08;
  fighter.group.position.y += bob;
  const armL = fighter.group.userData.armL;
  const armR = fighter.group.userData.armR;
  if (armL && armR) {
    armL.rotation.z = Math.sin(t) * 0.18;
    armR.rotation.z = -Math.sin(t) * 0.18;
    if (fighter.frames.basic > 0 || fighter.frames.special > 0) {
      armR.rotation.z = -1.1;
      armR.rotation.x = 0.8;
    } else {
      armR.rotation.x = 0;
    }
  }
  const aura = fighter.group.userData.aura;
  if (aura) aura.intensity = fighter.blocking ? 3.5 : 1.4 + fighter.meter / 65;
}

function updateProjectiles(dt) {
  for (const projectile of projectiles) {
    projectile.mesh.position.addScaledVector(projectile.velocity, dt);
    projectile.life -= dt;
    projectile.mesh.rotation.z += dt * 8;
    const target = projectile.owner === player ? cpu : player;
    if (target && projectile.mesh.position.distanceTo(target.position.clone().add(new THREE.Vector3(0, 1, 0))) < 0.72) {
      doDamage(target, projectile.owner, projectile.damage, projectile.knockback, projectile.label);
      projectile.life = 0;
    }
  }
  projectiles = projectiles.filter((projectile) => {
    if (projectile.life > 0 && Math.abs(projectile.mesh.position.x) < 11) return true;
    world.remove(projectile.mesh);
    return false;
  });
}

function updateEffects(dt, now) {
  for (const pending of pendingUltimates) {
    if (now >= pending.at && !pending.done) {
      pending.done = true;
      resolveUltimate(pending.attacker, pending.defender, pending.data);
    }
  }
  pendingUltimates = pendingUltimates.filter((pending) => !pending.done);
  for (const list of [particles, damageNumbers, afterImages, codeGlyphs]) {
    for (const item of list) {
      item.life -= dt;
      if (item.velocity) item.mesh.position.addScaledVector(item.velocity, dt);
      if (item.spin) item.mesh.rotation.z += item.spin * dt;
      if (item.grow) item.mesh.scale.addScalar(item.grow * dt);
      if (item.mesh.material) item.mesh.material.opacity = Math.max(0, item.life);
    }
  }
  particles = particles.filter(keepAlive);
  damageNumbers = damageNumbers.filter(keepAlive);
  afterImages = afterImages.filter(keepAlive);
  codeGlyphs = codeGlyphs.filter(keepAlive);
  shake = Math.max(0, shake - dt * 1.8);
}

function keepAlive(item) {
  if (item.life > 0) return true;
  world.remove(item.mesh);
  return false;
}

function updateHud() {
  if (!player || !cpu) return;
  ui.playerName.textContent = player.name;
  ui.cpuName.textContent = cpu.name;
  ui.playerHealthBar.style.width = `${player.health}%`;
  ui.cpuHealthBar.style.width = `${cpu.health}%`;
  ui.playerMeterBar.style.width = `${player.meter}%`;
  ui.cpuMeterBar.style.width = `${cpu.meter}%`;
  ui.playerMeterText.textContent = `${Math.floor(player.meter)}%`;
  ui.cpuMeterText.textContent = `${Math.floor(cpu.meter)}%`;
  ui.timerText.textContent = String(matchTime).padStart(2, "0");
}

function checkWin() {
  if (state !== "playing") return;
  if (player.health <= 0 || cpu.health <= 0 || matchTime <= 0) {
    const playerWon = player.health > cpu.health;
    ui.resultTitle.textContent = playerWon ? "Victory" : "Defeat";
    ui.resultCopy.textContent = playerWon
      ? `${player.name} wins with ${moveName(player, "ultimate")}.`
      : `${cpu.name} controls the arena. Choose a fighter and run it back.`;
    setState("result");
  }
}

function updateCamera(dt) {
  if (!player || !cpu) {
    camera.position.set(0, 6.5, 11);
    camera.lookAt(0, 1.2, 0);
    return;
  }
  cameraTarget.lerp(player.position.clone().add(cpu.position).multiplyScalar(0.5).add(new THREE.Vector3(0, 1.15, 0)), 0.08);
  const spread = clamp(Math.abs(player.position.x - cpu.position.x), 3, 11);
  const desired = new THREE.Vector3(cameraTarget.x * 0.25, 5.2 + spread * 0.18, 8.2 + spread * 0.24);
  if (shake > 0) desired.add(new THREE.Vector3((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake, 0));
  camera.position.lerp(desired, 1 - Math.pow(0.001, dt));
  camera.lookAt(cameraTarget);
}

function update(now) {
  const dt = Math.min(clock.getDelta(), 0.033);
  if (state === "playing") {
    matchTime = Math.max(0, 99 - Math.floor((now - roundStart) / 1000));
    if (now >= freezeUntil) {
      playerInput(now);
      cpuInput(now);
      updateFighter(player, dt);
      updateFighter(cpu, dt);
      updateProjectiles(dt);
    }
    updateEffects(dt, now);
    updateHud();
    checkWin();
  } else {
    updateEffects(dt, now);
  }
  updateCamera(dt);
  pressed.clear();
}

function resize() {
  const box = canvas.getBoundingClientRect();
  const width = Math.max(1, box.width);
  const height = Math.max(1, box.height);
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function loop(now) {
  resize();
  update(now);
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

let audioContext;
function playTone(frequency, duration, type = "sine", volume = 0.025) {
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.value = volume;
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
    oscillator.stop(audioContext.currentTime + duration);
  } catch {
    // Browsers can block audio until the user interacts; gameplay does not depend on sound.
  }
}

function bindUi() {
  document.querySelector("#playButton").addEventListener("click", startMatch);
  document.querySelector("#characterButton").addEventListener("click", () => setState("select"));
  document.querySelector("#controlsButton").addEventListener("click", () => setState("controls"));
  document.querySelector("#creditsButton").addEventListener("click", () => setState("credits"));
  document.querySelector("#startMatchButton").addEventListener("click", startMatch);
  document.querySelector("#restartButton").addEventListener("click", startMatch);
  document.querySelector("#menuButton").addEventListener("click", () => setState("menu"));
  document.querySelector("#rematchButton").addEventListener("click", startMatch);
  document.querySelector("#resultSelectButton").addEventListener("click", () => setState("select"));
  ui.nakaruLookButton.addEventListener("click", () => {
    nakaruHeadwear = nakaruHeadwear === "straw" ? "headband" : "straw";
    updateNakaruLookButton();
    rebuildNakaruHeadwear();
    playTone(490, 0.04, "triangle", 0.025);
  });
  document.querySelectorAll("[data-close-panel]").forEach((button) => button.addEventListener("click", () => setState("menu")));
  window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (["a", "d", "w", "s", "j", "k", "l", "u", " "].includes(key)) event.preventDefault();
    if (!keys.has(key)) pressed.add(key);
    keys.add(key);
  });
  window.addEventListener("keyup", (event) => keys.delete(event.key.toLowerCase()));
  document.querySelectorAll("[data-touch]").forEach((button) => {
    const action = button.dataset.touch;
    const down = (event) => {
      event.preventDefault();
      touch[action] = true;
    };
    const up = (event) => {
      event.preventDefault();
      if (["left", "right", "block"].includes(action)) touch[action] = false;
    };
    button.addEventListener("pointerdown", down);
    button.addEventListener("pointerup", up);
    button.addEventListener("pointercancel", up);
    button.addEventListener("pointerleave", up);
  });
}

function boot() {
  createArena();
  renderCharacterSelect();
  bindUi();
  startMatch();
  setState("menu");
  requestAnimationFrame(loop);
}

boot();
