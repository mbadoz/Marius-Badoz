// ================================================
// PIXEL WORLD — Scrollytelling RPG Portfolio
// Hero Room (Three.js) → 2.5D World (HTML/CSS/JS)
// ================================================
import * as THREE from 'three';

// ─── CONFIG ───
const CFG = {
  scrollPerZone: 800,    // pixels of scroll per zone
  lerpSpeed: 0.08,
  charSpeed: 0.12,       // character walk animation speed
  typewriterSpeed: 30,   // ms per character
};

// ─── PORTFOLIO DATA ───
const ZONES = [
  {
    id: 'hero', year: '', title: 'MARIUS BADOZ',
    subtitle: 'AI Solution Architect • GenAI Specialist',
    accroche: "Ma forte curiosité m'a poussé à bâtir des bases solides sur chaque domaine technique — Cloud, Data, Fullstack. Je me sers de cette expertise pour proposer des solutions sûres et performantes, notamment dans les problématiques liées à l'IA.",
    bg: 'bg_hero_room.png', bgColor: '#2a1f3d',
    items: [
      { type: 'link', icon: 'linkedin', url: 'https://www.linkedin.com/in/marius-badoz/', label: 'LinkedIn' },
      { type: 'link', icon: 'github', url: 'https://github.com/mbadoz', label: 'GitHub' },
      { type: 'link', icon: 'scroll', url: 'cv.html', label: 'Mon CV' },
    ]
  },
  {
    id: 'iut', year: '2023-2025', title: 'IUT Poitiers',
    section: 'Formation', badge: 'Mention Bien',
    accroche: "J'ai posé mes fondations en data science à l'IUT de Poitiers. Deux années intenses où j'ai appris à manier les données, les stats et le code.",
    detail: "DUT Science des Données — Formation complète en statistique, informatique et data science. Apprentissage de Python, R, SQL, et des méthodes analytiques.",
    tags: ['Python', 'R', 'SQL', 'Statistiques', 'Data Science'],
    bg: 'bg_zone1_iut.png', bgColor: '#1a4a2e', direction: 'right',
  },
  {
    id: 'freelance', year: '2024-2025', title: 'Freelance AI Automation',
    section: 'Projets', badge: 'Août 2024 — Mars 2025',
    accroche: "En parallèle, j'ai lancé mon activité freelance : automatiser les process des indépendants grâce à l'IA. Dashboards, acquisition, conseil.",
    detail: "Automatisation avec IA pour infopreneurs indépendants : tableaux de bord, process d'acquisition client, avant-ventes et conseil.",
    tags: ['Automation IA', 'Dashboards', 'Acquisition', 'Conseil'],
    bg: 'bg_zone2_freelance.png', bgColor: '#1a1a3d', direction: 'down',
  },
  {
    id: 'groupama-ca', year: '2024-2025', title: 'Groupama Centre Atlantique',
    section: 'Expérience', badge: 'Août 2024 — Août 2025',
    accroche: "Ma première alternance chez Groupama à Niort. J'ai automatisé des process et créé des dashboards qui sont devenus la référence pour les managers.",
    detail: "Technicien Pilotage & Organisation — Automatisation de processus métier via Python, SQL et intégrations API. Conception d'applications décisionnelles QlikSense devenues l'outil de référence des responsables d'équipe commerciale.",
    tags: ['Python', 'QlikSense', 'SQL', 'API', 'Automatisation'],
    bg: 'bg_zone3_groupama_ca.png', bgColor: '#2d3a1a', direction: 'left',
    links: [],
  },
  {
    id: 'efrei', year: '2025-2028', title: 'EFREI Paris',
    section: 'Formation', badge: 'En cours',
    accroche: "Direction Paris ! J'intègre EFREI pour un diplôme d'ingénieur Big Data & Machine Learning. L'aventure continue.",
    detail: "Diplôme Ingénieur Big Data & ML — Machine Learning, Text Mining, Statistiques appliquées, Programmation fonctionnelle, Data Visualisation, NoSQL, Cloud computing, DevOps & MLOps.",
    tags: ['ML', 'Text Mining', 'Cloud', 'DevOps', 'MLOps', 'NoSQL'],
    bg: 'bg_zone4_efrei.png', bgColor: '#1a2a4d', direction: 'right',
    transition: 'airplane', // Special transition: airplane Niort → Paris
  },
  {
    id: 'dver', year: '2025', title: 'Dver',
    section: 'Projets', badge: 'Août 2025 — Présent • En production',
    accroche: "Mon projet phare : une app mobile de pilotage commercial. Architecture full-stack, multi-tenant, sécurisée. En production !",
    detail: "Application mobile React Native multi-tenant. UI et fonctionnalités pensées pour maximiser l'efficacité utilisateur. Architecture full-stack cross-platform sécurisée.",
    tags: ['React Native', 'Node.js / Hono', 'PostgreSQL', 'JWT', 'Drizzle ORM'],
    bg: 'bg_zone5_dver.png', bgColor: '#2d1a4d', direction: 'down',
    links: [{ text: 'dver.app', url: 'https://dver.app/' }],
  },
  {
    id: 'groupama-ss', year: '2025-2026', title: 'Groupama Supports & Services',
    section: 'Expérience', badge: 'Août 2025 — Aujourd\'hui',
    accroche: "Ingénieur Data chez G2S à Paris. Pipelines massifs, systèmes RAG multi-agents, 2 milliards d'euros d'encours gérés au quotidien.",
    detail: "Architecture et optimisation de pipelines de données pour des volumes massifs (2Mrd€ d'encours). Système RAG multi-agents facilitant la migration fonctionnelle. Gestion de l'infocentre de Groupama Épargne Salariale.",
    tags: ['Python', 'SQL', 'RAG', 'ML', 'Data Pipelines'],
    bg: 'bg_zone6_groupama_ss.png', bgColor: '#1a2a1a', direction: 'left',
  },
  {
    id: 'side-projects', year: '2026', title: 'Projets Open Source',
    section: 'Projets', badge: '2026',
    accroche: "Quelques projets perso pour explorer, apprendre et partager. AlgoVizz pour visualiser les algorithmes, PNG to SVG pour convertir des icônes.",
    detail: "AlgoVizz — Visualiseur interactif d'algorithmes de tri et recherche. PNG to SVG — Outil de conversion d'icônes PNG en SVG avec CLI Python et interface web. Tous deux open source.",
    tags: ['JavaScript', 'Python', 'CLI', 'Visualisation', 'Open Source'],
    bg: 'bg_zone7_pngtosvg.png', bgColor: '#2a2a1a', direction: 'right',
    links: [
      { text: 'AlgoVizz', url: 'https://github.com/mbadoz/AlgoVizz' },
      { text: 'PNG to SVG', url: 'https://github.com/mbadoz/PNG_to_SVG' },
    ],
  },
  {
    id: 'contact', year: '', title: 'Contact',
    section: 'Contact',
    accroche: "Tu as un projet, une question, ou juste envie de discuter tech ? N'hésite pas à me contacter !",
    bg: 'bg_zone9_contact.png', bgColor: '#3d2a1a', direction: 'right',
    contactInfo: {
      email: 'badozmarius@gmail.com',
      linkedin: 'https://www.linkedin.com/in/marius-badoz/',
      github: 'https://github.com/mbadoz',
    },
  },
];

// ─── SKILLS INVENTORY DATA ───
const SKILLS = {
  'Data Science & IA': [
    { name: 'PyTorch', icon: '🔥' },
    { name: 'TensorFlow', icon: '🧠' },
    { name: 'Scikit-learn', icon: '📊' },
    { name: 'R', icon: '📈' },
    { name: 'Stats Analytiques', icon: '📐' },
    { name: 'Structure de données', icon: '🗂️' },
  ],
  'GenAI': [
    { name: 'Systèmes Prompt', icon: '💬' },
    { name: 'LangChain', icon: '🔗' },
    { name: 'Autogen', icon: '🤖' },
    { name: 'RAG', icon: '📚' },
    { name: 'Agents IA', icon: '🕵️' },
    { name: 'ChromaDB', icon: '🎨' },
  ],
  'Data Eng & BI': [
    { name: 'SQL (PostgreSQL, MySQL, Oracle)', icon: '🗄️' },
    { name: 'NoSQL', icon: '📦' },
    { name: 'Python (Pandas, Streamlit)', icon: '🐍' },
    { name: 'ETL', icon: '⚙️' },
    { name: 'QlikSense', icon: '📊' },
    { name: 'Scraping', icon: '🕸️' },
  ],
  'Backend': [
    { name: 'Node.js / Hono', icon: '🟢' },
    { name: 'PHP', icon: '🐘' },
    { name: 'Java', icon: '☕' },
    { name: 'C', icon: '⚡' },
    { name: 'REST API', icon: '🔌' },
    { name: 'Auth Middleware', icon: '🔐' },
    { name: 'Validation', icon: '✅' },
  ],
  'Frontend': [
    { name: 'TypeScript', icon: '📘' },
    { name: 'React Native / Expo', icon: '📱' },
    { name: 'JavaScript', icon: '💛' },
  ],
  'Cloud, DevOps & Systèmes': [
    { name: 'Docker', icon: '🐳' },
    { name: 'Git / GitHub', icon: '🔀' },
    { name: 'Invite de commande', icon: '💻' },
  ],
};

// ─── STATE ───
let isActive = false, isInitialized = false;
let scrollTarget = 0, scrollCurrent = 0;
let currentZoneIdx = 0, lastZoneIdx = -1;
let inventoryOpen = false, modalOpen = false, dialogueOpen = false;
let heroRenderer, heroScene, heroCamera, heroClock;
let heroInteractables = [], heroAnimFrame = null;

// ─── SPRITE ANIMATION STATE ───
let spriteFrame = 0, spriteTimer = 0, spriteDirection = 'south';
const SPRITE_WALK_FRAMES = 6;
const SPRITE_IDLE_FRAMES = 4;
const SPRITE_WALK_INTERVAL = 120; // ms per frame
const SPRITE_IDLE_INTERVAL = 300;
let lastSpriteTime = 0;

let lastSpriteAnim = '';

function updateSpriteFrame(isWalking) {
  const now = performance.now();
  const anim = isWalking ? 'walking' : 'breathing-idle';
  const maxFrames = isWalking ? SPRITE_WALK_FRAMES : SPRITE_IDLE_FRAMES;
  const interval = isWalking ? SPRITE_WALK_INTERVAL : SPRITE_IDLE_INTERVAL;

  // Reset frame when switching animation type
  if (anim !== lastSpriteAnim) {
    spriteFrame = 0;
    lastSpriteAnim = anim;
    lastSpriteTime = now;
  }

  if (now - lastSpriteTime > interval) {
    spriteFrame = (spriteFrame + 1) % maxFrames;
    lastSpriteTime = now;
  }

  // Clamp frame to max (safety)
  if (spriteFrame >= maxFrames) spriteFrame = 0;

  const sprite = el('pixel-char-sprite');
  if (sprite) {
    const framePath = `assets/pixel/marius_sprites/animations/${anim}/${spriteDirection}/frame_${String(spriteFrame).padStart(3, '0')}.png`;
    if (sprite.dataset.current !== framePath) {
      sprite.src = framePath;
      sprite.dataset.current = framePath;
    }
  }
}

let heroSpriteInterval = null;

function startHeroSpriteAnim() {
  const heroChar = el('pixel-hero-char');
  if (!heroChar) return;
  let frame = 0;
  heroSpriteInterval = setInterval(() => {
    frame = (frame + 1) % SPRITE_IDLE_FRAMES;
    heroChar.src = `assets/pixel/marius_sprites/animations/breathing-idle/south/frame_${String(frame).padStart(3, '0')}.png`;
  }, SPRITE_IDLE_INTERVAL);
}

function stopHeroSpriteAnim() {
  if (heroSpriteInterval) {
    clearInterval(heroSpriteInterval);
    heroSpriteInterval = null;
  }
}

// ─── HELPERS ───
function el(id) { return document.getElementById(id); }
function qs(sel, parent) { return (parent || document).querySelector(sel); }
function qsa(sel, parent) { return (parent || document).querySelectorAll(sel); }

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function lerp(a, b, t) { return a + (b - a) * t; }

function assetPath(filename) {
  return `assets/pixel/${filename}`;
}

// ─── TYPEWRITER EFFECT ───
function typewriter(element, text, speed = CFG.typewriterSpeed) {
  return new Promise(resolve => {
    element.textContent = '';
    let i = 0;
    const type = () => {
      if (i < text.length) {
        element.textContent += text[i];
        i++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    };
    type();
  });
}

// ═══════════════════════════════════════
// HERO ROOM — Three.js with pixel textures
// ═══════════════════════════════════════
function pixTex(size, fn) {
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  fn(c.getContext('2d'), size);
  const t = new THREE.CanvasTexture(c);
  t.magFilter = THREE.NearestFilter;
  t.minFilter = THREE.NearestFilter;
  return t;
}

function buildHeroRoom() {
  const canvas = el('pixel-canvas-hero');
  // Skip Three.js if canvas is hidden (using pixel art hero instead)
  if (!canvas || canvas.style.display === 'none') {
    // Start idle animation for the hero sprite
    startHeroSpriteAnim();
    return;
  }

  heroRenderer = new THREE.WebGLRenderer({ canvas, antialias: false });
  heroRenderer.setPixelRatio(1);
  const w = Math.floor(window.innerWidth / 3);
  const h = Math.floor(window.innerHeight / 3);
  heroRenderer.setSize(w, h);
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';

  heroScene = new THREE.Scene();
  heroScene.background = new THREE.Color(0x2a1f3d);
  heroCamera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
  heroCamera.position.set(0, 6, 8);
  heroCamera.lookAt(0, 0, 0);
  heroClock = new THREE.Clock();

  // Lighting — cozy warm room
  heroScene.add(new THREE.AmbientLight(0xfff5e0, 0.9));
  const dirLight = new THREE.DirectionalLight(0xffd080, 0.8);
  dirLight.position.set(3, 8, 5);
  heroScene.add(dirLight);
  const pointLight = new THREE.PointLight(0xff9944, 0.6, 15);
  pointLight.position.set(-2, 4, 2);
  heroScene.add(pointLight);

  // Floor — wooden planks texture
  const floorTex = pixTex(64, (ctx, s) => {
    ctx.fillStyle = '#8b6914'; ctx.fillRect(0, 0, s, s);
    for (let y = 0; y < s; y += 8) {
      ctx.fillStyle = `hsl(35, 60%, ${35 + Math.random() * 15}%)`;
      ctx.fillRect(0, y, s, 7);
      ctx.fillStyle = '#5a4510'; ctx.fillRect(0, y + 7, s, 1);
    }
    // Wood grain
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `hsla(35, 40%, ${30 + Math.random() * 20}%, 0.3)`;
      ctx.fillRect(Math.random() * s, Math.random() * s, 2, 2);
    }
  });
  floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
  floorTex.repeat.set(4, 4);
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.8 })
  );
  floor.rotation.x = -Math.PI / 2;
  heroScene.add(floor);

  // Walls
  const wallTex = pixTex(32, (ctx, s) => {
    ctx.fillStyle = '#e8dccc'; ctx.fillRect(0, 0, s, s);
    for (let y = 0; y < s; y += 4) {
      for (let x = 0; x < s; x += 4) {
        if (Math.random() > 0.7) {
          ctx.fillStyle = `hsl(30, 20%, ${80 + Math.random() * 10}%)`;
          ctx.fillRect(x, y, 4, 4);
        }
      }
    }
  });
  wallTex.wrapS = wallTex.wrapT = THREE.RepeatWrapping;
  wallTex.repeat.set(3, 2);

  // Back wall
  const backWall = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 6),
    new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.9 })
  );
  backWall.position.set(0, 3, -5);
  heroScene.add(backWall);

  // Side walls
  const leftWall = backWall.clone();
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-5, 3, 0);
  heroScene.add(leftWall);

  const rightWall = backWall.clone();
  rightWall.rotation.y = -Math.PI / 2;
  rightWall.position.set(5, 3, 0);
  heroScene.add(rightWall);

  // ─── Room Objects ───
  const matWood = new THREE.MeshStandardMaterial({ color: 0x6b4423, roughness: 0.7 });
  const matDarkWood = new THREE.MeshStandardMaterial({ color: 0x4a2f15, roughness: 0.8 });

  // Desk
  const desk = new THREE.Mesh(new THREE.BoxGeometry(3, 0.15, 1.5), matWood);
  desk.position.set(2, 1.5, -4);
  heroScene.add(desk);
  // Desk legs
  [[-1, 0, -0.5], [1, 0, -0.5], [-1, 0, 0.5], [1, 0, 0.5]].forEach(([dx, dy, dz]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.5, 0.1), matDarkWood);
    leg.position.set(2 + dx, 0.75, -4 + dz);
    heroScene.add(leg);
  });

  // Computer on desk
  const screenMat = new THREE.MeshStandardMaterial({ color: 0x223344, emissive: 0x334455, emissiveIntensity: 0.5 });
  const screen = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 0.05), screenMat);
  screen.position.set(2, 2.1, -4.2);
  heroScene.add(screen);
  // Screen glow
  const screenLight = new THREE.PointLight(0x4488aa, 0.4, 5);
  screenLight.position.set(2, 2, -3.5);
  heroScene.add(screenLight);

  // Bookshelf  
  const shelf = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 0.4), matDarkWood);
  shelf.position.set(-3, 1.5, -4.7);
  heroScene.add(shelf);
  // Books
  const bookColors = [0xcc3333, 0x3366cc, 0x33aa55, 0xddaa33, 0x9933cc, 0xdd6633];
  for (let r = 0; r < 3; r++) {
    for (let b = 0; b < 4; b++) {
      const book = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.6, 0.3),
        new THREE.MeshStandardMaterial({ color: bookColors[(r * 4 + b) % bookColors.length], roughness: 0.9 })
      );
      book.position.set(-3.6 + b * 0.45, 0.5 + r * 1, -4.5);
      heroScene.add(book);
    }
  }

  // Rug
  const rugTex = pixTex(32, (ctx, s) => {
    ctx.fillStyle = '#8b2252'; ctx.fillRect(0, 0, s, s);
    ctx.strokeStyle = '#cc6633'; ctx.lineWidth = 2;
    ctx.strokeRect(3, 3, s - 6, s - 6);
    ctx.strokeStyle = '#ddaa44'; ctx.lineWidth = 1;
    ctx.strokeRect(6, 6, s - 12, s - 12);
    // Pattern
    for (let i = 8; i < s - 8; i += 4) {
      ctx.fillStyle = '#cc6633';
      ctx.fillRect(i, s / 2 - 1, 2, 2);
    }
  });
  const rug = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 3),
    new THREE.MeshStandardMaterial({ map: rugTex, roughness: 0.95 })
  );
  rug.rotation.x = -Math.PI / 2;
  rug.position.set(0, 0.02, 0);
  heroScene.add(rug);

  // ─── Character (Marius) — Simple voxel style ───
  const charGroup = new THREE.Group();
  charGroup.position.set(0, 0, 0);
  
  // Body
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2255aa, roughness: 0.7 }); // Blue sweater
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.2, 0.5), bodyMat);
  body.position.y = 1.6;
  charGroup.add(body);
  
  // Head
  const headMat = new THREE.MeshStandardMaterial({ color: 0xf0c090, roughness: 0.6 });
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.5), headMat);
  head.position.y = 2.5;
  charGroup.add(head);
  
  // Hair (brown curly)
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x553322, roughness: 0.9 });
  const hair = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.35, 0.55), hairMat);
  hair.position.set(0, 2.85, -0.02);
  charGroup.add(hair);
  // Side hair
  const hairL = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.3, 0.4), hairMat);
  hairL.position.set(-0.35, 2.55, 0);
  charGroup.add(hairL);
  const hairR = hairL.clone();
  hairR.position.x = 0.35;
  charGroup.add(hairR);
  
  // Eyes
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
  const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.05), eyeMat);
  eyeL.position.set(-0.15, 2.5, 0.26);
  charGroup.add(eyeL);
  const eyeR = eyeL.clone();
  eyeR.position.x = 0.15;
  charGroup.add(eyeR);

  // Legs
  const legMat = new THREE.MeshStandardMaterial({ color: 0x333344, roughness: 0.8 });
  const legL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1, 0.4), legMat);
  legL.position.set(-0.2, 0.5, 0);
  charGroup.add(legL);
  const legR = legL.clone();
  legR.position.x = 0.2;
  charGroup.add(legR);

  // Arms
  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.9, 0.3), bodyMat);
  armL.position.set(-0.5, 1.5, 0);
  charGroup.add(armL);
  const armR = armL.clone();
  armR.position.x = 0.5;
  charGroup.add(armR);

  heroScene.add(charGroup);

  // ─── Interactable objects ───
  // LinkedIn icon (glowing blue cube on shelf)
  const linkedinMat = new THREE.MeshStandardMaterial({ color: 0x0077b5, emissive: 0x0077b5, emissiveIntensity: 0.5, roughness: 0.3 });
  const linkedin = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), linkedinMat);
  linkedin.position.set(-3.2, 3.2, -4.5);
  linkedin.userData = { url: 'https://www.linkedin.com/in/marius-badoz/', label: 'LinkedIn', hoverColor: 0x00aaff };
  heroScene.add(linkedin);
  heroInteractables.push(linkedin);

  // GitHub icon (dark sphere on desk)
  const githubMat = new THREE.MeshStandardMaterial({ color: 0x333333, emissive: 0x444444, emissiveIntensity: 0.3, roughness: 0.4 });
  const github = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), githubMat);
  github.position.set(-2.5, 3.2, -4.5);
  github.userData = { url: 'https://github.com/mbadoz', label: 'GitHub', hoverColor: 0x888888 };
  heroScene.add(github);
  heroInteractables.push(github);

  // CV Scroll (golden on desk)
  const scrollMat = new THREE.MeshStandardMaterial({ color: 0xddaa44, emissive: 0xddaa44, emissiveIntensity: 0.3, roughness: 0.5 });
  const cvScroll = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.6, 6), scrollMat);
  cvScroll.position.set(3, 1.85, -3.8);
  cvScroll.rotation.z = Math.PI / 2;
  cvScroll.userData = { url: 'cv.html', label: 'Mon CV', hoverColor: 0xffcc44 };
  heroScene.add(cvScroll);
  heroInteractables.push(cvScroll);

  // Interaction badges (!) above each item
  heroInteractables.forEach(item => {
    const badge = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.3, 0.05),
      new THREE.MeshStandardMaterial({ color: 0xffcc00, emissive: 0xffcc00, emissiveIntensity: 0.8 })
    );
    badge.position.copy(item.position);
    badge.position.y += 0.8;
    item.userData.badge = badge;
    heroScene.add(badge);
  });

  // Raycaster for hero room clicks
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  el('pixel-canvas-hero').addEventListener('click', (e) => {
    const rect = heroRenderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, heroCamera);
    const hits = raycaster.intersectObjects(heroInteractables);
    if (hits.length > 0) {
      const data = hits[0].object.userData;
      if (data.url) window.open(data.url, '_blank');
    }
  });

  // Hover effect
  el('pixel-canvas-hero').addEventListener('mousemove', (e) => {
    const rect = heroRenderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, heroCamera);
    const hits = raycaster.intersectObjects(heroInteractables);
    heroRenderer.domElement.style.cursor = hits.length > 0 ? 'pointer' : 'default';
    heroInteractables.forEach(item => {
      item.material.emissiveIntensity = 0.3;
    });
    if (hits.length > 0) {
      hits[0].object.material.emissiveIntensity = 0.8;
    }
  });

  // Animation loop for hero room
  function animateHero() {
    heroAnimFrame = requestAnimationFrame(animateHero);
    const time = heroClock.getElapsedTime();

    // Idle breathing for character
    charGroup.position.y = Math.sin(time * 1.5) * 0.05;
    
    // Badge float animation
    heroInteractables.forEach(item => {
      if (item.userData.badge) {
        item.userData.badge.position.y = item.position.y + 0.8 + Math.sin(time * 3 + item.position.x) * 0.1;
      }
    });

    // Camera gentle float
    heroCamera.position.y = 6 + Math.sin(time * 0.5) * 0.2;

    heroRenderer.render(heroScene, heroCamera);
  }

  heroClock.start();
  animateHero();
}

function stopHeroRoom() {
  if (heroAnimFrame) {
    cancelAnimationFrame(heroAnimFrame);
    heroAnimFrame = null;
  }
  stopHeroSpriteAnim();
}

// ═══════════════════════════════════════
// SCROLLYTELLING ENGINE
// ═══════════════════════════════════════
function getTotalScroll() {
  return ZONES.length * CFG.scrollPerZone;
}

function getZoneProgress(scrollPos) {
  const zone = Math.floor(scrollPos / CFG.scrollPerZone);
  const progress = (scrollPos % CFG.scrollPerZone) / CFG.scrollPerZone;
  return { zone: clamp(zone, 0, ZONES.length - 1), progress };
}

function updateWorld() {
  scrollCurrent = lerp(scrollCurrent, scrollTarget, CFG.lerpSpeed);
  const { zone, progress } = getZoneProgress(scrollCurrent);
  currentZoneIdx = zone;

  // Update Year HUD
  updateYearHUD(zone);

  // Update zone visibility and parallax
  updateZones(zone, progress);

  // Update character position
  updateCharacter(zone, progress);

  // Check for zone change
  if (zone !== lastZoneIdx) {
    onZoneChange(zone, lastZoneIdx);
    lastZoneIdx = zone;
  }

  // Hero room visibility
  const heroSection = el('pixel-hero-section');
  const worldSection = el('pixel-world-section');
  if (heroSection && worldSection) {
    if (zone === 0 && progress < 0.8) {
      heroSection.style.opacity = 1 - progress * 1.25;
      heroSection.style.display = '';
      worldSection.style.opacity = progress;
    } else {
      heroSection.style.opacity = '0';
      heroSection.style.display = 'none';
      worldSection.style.opacity = '1';
    }
  }

  // Progress bar
  const progressFill = el('pixel-progress-fill');
  if (progressFill) {
    const totalProgress = scrollCurrent / getTotalScroll();
    progressFill.style.width = (totalProgress * 100) + '%';
  }

  requestAnimationFrame(updateWorld);
}

function updateYearHUD(zoneIdx) {
  const yearEl = el('pixel-year-text');
  if (!yearEl) return;
  const zone = ZONES[zoneIdx];
  if (zone && zone.year) {
    yearEl.textContent = zone.year;
    el('pixel-year-hud').style.opacity = '1';
  } else {
    el('pixel-year-hud').style.opacity = '0';
  }
}

function updateZones(currentZone, progress) {
  const zones = qsa('.pixel-zone');
  zones.forEach((zoneEl, i) => {
    // DOM zones start at ZONES[1] (hero is index 0), so dataIndex = i + 1
    const dataIndex = i + 1;
    if (dataIndex === currentZone) {
      zoneEl.classList.add('active');
      zoneEl.style.opacity = '1';
      // Parallax on background
      const bg = qs('.pixel-zone-bg', zoneEl);
      if (bg) {
        const dir = ZONES[dataIndex]?.direction || 'right';
        if (dir === 'right') bg.style.transform = `translateX(${-progress * 30}%)`;
        else if (dir === 'left') bg.style.transform = `translateX(${progress * 30}%)`;
        else if (dir === 'down') bg.style.transform = `translateY(${-progress * 20}%)`;
        else bg.style.transform = `translateX(${-progress * 30}%)`;
      }
    } else {
      zoneEl.style.opacity = '0';
      zoneEl.classList.remove('active');
    }
  });
}

function updateCharacter(zoneIdx, progress) {
  const char = el('pixel-character');
  if (!char) return;

  // Character walks based on scroll speed
  const scrollSpeed = Math.abs(scrollTarget - scrollCurrent);
  const isWalking = scrollSpeed > 1;

  if (isWalking) {
    char.classList.add('walking');
    char.classList.remove('idle');
  } else {
    char.classList.remove('walking');
    char.classList.add('idle');
  }

  // Direction based on zone — map to sprite direction
  const dir = ZONES[zoneIdx]?.direction || 'right';
  if (dir === 'left') {
    spriteDirection = 'west';
    char.classList.remove('flip');
  } else if (dir === 'right') {
    spriteDirection = 'east';
    char.classList.remove('flip');
  } else if (dir === 'down') {
    spriteDirection = 'south';
    char.classList.remove('flip');
  } else {
    spriteDirection = 'south';
    char.classList.remove('flip');
  }

  // Update sprite frame animation
  updateSpriteFrame(isWalking);

  // Position character
  const xPos = 30 + progress * 40; // 30% to 70% horizontal
  char.style.left = xPos + '%';
}

function onZoneChange(newZone, oldZone) {
  // Auto-close any open dialogue/modal when changing zones
  if (dialogueOpen) closeDialogue(true);
  if (modalOpen) closeModal();

  // Show dialogue for new zone
  if (newZone > 0 && ZONES[newZone]) {
    // Small delay to let the transition start
    setTimeout(() => showDialogue(newZone), 400);
  }

  // Trigger transition effect
  if (oldZone >= 0) {
    triggerTransition(ZONES[newZone]?.transition || getDefaultTransition(newZone));
  }
}

function getDefaultTransition(zoneIdx) {
  const transitions = ['cloud', 'zoom', 'wipe', 'cloud', 'smoke', 'door', 'page', 'screen', 'path'];
  return transitions[zoneIdx % transitions.length];
}

// ═══════════════════════════════════════
// TRANSITION EFFECTS
// ═══════════════════════════════════════
function triggerTransition(type) {
  const overlay = el('pixel-transition');
  if (!overlay) return;

  overlay.className = 'pixel-transition';
  overlay.classList.add(`transition-${type}`);
  overlay.style.display = 'block';

  // Special airplane transition
  if (type === 'airplane') {
    const plane = el('pixel-airplane');
    if (plane) {
      plane.style.display = 'block';
      plane.classList.add('flying');
      setTimeout(() => {
        plane.classList.remove('flying');
        plane.style.display = 'none';
      }, 3000);
    }
  }

  setTimeout(() => {
    overlay.style.display = 'none';
    overlay.className = 'pixel-transition';
  }, 1500);
}

// ═══════════════════════════════════════
// DIALOGUE SYSTEM
// ═══════════════════════════════════════
function showDialogue(zoneIdx) {
  if (modalOpen) return;
  const zone = ZONES[zoneIdx];
  if (!zone || !zone.accroche) return;

  // Close any lingering dialogue first
  if (dialogueOpen) closeDialogue(true);

  dialogueOpen = true;
  const box = el('pixel-dialogue');
  const nameEl = el('pixel-dialogue-name');
  const textEl = el('pixel-dialogue-text');
  const btnMore = el('pixel-dialogue-more');

  nameEl.textContent = zone.title;
  if (zone.section) {
    el('pixel-dialogue-section').textContent = zone.section;
    el('pixel-dialogue-section').style.display = '';
  } else {
    el('pixel-dialogue-section').style.display = 'none';
  }

  box.style.display = 'flex';
  setTimeout(() => box.classList.add('visible'), 50);

  // Typewriter effect
  typewriter(textEl, zone.accroche);

  // Show "more" button if there's detail
  if (zone.detail || zone.contactInfo) {
    btnMore.style.display = '';
    btnMore.onclick = () => {
      closeDialogue();
      showModal(zoneIdx);
    };
  } else {
    btnMore.style.display = 'none';
  }
}

function closeDialogue(instant) {
  dialogueOpen = false;
  const box = el('pixel-dialogue');
  box.classList.remove('visible');
  if (instant) {
    box.style.display = 'none';
  } else {
    setTimeout(() => box.style.display = 'none', 300);
  }
}

// ═══════════════════════════════════════
// MODAL SYSTEM
// ═══════════════════════════════════════
function showModal(zoneIdx) {
  const zone = ZONES[zoneIdx];
  if (!zone) return;
  modalOpen = true;

  const modal = el('pixel-modal');
  const content = el('pixel-modal-content');

  let html = '';
  
  if (zone.section) html += `<span class="pixel-modal-section">${zone.section}</span>`;
  html += `<h3 class="pixel-modal-title">${zone.title}</h3>`;
  if (zone.badge) html += `<span class="pixel-modal-badge">${zone.badge}</span>`;
  
  if (zone.detail) {
    html += `<p class="pixel-modal-desc">${zone.detail}</p>`;
  }

  if (zone.contactInfo) {
    html += `<div class="pixel-modal-contact">`;
    html += `<a href="mailto:${zone.contactInfo.email}" class="pixel-modal-link">✉ ${zone.contactInfo.email}</a>`;
    html += `<a href="${zone.contactInfo.linkedin}" target="_blank" class="pixel-modal-link">⬡ LinkedIn</a>`;
    html += `<a href="${zone.contactInfo.github}" target="_blank" class="pixel-modal-link">⌂ GitHub</a>`;
    html += `</div>`;
  }

  if (zone.tags && zone.tags.length) {
    html += `<div class="pixel-modal-tags">`;
    zone.tags.forEach(t => html += `<span class="pixel-modal-tag">${t}</span>`);
    html += `</div>`;
  }

  if (zone.links && zone.links.length) {
    html += `<div class="pixel-modal-links">`;
    zone.links.forEach(l => html += `<a href="${l.url}" target="_blank" class="pixel-modal-link">→ ${l.text}</a>`);
    html += `</div>`;
  }

  content.innerHTML = html;
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('visible'), 50);
}

function closeModal() {
  modalOpen = false;
  const modal = el('pixel-modal');
  modal.classList.remove('visible');
  setTimeout(() => modal.style.display = 'none', 300);
}

// ═══════════════════════════════════════
// INVENTORY SYSTEM
// ═══════════════════════════════════════
function buildInventory() {
  const catList = el('pixel-inv-categories');
  const itemList = el('pixel-inv-items');
  if (!catList || !itemList) return;

  const categories = Object.keys(SKILLS);
  let activeCategory = categories[0];

  function renderCategories() {
    catList.innerHTML = '';
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `pixel-inv-cat ${cat === activeCategory ? 'active' : ''}`;
      btn.textContent = cat;
      btn.onclick = () => {
        activeCategory = cat;
        renderCategories();
        renderItems(cat);
      };
      catList.appendChild(btn);
    });
  }

  function renderItems(category) {
    const skills = SKILLS[category] || [];
    itemList.innerHTML = '';
    skills.forEach(skill => {
      const item = document.createElement('div');
      item.className = 'pixel-inv-item';
      item.innerHTML = `<span class="pixel-inv-icon">${skill.icon}</span><span class="pixel-inv-name">${skill.name}</span>`;
      itemList.appendChild(item);
    });
  }

  renderCategories();
  renderItems(activeCategory);
}

function toggleInventory() {
  inventoryOpen = !inventoryOpen;
  const inv = el('pixel-inventory');
  if (inventoryOpen) {
    inv.style.display = 'flex';
    setTimeout(() => inv.classList.add('visible'), 50);
    buildInventory();
  } else {
    inv.classList.remove('visible');
    setTimeout(() => inv.style.display = 'none', 300);
  }
}

// ═══════════════════════════════════════
// INPUT HANDLING
// ═══════════════════════════════════════
function onWheel(e) {
  if (inventoryOpen || modalOpen) return;
  e.preventDefault();
  scrollTarget = clamp(scrollTarget + e.deltaY * 0.8, 0, getTotalScroll());
}

let lastTouchY = 0;
function onTouchStart(e) { lastTouchY = e.touches[0].clientY; }
function onTouchMove(e) {
  if (inventoryOpen || modalOpen) return;
  e.preventDefault();
  const d = lastTouchY - e.touches[0].clientY;
  lastTouchY = e.touches[0].clientY;
  scrollTarget = clamp(scrollTarget + d * 2, 0, getTotalScroll());
}

function onKeyDown(e) {
  if (e.key === 'Escape') {
    if (modalOpen) { closeModal(); return; }
    if (dialogueOpen) { closeDialogue(); return; }
    if (inventoryOpen) { toggleInventory(); return; }
    exitPixelWorld();
    return;
  }
  if (e.key === 'i' || e.key === 'I') { toggleInventory(); return; }
  if (inventoryOpen || modalOpen) return;
  if (e.key === 'ArrowDown' || e.key === ' ') {
    e.preventDefault();
    scrollTarget = clamp(scrollTarget + 80, 0, getTotalScroll());
  }
  if (e.key === 'ArrowUp') scrollTarget = clamp(scrollTarget - 80, 0, getTotalScroll());
}

// ═══════════════════════════════════════
// ZONE HTML BUILDER
// ═══════════════════════════════════════
function buildZoneHTML() {
  const container = el('pixel-zones-container');
  if (!container) return;

  // Skip hero (index 0) — it's handled separately
  for (let i = 1; i < ZONES.length; i++) {
    const zone = ZONES[i];
    const div = document.createElement('div');
    div.className = `pixel-zone pixel-zone-${zone.direction || 'right'}`;
    div.id = `pixel-zone-${zone.id}`;
    div.dataset.index = i;

    // Background layer — CSS gradient fallback + image
    div.innerHTML = `
      <div class="pixel-zone-bg" style="background-color: ${zone.bgColor}">
        <img src="${assetPath(zone.bg)}" alt="" class="pixel-zone-bg-img" 
             onerror="this.style.display='none'" loading="lazy">
      </div>
      <div class="pixel-zone-content">
        ${zone.section ? `<span class="pixel-zone-section-badge">${zone.section}</span>` : ''}
      </div>
    `;

    container.appendChild(div);
  }
}

// ═══════════════════════════════════════
// MOBILE FALLBACK
// ═══════════════════════════════════════
function isMobile() {
  return window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function showMobileFallback() {
  const overlay = el('pixel-world');
  if (!overlay) return;
  overlay.innerHTML = `
    <div class="pixel-mobile-fallback">
      <div class="pixel-mobile-icon">🎮</div>
      <h2>Mode Pixel Art</h2>
      <p>Cette expérience immersive est optimisée pour les écrans larges (desktop).</p>
      <p>Retrouve-moi sur un ordinateur pour explorer mon monde pixel art !</p>
      <button onclick="exitPixelWorld()" class="pixel-mobile-btn">← Retour au portfolio</button>
    </div>
  `;
  overlay.classList.remove('hidden');
}

// ═══════════════════════════════════════
// LOADING SCREEN
// ═══════════════════════════════════════
function runPixelLoading(cb) {
  const fill = el('pixel-loading-fill');
  const status = el('pixel-loading-status');
  const steps = [
    { p: 10, m: 'Préparation du monde...' },
    { p: 25, m: 'Construction de la chambre...' },
    { p: 40, m: 'Placement des biomes...' },
    { p: 55, m: 'Création du personnage...' },
    { p: 70, m: 'Chargement de l\'inventaire...' },
    { p: 85, m: 'Finalisation des transitions...' },
    { p: 100, m: 'MONDE PRÊT — BONNE EXPLORATION !' },
  ];
  let i = 0;
  const next = () => {
    if (i >= steps.length) {
      setTimeout(() => {
        const ld = el('pixel-loading');
        ld.style.opacity = '0';
        setTimeout(() => { ld.style.display = 'none'; cb(); }, 500);
      }, 400);
      return;
    }
    fill.style.width = steps[i].p + '%';
    status.textContent = steps[i].m;
    i++;
    setTimeout(next, 200 + Math.random() * 200);
  };
  next();
}

// ═══════════════════════════════════════
// PUBLIC API
// ═══════════════════════════════════════
function enterPixelWorld() {
  // Mobile check
  if (isMobile()) { showMobileFallback(); return; }

  const overlay = el('pixel-world');
  if (!overlay) return;
  overlay.classList.remove('hidden');
  document.body.classList.add('mode-pixel');
  document.body.style.overflow = 'hidden';

  // Reset state
  scrollTarget = 0;
  scrollCurrent = 0;
  lastZoneIdx = -1;
  currentZoneIdx = 0;
  inventoryOpen = false;
  modalOpen = false;
  dialogueOpen = false;

  // Show loading
  const ld = el('pixel-loading');
  ld.style.display = 'flex';
  ld.style.opacity = '1';
  el('pixel-loading-fill').style.width = '0%';

  runPixelLoading(() => {
    if (!isInitialized) {
      buildZoneHTML();
      buildHeroRoom();
      isInitialized = true;
    } else {
      // Reset hero room camera
      if (heroCamera) heroCamera.position.set(0, 6, 8);
      if (heroClock) heroClock.start();
      // Restart hero animation
      if (!heroAnimFrame && heroRenderer) {
        const animateHero = () => {
          heroAnimFrame = requestAnimationFrame(animateHero);
          const time = heroClock.getElapsedTime();
          heroCamera.position.y = 6 + Math.sin(time * 0.5) * 0.2;
          heroRenderer.render(heroScene, heroCamera);
        };
        animateHero();
      }
    }

    isActive = true;

    // Show hero dialogue bubble
    showHeroBubble();

    // Start world update loop
    updateWorld();

    // Events
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);
  });
}

function showHeroBubble() {
  const bubble = el('pixel-hero-bubble');
  if (!bubble) return;
  bubble.style.display = 'block';
  setTimeout(() => bubble.classList.add('visible'), 100);
  typewriter(el('pixel-hero-bubble-text'), ZONES[0].accroche, 25);
}

window.exitPixelWorld = function () {
  isActive = false;
  stopHeroRoom();
  const overlay = el('pixel-world');
  if (overlay) overlay.classList.add('hidden');
  document.body.classList.remove('mode-pixel');
  document.body.style.overflow = '';
  window.removeEventListener('wheel', onWheel);
  window.removeEventListener('touchstart', onTouchStart);
  window.removeEventListener('touchmove', onTouchMove);
  window.removeEventListener('keydown', onKeyDown);
};

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  el('btn-3d-mode')?.addEventListener('click', enterPixelWorld);
  el('pixel-exit-btn')?.addEventListener('click', window.exitPixelWorld);
  el('pixel-dialogue-close')?.addEventListener('click', closeDialogue);
  el('pixel-modal-close')?.addEventListener('click', closeModal);
  el('pixel-inv-btn')?.addEventListener('click', toggleInventory);
  el('pixel-inv-close')?.addEventListener('click', toggleInventory);
});
