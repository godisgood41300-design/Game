"use strict";

const canvas = document.querySelector("#gameCanvas");
const ctx = canvas.getContext("2d");

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
    colors: {
      primary: "#0b0b12",
      secondary: "#6d28d9",
      accent: "#38bdf8",
      gold: "#facc15"
    },
    stats: {
      power: 7,
      speed: 8,
      defense: 6,
      range: 7
    },
    moves: {
      basic: {
        name: "Thread Jab",
        damage: 8,
        range: 45,
        cooldown: 280,
        knockback: 4
      },
      special: {
        name: "Syntax Break",
        damage: 16,
        range: 60,
        cooldown: 1200,
        stun: 500,
        knockback: 8
      },
      blast: {
        name: "Code Thread Shot",
        damage: 10,
        speed: 9,
        cooldown: 650,
        knockback: 5
      },
      dash: {
        name: "Undefined Step",
        distance: 95,
        cooldown: 700
      },
      block: {
        name: "Debug Guard",
        damageReduction: 0.65
      },
      ultimate: {
        name: "Rewrite Reality",
        damage: 38,
        range: 180,
        cooldown: 0,
        meterCost: 100,
        knockback: 18
      }
    }
  },
  emberKai: {
    id: "ember-kai",
    name: "Ember Kai",
    title: "Cinder Striker",
    className: "Fire Brawler",
    description: "A close-range pressure fighter who turns every opening into a flame rush.",
    colors: { primary: "#35100a", secondary: "#ff5b36", accent: "#ffd166", gold: "#ffcc5c" },
    stats: { power: 8, speed: 6, defense: 5, range: 5 },
    moves: {
      basic: { name: "Cinder Hook", damage: 10, range: 44, cooldown: 330, knockback: 5 },
      special: { name: "Blaze Rush", damage: 17, range: 72, cooldown: 980, knockback: 9 },
      blast: { name: "Flare Shot", damage: 9, speed: 8, cooldown: 720, knockback: 5 },
      dash: { name: "Ash Step", distance: 72, cooldown: 700 },
      block: { name: "Coal Guard", damageReduction: 0.5 },
      ultimate: { name: "Inferno Break", damage: 37, range: 190, meterCost: 100, knockback: 16 }
    }
  },
  lunaVey: {
    id: "luna-vey",
    name: "Luna Vey",
    title: "Moonlit Duelist",
    className: "Moon Blade Fighter",
    description: "A graceful blade artist with swift footwork and silver arcs.",
    colors: { primary: "#201d3d", secondary: "#bca7ff", accent: "#eff6ff", gold: "#d7c7ff" },
    stats: { power: 6, speed: 8, defense: 5, range: 7 },
    moves: {
      basic: { name: "Crescent Cut", damage: 8, range: 58, cooldown: 280, knockback: 4 },
      special: { name: "Moonstep Edge", damage: 15, range: 88, cooldown: 900, knockback: 8 },
      blast: { name: "Silver Arc", damage: 9, speed: 9, cooldown: 680, knockback: 4 },
      dash: { name: "Moonstep", distance: 82, cooldown: 620 },
      block: { name: "Lunar Parry", damageReduction: 0.55 },
      ultimate: { name: "Eclipse Waltz", damage: 34, range: 230, meterCost: 100, knockback: 14 }
    }
  },
  boltRen: {
    id: "bolt-ren",
    name: "Bolt Ren",
    title: "Storm Runner",
    className: "Lightning Speed Fighter",
    description: "A speed specialist who wins with fast angles and quick shocks.",
    colors: { primary: "#081622", secondary: "#35d8ff", accent: "#fff06a", gold: "#fff06a" },
    stats: { power: 6, speed: 10, defense: 4, range: 6 },
    moves: {
      basic: { name: "Spark Jab", damage: 7, range: 42, cooldown: 230, knockback: 4 },
      special: { name: "Thunder Drift", damage: 14, range: 84, cooldown: 760, knockback: 8 },
      blast: { name: "Volt Needle", damage: 8, speed: 11, cooldown: 540, knockback: 4 },
      dash: { name: "Storm Skip", distance: 104, cooldown: 540 },
      block: { name: "Static Guard", damageReduction: 0.45 },
      ultimate: { name: "Stormline Flash", damage: 32, range: 260, meterCost: 100, knockback: 15 }
    }
  },
  terraJinn: {
    id: "terra-jinn",
    name: "Terra Jinn",
    title: "Stonewall Sage",
    className: "Earth Tank",
    description: "A grounded powerhouse who absorbs pressure and answers with heavy blows.",
    colors: { primary: "#172112", secondary: "#8fbe62", accent: "#f2c879", gold: "#d6b06a" },
    stats: { power: 8, speed: 4, defense: 10, range: 4 },
    moves: {
      basic: { name: "Stone Knuckle", damage: 11, range: 42, cooldown: 360, knockback: 6 },
      special: { name: "Quake Guard", damage: 18, range: 76, cooldown: 1100, knockback: 10 },
      blast: { name: "Boulder Pulse", damage: 11, speed: 7, cooldown: 820, knockback: 7 },
      dash: { name: "Fault Shift", distance: 58, cooldown: 800 },
      block: { name: "Bedrock Brace", damageReduction: 0.75 },
      ultimate: { name: "Mountain Crown", damage: 40, range: 170, meterCost: 100, knockback: 18 }
    }
  },
  novaSaint: {
    id: "nova-saint",
    name: "Nova Saint",
    title: "Cosmic Channeler",
    className: "Cosmic Energy Fighter",
    description: "A ranged energy fighter who controls space with bright starbursts.",
    colors: { primary: "#250b2f", secondary: "#ff6fd8", accent: "#8ffcff", gold: "#f9d66b" },
    stats: { power: 7, speed: 6, defense: 6, range: 9 },
    moves: {
      basic: { name: "Star Tap", damage: 8, range: 48, cooldown: 300, knockback: 4 },
      special: { name: "Orbit Bloom", damage: 16, range: 102, cooldown: 1040, knockback: 7 },
      blast: { name: "Comet Ray", damage: 12, speed: 10, cooldown: 650, knockback: 5 },
      dash: { name: "Nova Glide", distance: 78, cooldown: 670 },
      block: { name: "Orbit Shell", damageReduction: 0.55 },
      ultimate: { name: "Celestial Anthem", damage: 36, range: 280, meterCost: 100, knockback: 13 }
    }
  }
};

function normalizeCharacter(character) {
  return {
    ...character,
    subtitle: character.title || character.description,
    color: character.colors?.secondary || character.color || "#8f49ff",
    accent: character.colors?.accent || character.accent || "#f5c85b",
    basic: character.moves?.basic?.name || "Basic Attack",
    special: character.moves?.special?.name || "Special Attack",
    blast: character.moves?.blast?.name || "Energy Blast",
    ultimate: character.moves?.ultimate?.name || "Ultimate"
  };
}

const fighters = Object.values(characters).map(normalizeCharacter);

const arena = {
  width: canvas.width,
  height: canvas.height,
  ground: 456,
  platforms: [
    { x: 120, y: 332, width: 230, height: 16 },
    { x: 610, y: 332, width: 230, height: 16 },
    { x: 380, y: 248, width: 200, height: 14 }
  ]
};

const keys = new Set();
const pressed = new Set();
const touch = {
  left: false,
  right: false,
  jump: false,
  block: false,
  attack: false,
  special: false,
  blast: false,
  ultimate: false
};

let selectedFighter = fighters[0];
let player;
let cpu;
let state = "menu";
let roundStart = 0;
let matchTime = 99;
let lastTime = 0;
let shake = 0;
let flash = 0;
let introUntil = 0;
let ultimateUntil = 0;
let cpuBrainAt = 0;
let cpuIntent = { left: false, right: false, jump: false, block: false };
let lastTap = { a: 0, d: 0 };
let projectiles = [];
let sparks = [];
let numbers = [];
let afterImages = [];
let pendingUltimates = [];
let codeGlyphs = [];
let freezeUntil = 0;
let nakaruHeadwear = "straw";

class Fighter {
  constructor(config, x, side, isCpu = false) {
    this.config = config;
    this.name = config.name;
    this.x = x;
    this.y = arena.ground - 88;
    this.width = 48;
    this.height = 88;
    this.vx = 0;
    this.vy = 0;
    this.side = side;
    this.facing = side === "left" ? 1 : -1;
    this.isCpu = isCpu;
    this.health = 100;
    this.meter = 0;
    this.grounded = false;
    this.blocking = false;
    this.hitStun = 0;
    this.attackCooldown = 0;
    this.specialCooldown = 0;
    this.blastCooldown = 0;
    this.ultimateCooldown = 0;
    this.dashCooldown = 0;
    this.attackFrame = 0;
    this.specialFrame = 0;
    this.ultimateFrame = 0;
    this.lastHitBy = "";
    this.comboStep = 0;
    this.headwear = config.id === "nakaru" ? nakaruHeadwear : "headband";
  }

  get left() {
    return this.x - this.width / 2;
  }

  get right() {
    return this.x + this.width / 2;
  }

  get top() {
    return this.y - this.height;
  }

  get bottom() {
    return this.y;
  }
}

function showPanel(name) {
  Object.entries(panels).forEach(([key, panel]) => {
    panel.classList.toggle("active", key === name);
  });
}

function setState(next) {
  state = next;
  if (next === "menu") showPanel("menu");
  if (next === "select") showPanel("select");
  if (next === "controls") showPanel("controls");
  if (next === "credits") showPanel("credits");
  if (next === "playing") {
    Object.values(panels).forEach((panel) => panel.classList.remove("active"));
  }
  if (next === "result") showPanel("result");
}

function initials(name) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2);
}

function renderCharacterSelect() {
  ui.fighterGrid.innerHTML = "";
  fighters.forEach((fighter) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `fighter-card${fighter.id === selectedFighter.id ? " selected" : ""}`;
    card.innerHTML = `
      <div class="portrait" style="background: linear-gradient(145deg, ${fighter.color}, ${fighter.accent})">${initials(fighter.name)}</div>
      <div>
        <h3>${fighter.name}</h3>
        <p>${fighter.className || fighter.subtitle}</p>
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
  if (!ui.nakaruLookButton) return;
  const selectedNakaru = selectedFighter.id === "nakaru";
  ui.nakaruLookButton.hidden = !selectedNakaru;
  ui.nakaruLookButton.textContent = `Nakaru Look: ${nakaruHeadwear === "straw" ? "Straw Hat" : "Black Headband"}`;
}

function chooseCpuFighter() {
  const choices = fighters.filter((fighter) => fighter.id !== selectedFighter.id);
  return choices[Math.floor(Math.random() * choices.length)];
}

function startMatch() {
  const rival = chooseCpuFighter();
  player = new Fighter(selectedFighter, 230, "left");
  cpu = new Fighter(rival, 730, "right", true);
  projectiles = [];
  sparks = [];
  numbers = [];
  afterImages = [];
  pendingUltimates = [];
  codeGlyphs = [];
  freezeUntil = 0;
  roundStart = performance.now();
  matchTime = 99;
  introUntil = performance.now() + 2200;
  ui.introText.textContent = `${player.name} vs ${cpu.name}`;
  ui.introText.classList.add("show");
  setTimeout(() => ui.introText.classList.remove("show"), 1800);
  updateHud();
  setState("playing");
  playTone(190, 0.18, "sawtooth", 0.03);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function framesFromMs(ms, fallbackFrames) {
  return ms ? Math.max(1, Math.round(ms / 16.67)) : fallbackFrames;
}

function moveData(fighter, moveName) {
  return fighter.config.moves?.[moveName] || {};
}

function moveLabel(fighter, moveName) {
  return moveData(fighter, moveName).name || fighter.config[moveName] || moveName;
}

function rectsOverlap(a, b) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function getAttackRect(fighter, reach, height = 52) {
  const forward = fighter.facing;
  return {
    left: forward > 0 ? fighter.right - 6 : fighter.left - reach + 6,
    right: forward > 0 ? fighter.right + reach : fighter.left + 6,
    top: fighter.y - fighter.height + 18,
    bottom: fighter.y - fighter.height + 18 + height
  };
}

function makeRect(left, top, width, height) {
  return { left, top, right: left + width, bottom: top + height };
}

function createProjectile(owner, kind = "blast") {
  const statRange = owner.config.stats.range;
  const data = moveData(owner, kind === "special" ? "special" : "blast");
  const speed = kind === "ultimate" ? 12 : data.speed || 8 + statRange * 0.25;
  const damage = data.damage || (kind === "special" ? 13 : 8 + Math.floor(statRange * 0.45));
  const knockback = data.knockback || 5;
  projectiles.push({
    owner,
    x: owner.x + owner.facing * 38,
    y: owner.y - 48,
    vx: owner.facing * speed,
    radius: kind === "special" ? 18 : 12,
    damage,
    knockback,
    color: owner.config.accent,
    life: 90,
    kind
  });
  owner.meter = clamp(owner.meter + 4, 0, 100);
  playTone(kind === "special" ? 360 : 620, 0.06, "square", 0.025);
}

function applyDamage(target, source, amount, knockX, knockY, label = "", options = {}) {
  if (target.health <= 0 || (target.hitStun > 0 && !options.bypassStun)) return false;
  const blocked = target.blocking && Math.sign(knockX || source.facing) !== Math.sign(target.facing);
  const reduction = moveData(target, "block").damageReduction ?? 0.65;
  const finalDamage = blocked ? Math.ceil(amount * (1 - reduction)) : amount;
  const knockScale = blocked ? 0.28 : 1;
  target.health = clamp(target.health - finalDamage, 0, 100);
  target.vx += knockX * knockScale;
  target.vy += knockY * knockScale;
  target.hitStun = blocked ? 10 : options.stunFrames || 20;
  target.lastHitBy = source.name;
  source.meter = clamp(source.meter + finalDamage * 0.9, 0, 100);
  target.meter = clamp(target.meter + finalDamage * 0.35, 0, 100);
  shake = Math.max(shake, blocked ? 5 : 12);
  flash = blocked ? 4 : 8;
  spawnSpark(target.x, target.y - 48, blocked ? "#9edcff" : source.config.accent, blocked ? "Guard" : label || finalDamage);
  spawnDamage(target.x, target.y - 90, blocked ? `-${finalDamage} guard` : `-${finalDamage}`);
  playTone(blocked ? 220 : 120, 0.06, blocked ? "triangle" : "sawtooth", 0.035);
  updateHud();
  return true;
}

function spawnSpark(x, y, color, label) {
  for (let i = 0; i < 14; i += 1) {
    sparks.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      life: 18 + Math.random() * 8,
      color,
      label
    });
  }
}

function spawnDamage(x, y, text) {
  numbers.push({ x, y, text, life: 44, vy: -1.2 });
}

function tryBasic(attacker, defender) {
  if (attacker.attackCooldown > 0 || attacker.hitStun > 0) return;
  const basic = moveData(attacker, "basic");
  attacker.attackCooldown = framesFromMs(basic.cooldown, 24);
  attacker.attackFrame = attacker.config.id === "nakaru" ? 18 : 10;
  const reach = basic.range || 44 + attacker.config.stats.range * 2;
  if (rectsOverlap(getAttackRect(attacker, reach), defender)) {
    if (attacker.config.id === "nakaru") {
      const hitDamage = Math.max(2, Math.ceil((basic.damage || 8) / 3));
      for (let i = 0; i < 3; i += 1) {
        applyDamage(
          defender,
          attacker,
          hitDamage,
          attacker.facing * ((basic.knockback || 4) + i * 0.9),
          -1.8 - i * 0.55,
          basic.name,
          { bypassStun: i > 0, stunFrames: 10 + i * 2 }
        );
        spawnSpark(defender.x + attacker.facing * (8 + i * 9), defender.y - 58 + i * 6, attacker.config.accent, basic.name);
      }
    } else {
      applyDamage(
        defender,
        attacker,
        basic.damage || 6 + Math.floor(attacker.config.stats.power * 0.55),
        attacker.facing * (basic.knockback || 4.6 + attacker.config.stats.power * 0.22),
        -2.8,
        basic.name || attacker.config.basic
      );
    }
  } else {
    playTone(310, 0.035, "triangle", 0.02);
  }
}

function trySpecial(attacker, defender) {
  if (attacker.specialCooldown > 0 || attacker.hitStun > 0) return;
  const special = moveData(attacker, "special");
  attacker.specialCooldown = framesFromMs(special.cooldown, 58);
  attacker.specialFrame = 18;
  attacker.vx += attacker.facing * (4 + attacker.config.stats.speed * 0.18);
  afterImages.push({ fighter: attacker, x: attacker.x, y: attacker.y, life: 12 });
  const close = rectsOverlap(getAttackRect(attacker, special.range || 74 + attacker.config.stats.range * 3, 66), defender);
  if (close) {
    applyDamage(
      defender,
      attacker,
      special.damage || 11 + Math.floor(attacker.config.stats.power * 0.55),
      attacker.facing * (special.knockback || 6.2 + attacker.config.stats.power * 0.25),
      -4.5,
      special.name || attacker.config.special,
      { stunFrames: framesFromMs(special.stun, 22) }
    );
  } else if (attacker.config.stats.range >= 7) {
    createProjectile(attacker, "special");
  } else {
    playTone(420, 0.05, "sawtooth", 0.025);
  }
}

function tryBlast(attacker) {
  if (attacker.blastCooldown > 0 || attacker.hitStun > 0) return;
  attacker.blastCooldown = framesFromMs(moveData(attacker, "blast").cooldown, 42);
  createProjectile(attacker, "blast");
}

function tryUltimate(attacker, defender) {
  const ultimate = moveData(attacker, "ultimate");
  const meterCost = ultimate.meterCost || 100;
  if (attacker.ultimateCooldown > 0 || attacker.meter < meterCost || attacker.hitStun > 0) return;
  attacker.ultimateCooldown = framesFromMs(ultimate.cooldown, 180);
  attacker.ultimateFrame = 72;
  attacker.meter = clamp(attacker.meter - meterCost, 0, 100);
  const now = performance.now();
  ultimateUntil = now + 1250;
  ui.ultimateBanner.textContent = ultimate.name || attacker.config.ultimate;
  ui.ultimateBanner.classList.add("show");
  setTimeout(() => ui.ultimateBanner.classList.remove("show"), 950);
  if (attacker.config.id === "nakaru") {
    freezeUntil = now + 430;
    codeGlyphs = Array.from({ length: 34 }, () => ({
      x: Math.random() * arena.width,
      y: 70 + Math.random() * 340,
      text: ["{}", "</>", "01", "N", "if", "=>"][Math.floor(Math.random() * 6)],
      life: 64 + Math.random() * 24,
      size: 13 + Math.random() * 18
    }));
    pendingUltimates.push({ attacker, defender, at: freezeUntil, ultimate });
  } else {
    resolveUltimate(attacker, defender, ultimate);
  }
  updateHud();
  playTone(90, 0.22, "sawtooth", 0.055);
  setTimeout(() => playTone(420, 0.18, "triangle", 0.045), 170);
}

function resolveUltimate(attacker, defender, ultimate) {
  const range = ultimate.range || 210 + attacker.config.stats.range * 14;
  const inRange = Math.abs(defender.x - attacker.x) < range && Math.abs(defender.y - attacker.y) < 140;
  shake = 24;
  flash = 16;
  spawnSpark(attacker.x, attacker.y - 52, attacker.config.accent, ultimate.name || attacker.config.ultimate);
  if (inRange) {
    applyDamage(
      defender,
      attacker,
      ultimate.damage || 27 + Math.floor(attacker.config.stats.power * 0.9),
      attacker.facing * (ultimate.knockback || 11),
      -8,
      ultimate.name || attacker.config.ultimate
    );
  }
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
    // Sound is optional; gameplay continues if the browser blocks audio.
  }
}

function playerInput(now) {
  if (!player || player.hitStun > 0) return;
  if (now < freezeUntil) return;
  const left = keys.has("a") || touch.left;
  const right = keys.has("d") || touch.right;
  const jump = pressed.has("w") || touch.jump;
  const speed = 2.7 + player.config.stats.speed * 0.16;
  player.blocking = keys.has("s") || touch.block;

  if (left && !player.blocking) {
    player.vx -= speed * 0.22;
    player.facing = -1;
  }
  if (right && !player.blocking) {
    player.vx += speed * 0.22;
    player.facing = 1;
  }
  if (jump && player.grounded && !player.blocking) {
    player.vy = -13.5 - player.config.stats.speed * 0.12;
    player.grounded = false;
    touch.jump = false;
  }

  if (pressed.has("j") || touch.attack) {
    tryBasic(player, cpu);
    touch.attack = false;
  }
  if (pressed.has("k") || touch.special) {
    trySpecial(player, cpu);
    touch.special = false;
  }
  if (pressed.has("l") || touch.blast) {
    tryBlast(player);
    touch.blast = false;
  }
  if (pressed.has("u") || touch.ultimate) {
    tryUltimate(player, cpu);
    touch.ultimate = false;
  }

  if (pressed.has("a")) handleDash("a", now, -1);
  if (pressed.has("d")) handleDash("d", now, 1);
}

function handleDash(key, now, direction) {
  if (player.dashCooldown > 0 || player.blocking) return;
  if (now - lastTap[key] < 240) {
    const dash = moveData(player, "dash");
    if (player.config.id === "nakaru") {
      player.x = clamp(player.x + direction * (dash.distance || 95), 34, arena.width - 34);
      spawnSpark(player.x - direction * 44, player.y - 44, player.config.accent, dash.name || "Undefined Step");
    } else {
      player.vx = direction * (9 + player.config.stats.speed * 0.32);
    }
    player.dashCooldown = framesFromMs(dash.cooldown, 34);
    afterImages.push({ fighter: player, x: player.x, y: player.y, life: 16 });
    playTone(760, 0.04, "triangle", 0.025);
  }
  lastTap[key] = now;
}

function cpuInput(now) {
  if (!cpu || !player || cpu.hitStun > 0) return;
  if (now < freezeUntil) return;
  if (now > cpuBrainAt) {
    const distance = player.x - cpu.x;
    const absDistance = Math.abs(distance);
    cpuIntent = {
      left: distance < -42,
      right: distance > 42,
      jump: Math.random() < 0.1 && player.y < cpu.y - 45,
      block: Math.random() < 0.14 && absDistance < 130
    };
    if (cpu.meter >= 100 && absDistance < 320) {
      tryUltimate(cpu, player);
    } else if (absDistance < 76 && Math.random() < 0.72) {
      tryBasic(cpu, player);
    } else if (absDistance < 145 && Math.random() < 0.42) {
      trySpecial(cpu, player);
    } else if (absDistance > 150 && Math.random() < 0.56) {
      cpu.facing = distance > 0 ? 1 : -1;
      tryBlast(cpu);
    }
    cpuBrainAt = now + 320 + Math.random() * 260;
  }

  const speed = 2.25 + cpu.config.stats.speed * 0.13;
  cpu.blocking = cpuIntent.block;
  if (cpuIntent.left && !cpu.blocking) {
    cpu.vx -= speed * 0.19;
    cpu.facing = -1;
  }
  if (cpuIntent.right && !cpu.blocking) {
    cpu.vx += speed * 0.19;
    cpu.facing = 1;
  }
  if (cpuIntent.jump && cpu.grounded) {
    cpu.vy = -12.5;
    cpu.grounded = false;
  }
}

function updateFighter(fighter) {
  fighter.attackCooldown = Math.max(0, fighter.attackCooldown - 1);
  fighter.specialCooldown = Math.max(0, fighter.specialCooldown - 1);
  fighter.blastCooldown = Math.max(0, fighter.blastCooldown - 1);
  fighter.ultimateCooldown = Math.max(0, fighter.ultimateCooldown - 1);
  fighter.dashCooldown = Math.max(0, fighter.dashCooldown - 1);
  fighter.hitStun = Math.max(0, fighter.hitStun - 1);
  fighter.attackFrame = Math.max(0, fighter.attackFrame - 1);
  fighter.specialFrame = Math.max(0, fighter.specialFrame - 1);
  fighter.ultimateFrame = Math.max(0, fighter.ultimateFrame - 1);

  fighter.vy += 0.72;
  const speedCap = fighter.blocking ? 2 : 6.5 + fighter.config.stats.speed * 0.28;
  fighter.vx = clamp(fighter.vx, -speedCap, speedCap);
  fighter.x += fighter.vx;
  fighter.y += fighter.vy;
  fighter.vx *= fighter.grounded ? 0.78 : 0.93;
  fighter.grounded = false;

  if (fighter.y >= arena.ground) {
    fighter.y = arena.ground;
    fighter.vy = 0;
    fighter.grounded = true;
  }

  for (const platform of arena.platforms) {
    const wasAbove = fighter.y - fighter.vy <= platform.y;
    const withinX = fighter.right > platform.x && fighter.left < platform.x + platform.width;
    if (fighter.vy >= 0 && wasAbove && withinX && fighter.y >= platform.y && fighter.y <= platform.y + platform.height + 18) {
      fighter.y = platform.y;
      fighter.vy = 0;
      fighter.grounded = true;
    }
  }

  if (fighter.x < 34) {
    fighter.x = 34;
    fighter.vx = Math.abs(fighter.vx) * 0.35;
  }
  if (fighter.x > arena.width - 34) {
    fighter.x = arena.width - 34;
    fighter.vx = -Math.abs(fighter.vx) * 0.35;
  }

  fighter.meter = clamp(fighter.meter + 0.025, 0, 100);
}

function updateProjectiles() {
  for (const projectile of projectiles) {
    projectile.x += projectile.vx;
    projectile.life -= 1;
    const target = projectile.owner === player ? cpu : player;
    const rect = makeRect(
      projectile.x - projectile.radius,
      projectile.y - projectile.radius,
      projectile.radius * 2,
      projectile.radius * 2
    );
    if (rectsOverlap(rect, target)) {
      applyDamage(target, projectile.owner, projectile.damage, Math.sign(projectile.vx) * projectile.knockback, -2.8, moveLabel(projectile.owner, "blast"));
      projectile.life = 0;
    }
  }
  projectiles = projectiles.filter((projectile) => projectile.life > 0 && projectile.x > -80 && projectile.x < arena.width + 80);
}

function updatePendingUltimates(now) {
  for (const pending of pendingUltimates) {
    if (now >= pending.at && !pending.resolved) {
      pending.resolved = true;
      resolveUltimate(pending.attacker, pending.defender, pending.ultimate);
      playTone(58, 0.16, "sawtooth", 0.06);
    }
  }
  pendingUltimates = pendingUltimates.filter((pending) => !pending.resolved);
}

function updateEffects() {
  sparks.forEach((spark) => {
    spark.x += spark.vx;
    spark.y += spark.vy;
    spark.vx *= 0.92;
    spark.vy *= 0.92;
    spark.life -= 1;
  });
  sparks = sparks.filter((spark) => spark.life > 0);

  numbers.forEach((number) => {
    number.y += number.vy;
    number.life -= 1;
  });
  numbers = numbers.filter((number) => number.life > 0);

  afterImages.forEach((image) => {
    image.life -= 1;
  });
  afterImages = afterImages.filter((image) => image.life > 0);

  codeGlyphs.forEach((glyph) => {
    glyph.y -= 0.35;
    glyph.life -= 1;
  });
  codeGlyphs = codeGlyphs.filter((glyph) => glyph.life > 0);

  shake = Math.max(0, shake - 0.7);
  flash = Math.max(0, flash - 1);
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
      ? `${player.name} wins with ${moveLabel(player, "ultimate")}.`
      : `${cpu.name} controls the arena. Choose a fighter and run it back.`;
    setState("result");
  }
}

function update(now) {
  if (state === "playing") {
    updatePendingUltimates(now);
    if (now < ultimateUntil) {
      shake = Math.max(shake, 8);
    }
    matchTime = Math.max(0, 99 - Math.floor((now - roundStart) / 1000));
    if (now >= freezeUntil) {
      playerInput(now);
      cpuInput(now);
      updateFighter(player);
      updateFighter(cpu);
      updateProjectiles();
    }
    updateEffects();
    updateHud();
    checkWin();
  } else {
    updateEffects();
  }
  pressed.clear();
}

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, arena.width, arena.height);
  gradient.addColorStop(0, "#120824");
  gradient.addColorStop(0.5, "#251447");
  gradient.addColorStop(1, "#080712");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, arena.width, arena.height);

  ctx.save();
  ctx.globalAlpha = 0.22;
  for (let i = 0; i < 9; i += 1) {
    ctx.strokeStyle = i % 2 ? "#f5c85b" : "#8f49ff";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(480, 450, 80 + i * 58, Math.PI * 1.08, Math.PI * 1.92);
    ctx.stroke();
  }
  ctx.restore();

  ctx.fillStyle = "rgba(255,255,255,0.06)";
  for (let x = 0; x < arena.width; x += 80) {
    ctx.fillRect(x, 120 + Math.sin(x * 0.02) * 18, 38, 3);
  }

  ctx.fillStyle = "#14111d";
  ctx.fillRect(0, arena.ground, arena.width, arena.height - arena.ground);
  ctx.fillStyle = "#21163a";
  ctx.fillRect(0, arena.ground, arena.width, 12);
  ctx.strokeStyle = "rgba(245,200,91,0.55)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, arena.ground + 2);
  ctx.lineTo(arena.width, arena.ground + 2);
  ctx.stroke();

  for (const platform of arena.platforms) {
    ctx.fillStyle = "rgba(245, 200, 91, 0.12)";
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    ctx.strokeStyle = "rgba(245, 200, 91, 0.48)";
    ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
  }
}

function drawFighter(fighter) {
  if (fighter.config.id === "nakaru") {
    drawNakaru(ctx, fighter);
    return;
  }

  const { color, accent } = fighter.config;
  ctx.save();
  ctx.translate(fighter.x, fighter.y);

  const aura = ctx.createRadialGradient(0, -46, 12, 0, -46, 76);
  aura.addColorStop(0, `${accent}88`);
  aura.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = aura;
  ctx.beginPath();
  ctx.arc(0, -46, 76, 0, Math.PI * 2);
  ctx.fill();

  if (fighter.blocking) {
    ctx.strokeStyle = "rgba(158, 220, 255, 0.86)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(fighter.facing * 18, -48, 46, -1.4, 1.4);
    ctx.stroke();
  }

  ctx.fillStyle = color;
  ctx.strokeStyle = accent;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(-fighter.width / 2, -fighter.height, fighter.width, fighter.height, 14);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(fighter.facing * 10, -65, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = accent;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(fighter.facing * 18, -52);
  ctx.lineTo(fighter.facing * 42, -36);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,0.72)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-12, -2);
  ctx.lineTo(-18, 20);
  ctx.moveTo(12, -2);
  ctx.lineTo(18, 20);
  ctx.stroke();

  if (fighter.attackFrame > 0) {
    drawAttackArc(fighter, 58, accent);
  }
  if (fighter.specialFrame > 0) {
    drawAttackArc(fighter, 92, color);
  }
  if (fighter.ultimateFrame > 0) {
    ctx.globalAlpha = 0.45;
    ctx.strokeStyle = accent;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(0, -48, 120 - fighter.ultimateFrame * 0.8, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
}

function drawNakaru(ctx, fighter) {
  const x = fighter.x;
  const y = fighter.y;
  const dir = fighter.facing || 1;

  ctx.save();
  ctx.translate(x, y);

  // aura
  ctx.globalAlpha = 0.35;
  ctx.fillStyle = "#6d28d9";
  ctx.beginPath();
  ctx.ellipse(0, -35, 42, 65, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  if (fighter.blocking) {
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(24 * dir, -44, 44, -1.35, 1.35);
    ctx.stroke();
    ctx.font = "bold 13px Arial";
    ctx.fillStyle = "#38bdf8";
    ctx.textAlign = "center";
    ctx.fillText("{ }", 32 * dir, -48);
  }

  // body hoodie
  ctx.fillStyle = "#0b0b12";
  ctx.fillRect(-18, -58, 36, 45);

  // hoodie trim
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 3;
  ctx.strokeRect(-18, -58, 36, 45);

  // head
  ctx.fillStyle = "#5a2f1d";
  ctx.beginPath();
  ctx.arc(0, -78, 16, 0, Math.PI * 2);
  ctx.fill();

  // hair
  ctx.fillStyle = "#111";
  ctx.fillRect(-16, -95, 32, 14);
  ctx.fillRect(-20, -86, 8, 30);
  ctx.fillRect(12, -86, 8, 30);

  // beard
  ctx.fillStyle = "#0a0a0a";
  ctx.beginPath();
  ctx.arc(0, -68, 10, 0, Math.PI);
  ctx.fill();

  // optional straw hat / headband look
  if (fighter.headwear === "headband") {
    ctx.fillStyle = "#0b0b12";
    ctx.fillRect(-20, -92, 40, 6);
    ctx.fillStyle = "#6d28d9";
    ctx.fillRect(-4, -92, 8, 6);
  } else {
    ctx.fillStyle = "#d6a84f";
    ctx.fillRect(-28, -99, 56, 5);
    ctx.fillRect(-16, -111, 32, 13);
  }

  // legs
  ctx.fillStyle = "#111827";
  ctx.fillRect(-16, -13, 12, 32);
  ctx.fillRect(4, -13, 12, 32);

  // shoes
  ctx.fillStyle = "#facc15";
  ctx.fillRect(-18, 18, 16, 6);
  ctx.fillRect(4, 18, 16, 6);

  // arms
  ctx.strokeStyle = "#0b0b12";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(-18, -48);
  ctx.lineTo(-34 * dir, -28);
  ctx.moveTo(18, -48);
  ctx.lineTo(34 * dir, -28);
  ctx.stroke();

  // glowing thread hand
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(30 * dir, -28);
  ctx.lineTo(55 * dir, -36);
  ctx.lineTo(68 * dir, -22);
  ctx.stroke();

  if (fighter.attackFrame > 0) {
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 3;
    for (let i = 0; i < 3; i += 1) {
      ctx.beginPath();
      ctx.moveTo(24 * dir, -52 + i * 12);
      ctx.lineTo((64 + i * 10) * dir, -58 + i * 9);
      ctx.stroke();
    }
  }

  if (fighter.specialFrame > 0) {
    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(20 * dir, -45);
    ctx.lineTo(72 * dir, -45);
    ctx.stroke();
  }

  if (fighter.ultimateFrame > 0) {
    ctx.globalAlpha = 0.55;
    ctx.strokeStyle = "#6d28d9";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(0, -44, 132 - fighter.ultimateFrame * 0.7, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // chest logo placeholder
  ctx.fillStyle = "#facc15";
  ctx.font = "bold 10px Arial";
  ctx.textAlign = "center";
  ctx.fillText("N", 0, -35);

  ctx.restore();
}

function drawAttackArc(fighter, reach, color) {
  ctx.save();
  ctx.globalAlpha = 0.72;
  ctx.strokeStyle = color;
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.arc(fighter.facing * 24, -48, reach, fighter.facing > 0 ? -0.8 : Math.PI - 0.8, fighter.facing > 0 ? 0.8 : Math.PI + 0.8);
  ctx.stroke();
  ctx.restore();
}

function drawProjectiles() {
  for (const projectile of projectiles) {
    ctx.save();
    ctx.shadowColor = projectile.color;
    ctx.shadowBlur = 18;
    ctx.fillStyle = projectile.color;
    ctx.beginPath();
    ctx.arc(projectile.x, projectile.y, projectile.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.35;
    ctx.fillRect(projectile.x - projectile.vx * 2.4, projectile.y - 3, projectile.vx * 2.4, 6);
    ctx.restore();
  }
}

function drawEffects() {
  for (const image of afterImages) {
    ctx.save();
    ctx.globalAlpha = image.life / 30;
    ctx.fillStyle = image.fighter.config.accent;
    ctx.beginPath();
    ctx.roundRect(image.x - image.fighter.width / 2, image.y - image.fighter.height, image.fighter.width, image.fighter.height, 14);
    ctx.fill();
    ctx.restore();
  }

  for (const spark of sparks) {
    ctx.save();
    ctx.globalAlpha = spark.life / 24;
    ctx.fillStyle = spark.color;
    ctx.beginPath();
    ctx.arc(spark.x, spark.y, 3 + spark.life * 0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  for (const number of numbers) {
    ctx.save();
    ctx.globalAlpha = number.life / 44;
    ctx.fillStyle = "#fff7cb";
    ctx.font = "900 18px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(number.text, number.x, number.y);
    ctx.restore();
  }

  for (const glyph of codeGlyphs) {
    ctx.save();
    ctx.globalAlpha = Math.min(0.9, glyph.life / 70);
    ctx.fillStyle = Math.random() > 0.45 ? "#38bdf8" : "#facc15";
    ctx.font = `900 ${glyph.size}px Consolas, monospace`;
    ctx.textAlign = "center";
    ctx.fillText(glyph.text, glyph.x, glyph.y);
    ctx.restore();
  }

  if (flash > 0) {
    ctx.save();
    ctx.globalAlpha = flash / 38;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, arena.width, arena.height);
    ctx.restore();
  }
}

function drawMoveText(fighter, align) {
  const active = fighter.ultimateFrame > 0
    ? moveLabel(fighter, "ultimate")
    : fighter.specialFrame > 0
      ? moveLabel(fighter, "special")
      : fighter.attackFrame > 0
        ? moveLabel(fighter, "basic")
        : "";
  if (!active) return;
  ctx.save();
  ctx.fillStyle = fighter.config.accent;
  ctx.font = "900 18px Inter, sans-serif";
  ctx.textAlign = align;
  ctx.fillText(active, align === "left" ? 22 : arena.width - 22, 38);
  ctx.restore();
}

function draw() {
  ctx.save();
  if (shake > 0) {
    ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
  }
  drawBackground();
  if (player && cpu) {
    drawEffects();
    drawProjectiles();
    drawFighter(player);
    drawFighter(cpu);
    drawMoveText(player, "left");
    drawMoveText(cpu, "right");
  }
  ctx.restore();
}

function loop(now) {
  const delta = now - lastTime;
  lastTime = now;
  if (delta < 80) update(now);
  draw();
  requestAnimationFrame(loop);
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
    if (player?.config.id === "nakaru") player.headwear = nakaruHeadwear;
    updateNakaruLookButton();
    playTone(490, 0.04, "triangle", 0.025);
  });
  document.querySelectorAll("[data-close-panel]").forEach((button) => {
    button.addEventListener("click", () => setState("menu"));
  });

  window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (["a", "d", "w", "s", "j", "k", "l", "u", " "].includes(key)) {
      event.preventDefault();
    }
    if (!keys.has(key)) pressed.add(key);
    keys.add(key);
  });

  window.addEventListener("keyup", (event) => {
    keys.delete(event.key.toLowerCase());
  });

  document.querySelectorAll("[data-touch]").forEach((button) => {
    const action = button.dataset.touch;
    const start = (event) => {
      event.preventDefault();
      touch[action] = true;
    };
    const end = (event) => {
      event.preventDefault();
      if (["left", "right", "block"].includes(action)) touch[action] = false;
    };
    button.addEventListener("pointerdown", start);
    button.addEventListener("pointerup", end);
    button.addEventListener("pointercancel", end);
    button.addEventListener("pointerleave", end);
  });
}

function boot() {
  if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function roundRect(x, y, width, height, radius) {
      const r = Math.min(radius, width / 2, height / 2);
      this.beginPath();
      this.moveTo(x + r, y);
      this.arcTo(x + width, y, x + width, y + height, r);
      this.arcTo(x + width, y + height, x, y + height, r);
      this.arcTo(x, y + height, x, y, r);
      this.arcTo(x, y, x + width, y, r);
      this.closePath();
      return this;
    };
  }
  renderCharacterSelect();
  bindUi();
  startMatch();
  setState("menu");
  requestAnimationFrame(loop);
}

boot();
