/* CS2 Case Simulator — вся логика на клиенте, прогресс хранится в localStorage. */
(() => {
  "use strict";

  // ---------------------------------------------------------------------------
  // Константы
  // ---------------------------------------------------------------------------
  const KEY_PRICE = 2.49;
  const START_BALANCE = 50;
  const TOPUP = 50;
  const STORAGE_KEY = "cs2sim.v1";

  // Официальные шансы Valve для кейсов
  const RARITIES = [
    { id: "milspec", name: "Армейское качество", chance: 0.7992 },
    { id: "restricted", name: "Запрещённое", chance: 0.1598 },
    { id: "classified", name: "Засекреченное", chance: 0.032 },
    { id: "covert", name: "Тайное", chance: 0.0064 },
    { id: "rare", name: "★ Редкий особый предмет", chance: 0.0026 },
  ];
  const RARITY_ORDER = { milspec: 0, restricted: 1, classified: 2, covert: 3, rare: 4 };
  const RARITY_COLOR = {
    milspec: "#4b69ff", restricted: "#8847ff", classified: "#d32ce6", covert: "#eb4b4b", rare: "#e4ae39",
  };
  const RARITY_NAME = Object.fromEntries(RARITIES.map((r) => [r.id, r.name]));

  // Износ: границы и вероятность попадания в «корзину» (алгоритм генерации float в CS2)
  const WEARS = [
    { short: "FN", name: "Прямо с завода", from: 0, to: 0.07, weight: 0.03 },
    { short: "MW", name: "Немного поношенное", from: 0.07, to: 0.15, weight: 0.24 },
    { short: "FT", name: "После полевых испытаний", from: 0.15, to: 0.38, weight: 0.33 },
    { short: "WW", name: "Поношенное", from: 0.38, to: 0.45, weight: 0.24 },
    { short: "BS", name: "Закалённое в боях", from: 0.45, to: 1, weight: 0.16 },
  ];

  const PHASE_WEIGHTS = {
    "Phase 1": 0.23, "Phase 2": 0.23, "Phase 3": 0.23, "Phase 4": 0.23,
    Ruby: 0.025, Sapphire: 0.025, "Black Pearl": 0.03, Emerald: 0.04,
  };

  // Модель примерных цен
  const KNIFE_BASE = {
    Karambit: 900, "Butterfly Knife": 1300, "M9 Bayonet": 700, Bayonet: 420, "Talon Knife": 650,
    "Skeleton Knife": 600, "Flip Knife": 330, "Gut Knife": 140, "Navaja Knife": 120, "Shadow Daggers": 140,
    "Falchion Knife": 170, "Bowie Knife": 190, "Huntsman Knife": 210, "Ursus Knife": 230, "Stiletto Knife": 380,
    "Classic Knife": 330, "Nomad Knife": 280, "Paracord Knife": 190, "Survival Knife": 170, "Kukri Knife": 260,
  };
  const FINISH_MULT = {
    Doppler: 1.5, "Gamma Doppler": 1.7, Fade: 1.8, "Marble Fade": 1.65, "Tiger Tooth": 1.35, Lore: 1.55,
    Autotronic: 1.15, Slaughter: 1.3, "Crimson Web": 1.2, "Case Hardened": 1.2, "": 1.05,
    "Damascus Steel": 0.9, Ultraviolet: 0.8, "Rust Coat": 0.65, "Bright Water": 0.8, Freehand: 0.85,
    "Black Laminate": 0.85, "Blue Steel": 0.9, "Night Stripe": 0.7, Night: 0.72, Stained: 0.75,
    "Safari Mesh": 0.55, "Forest DDPAT": 0.55, "Boreal Forest": 0.56, "Urban Masked": 0.6, Scorched: 0.55,
  };
  const PHASE_MULT = { Ruby: 3.2, Sapphire: 4, "Black Pearl": 2.6, Emerald: 3.8, "Phase 2": 1.15, "Phase 4": 1.1 };
  const GLOVE_BASE = {
    "Sport Gloves": 380, "Specialist Gloves": 280, "Driver Gloves": 190, "Moto Gloves": 200, "Hand Wraps": 170,
    "Hydra Gloves": 140, "Bloodhound Gloves": 190, "Broken Fang Gloves": 170,
  };
  const POPULAR = new Set(["AK-47", "AWP", "M4A4", "M4A1-S", "Desert Eagle", "USP-S", "Glock-18"]);
  const RANGE = { milspec: [0.04, 0.5], restricted: [0.35, 3], classified: [2, 15], covert: [9, 75] };
  const WEAR_MULT = [1.9, 1.3, 1, 0.85, 0.75];
  const WEAR_MULT_RARE = [1.45, 1.15, 1, 0.9, 0.82];

  // ---------------------------------------------------------------------------
  // Утилиты
  // ---------------------------------------------------------------------------
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = (v) => "$" + (Math.round(v * 100) / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const round2 = (v) => Math.round(v * 100) / 100;

  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0) / 4294967296;
  }
  const logLerp = (a, b, t) => Math.exp(Math.log(a) + (Math.log(b) - Math.log(a)) * t);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  let calibrateAll = () => {};

  function img(i, size = "256fx192f") {
    if (!i) return "";
    if (i.startsWith("http")) return i;
    return window.IMG_PREFIX + i + "/" + size;
  }

  // ---------------------------------------------------------------------------
  // Данные кейсов
  // ---------------------------------------------------------------------------
  const CASES = window.CASES || [];
  const CASE_BY_ID = Object.fromEntries(CASES.map((c) => [c.id, c]));
  CASES.forEach((c) => {
    c.byRarity = {};
    c.items.forEach((it) => (c.byRarity[it.r] = c.byRarity[it.r] || []).push(it));
    // Редкие предметы группируем по «оружие | покраска», фазы Doppler — вариации одного скина
    const groups = new Map();
    c.rare.forEach((it) => {
      const k = it.w + "|" + it.f;
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(it);
    });
    c.rareGroups = Array.from(groups.values());
    c.cost = round2(c.price + KEY_PRICE);
  });
  calibrateAll = () => CASES.forEach(calibrate);

  // ---------------------------------------------------------------------------
  // Состояние
  // ---------------------------------------------------------------------------
  const defaultState = () => ({
    balance: START_BALANCE,
    inventory: [],
    stats: { opened: 0, spent: 0, sold: 0, topups: 0, counts: {}, best: [] },
    settings: { sound: true, fast: false, qty: 1 },
    uid: 1,
  });
  let state;
  try {
    state = Object.assign(defaultState(), JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"));
    state.stats = Object.assign(defaultState().stats, state.stats);
    state.settings = Object.assign(defaultState().settings, state.settings);
  } catch (e) {
    state = defaultState();
  }
  const save = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* quota */ } };

  // ---------------------------------------------------------------------------
  // Генерация дропа
  // ---------------------------------------------------------------------------
  function rollRarity(c) {
    const avail = RARITIES.filter((r) => (r.id === "rare" ? c.rareGroups.length : (c.byRarity[r.id] || []).length));
    const total = avail.reduce((s, r) => s + r.chance, 0);
    let x = Math.random() * total;
    for (const r of avail) { if ((x -= r.chance) < 0) return r.id; }
    return avail[0].id;
  }

  function rollFloat(def) {
    let x = Math.random(), bucket = WEARS[WEARS.length - 1];
    for (const w of WEARS) { if ((x -= w.weight) < 0) { bucket = w; break; } }
    const raw = bucket.from + Math.random() * (bucket.to - bucket.from);
    return def.mn + raw * (def.mx - def.mn);
  }
  const wearIndex = (f) => WEARS.findIndex((w) => f < w.to) === -1 ? 4 : WEARS.findIndex((w) => f < w.to);

  function basePrice(def, c) {
    const key = def.w + "|" + def.f;
    const u = hash(key);
    if (def.r === "rare") {
      if (def.g) return (GLOVE_BASE[def.w] || 180) * logLerp(0.45, 3.2, u);
      const kb = KNIFE_BASE[def.w] || 250;
      const fm = FINISH_MULT[def.f] ?? 1;
      return kb * fm * (0.85 + u * 0.35) * (PHASE_MULT[def.ph] || 1);
    }
    return rawSkinPrice(def) * c.skinFactor;
  }

  function rawSkinPrice(def) {
    const [a, b] = RANGE[def.r];
    return logLerp(a, b, hash(def.w + "|" + def.f)) * (POPULAR.has(def.w) ? 1.8 : 1);
  }

  // Подгоняем цены обычных скинов так, чтобы средний возврат кейса был реалистичным
  // (45–70% от стоимости открытия). Ножи/перчатки не масштабируются.
  function calibrate(c) {
    c.skinFactor = 1;
    const avgWear = WEARS.reduce((s, w, i) => s + w.weight * WEAR_MULT[i], 0);
    const rareEv = RARITIES[4].chance * c.rareGroups.reduce((s, g) => s + g.reduce((a, it) => a + basePrice(it, c), 0) / g.length, 0) / Math.max(1, c.rareGroups.length);
    let unit = 0;
    RARITIES.slice(0, 4).forEach((r) => {
      const list = c.byRarity[r.id] || [];
      if (list.length) unit += r.chance * list.reduce((s, it) => s + rawSkinPrice(it), 0) / list.length;
    });
    unit *= avgWear * 1.08;
    const target = (0.45 + 0.25 * hash(c.name)) * c.cost;
    c.skinFactor = Math.max(0.6, (target - rareEv) / unit);
  }

  function priceOf(def, c, wear, st) {
    let p = basePrice(def, c);
    if (wear >= 0) p *= (def.r === "rare" ? WEAR_MULT_RARE : WEAR_MULT)[wear];
    if (st) p *= def.r === "rare" ? 1.25 : 1.8;
    return Math.max(0.03, round2(p));
  }

  function rollItem(c) {
    const r = rollRarity(c);
    let def;
    if (r === "rare") {
      const g = pick(c.rareGroups);
      if (g.length > 1 && g[0].ph) {
        const tot = g.reduce((s, it) => s + (PHASE_WEIGHTS[it.ph] || 0.1), 0);
        let x = Math.random() * tot;
        def = g.find((it) => (x -= PHASE_WEIGHTS[it.ph] || 0.1) < 0) || g[0];
      } else def = pick(g);
    } else {
      def = pick(c.byRarity[r]);
    }
    const st = !def.nst && !def.g && Math.random() < 0.1;
    let fl = null, wear = -1;
    if (!def.nf) { fl = rollFloat(def); wear = wearIndex(fl); }
    return {
      uid: state.uid++,
      c: c.id,
      w: def.w, f: def.f, r: def.r, i: def.i, ph: def.ph || null,
      k: def.k ? 1 : 0, g: def.g ? 1 : 0,
      st, fl, wear,
      seed: Math.floor(Math.random() * 1001),
      price: priceOf(def, c, wear, st),
      t: Date.now(),
    };
  }

  // Предмет-заглушка для ленты (без записи в состояние)
  function fillerItem(c) {
    const r = rollRarity(c);
    if (r === "rare") return { r: "rare" };
    return pick(c.byRarity[r]);
  }

  // ---------------------------------------------------------------------------
  // Звук (WebAudio, без файлов)
  // ---------------------------------------------------------------------------
  let actx = null;
  function audio() {
    if (!state.settings.sound) return null;
    if (!actx) { try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } }
    if (actx.state === "suspended") actx.resume();
    return actx;
  }
  function tone(freq, dur, type = "sine", vol = 0.15, delay = 0) {
    const a = audio(); if (!a) return;
    const t0 = a.currentTime + delay;
    const o = a.createOscillator(), g = a.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(a.destination);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }
  let lastTick = 0;
  function tick() {
    const now = performance.now();
    if (now - lastTick < 28) return;
    lastTick = now;
    tone(1500 + Math.random() * 200, 0.035, "square", 0.05);
  }
  function revealSound(r) {
    const chords = {
      milspec: [523, 659], restricted: [523, 659, 784], classified: [587, 740, 880],
      covert: [659, 831, 988, 1319], rare: [523, 659, 784, 1047, 1319, 1568],
    }[r];
    chords.forEach((f, i) => tone(f, r === "rare" ? 1.4 : 0.6, "triangle", 0.12, i * (r === "rare" ? 0.09 : 0.05)));
  }

  // ---------------------------------------------------------------------------
  // Рендер общих элементов
  // ---------------------------------------------------------------------------
  let prevBalance = state.balance;
  function renderWallet() {
    const el = $("#balance");
    el.textContent = money(state.balance);
    if (state.balance !== prevBalance) {
      el.classList.remove("flash-up", "flash-down");
      void el.offsetWidth;
      el.classList.add(state.balance > prevBalance ? "flash-up" : "flash-down");
      prevBalance = state.balance;
    }
    $("#invCount").textContent = state.inventory.length;
    $("#soundBtn").textContent = state.settings.sound ? "🔊" : "🔇";
    updateOpenBtn();
  }

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  const fullName = (it) => (it.k || it.g ? "★ " : "") + (it.st ? "StatTrak™ " : "") + it.w + (it.f ? " | " + it.f : "");

  function itemCard(it, opts = {}) {
    const color = RARITY_COLOR[it.r];
    const wear = it.wear >= 0 ? WEARS[it.wear] : null;
    const el = document.createElement("div");
    el.className = "icard" + (opts.clickable ? " clickable" : "");
    el.style.setProperty("--rc", color);
    el.innerHTML = `
      ${opts.chance ? `<span class="chance">${opts.chance}</span>` : ""}
      <img loading="lazy" src="${esc(img(it.i))}" alt="">
      <div class="iw">${it.st ? '<span class="st">StatTrak™ </span>' : ""}${esc((it.k || it.g ? "★ " : "") + it.w)}</div>
      <div class="if" title="${esc(fullName(it))}">${esc(it.f || "Vanilla")}${it.ph ? " · " + esc(it.ph) : ""}</div>
      ${wear ? `<div class="ix">${wear.short} · ${it.fl.toFixed(4)}</div><div class="float-bar"><i style="left:${(it.fl * 100).toFixed(2)}%"></i></div>` : opts.range || ""}
      ${it.price != null ? `<div class="ip">${money(it.price)}</div>` : ""}
    `;
    if (opts.sell) {
      const b = document.createElement("button");
      b.className = "btn btn-green sell";
      b.textContent = "Продать";
      b.onclick = (e) => { e.stopPropagation(); sellItems([it.uid]); };
      el.appendChild(b);
    }
    return el;
  }

  // ---------------------------------------------------------------------------
  // Навигация
  // ---------------------------------------------------------------------------
  let currentCase = null;
  let spinning = false;

  function show(view) {
    $$(".view").forEach((v) => v.classList.add("hidden"));
    $("#view-" + view).classList.remove("hidden");
    $$(".tab").forEach((t) => t.classList.toggle("active", t.dataset.nav === view || (view === "case" && t.dataset.nav === "cases")));
    if (view === "inventory") renderInventory();
    if (view === "stats") renderStats();
    window.scrollTo({ top: 0 });
  }

  document.addEventListener("click", (e) => {
    const n = e.target.closest("[data-nav]");
    if (!n) return;
    if (spinning) { toast("Дождитесь окончания прокрутки"); return; }
    const view = n.dataset.nav;
    location.hash = view === "cases" ? "" : view;
    show(view);
  });

  // ---------------------------------------------------------------------------
  // Список кейсов
  // ---------------------------------------------------------------------------
  function renderCases() {
    const q = $("#caseSearch").value.trim().toLowerCase();
    const grid = $("#caseGrid");
    grid.innerHTML = "";
    const newest = CASES[0] && CASES[0].id;
    CASES.filter((c) => !q || c.name.toLowerCase().includes(q) ||
      c.items.some((it) => (it.w + " " + it.f).toLowerCase().includes(q)) ||
      c.rare.some((it) => (it.w + " " + it.f).toLowerCase().includes(q)))
      .forEach((c) => {
        const el = document.createElement("div");
        el.className = "case-card";
        const rareLabel = c.rare.some((r) => r.g) ? "★ Перчатки" : "★ Нож";
        el.innerHTML = `
          ${c.id === newest ? '<span class="new">NEW</span>' : ""}
          <img loading="lazy" src="${esc(img(c.img, "360fx270f"))}" alt="">
          <div class="name">${esc(c.name)}</div>
          <div class="price">${money(c.cost)}</div>
          <div class="rare-hint">${rareLabel} · ${c.date.slice(0, 4)}</div>`;
        el.onclick = () => openCasePage(c.id);
        grid.appendChild(el);
      });
    if (!grid.children.length) grid.innerHTML = '<div class="empty">Ничего не найдено</div>';
  }
  $("#caseSearch").addEventListener("input", renderCases);

  // ---------------------------------------------------------------------------
  // Страница кейса
  // ---------------------------------------------------------------------------
  function openCasePage(id) {
    const c = CASE_BY_ID[id];
    if (!c) return;
    currentCase = c;
    location.hash = "case/" + id;
    $("#caseName").textContent = c.name;
    $("#caseMeta").textContent = `Вышел: ${c.date} · кейс ${money(c.price)} + ключ ${money(KEY_PRICE)}`;
    $("#caseImg").src = img(c.img, "128fx96f");
    $("#caseImgBig").src = img(c.img, "360fx270f");
    $("#strips").innerHTML = "";
    $("#rouletteIdle").classList.remove("hidden");

    // Шансы
    const odds = $("#odds");
    odds.innerHTML = "";
    RARITIES.forEach((r) => {
      const n = r.id === "rare" ? c.rareGroups.length : (c.byRarity[r.id] || []).length;
      if (!n) return;
      const d = document.createElement("div");
      d.className = "odd";
      d.style.setProperty("--rc", RARITY_COLOR[r.id]);
      d.innerHTML = `<i></i>${r.name}: <b>${(r.chance * 100).toFixed(2)}%</b>`;
      odds.appendChild(d);
    });

    // Содержимое
    const grid = $("#caseContents");
    grid.innerHTML = "";
    const items = c.items.slice().sort((a, b) => RARITY_ORDER[b.r] - RARITY_ORDER[a.r]);
    items.forEach((it) => {
      const r = RARITIES.find((x) => x.id === it.r);
      const ch = (r.chance / c.byRarity[it.r].length) * 100;
      const range = `<div class="ix">Float ${it.mn.toFixed(2)}–${it.mx.toFixed(2)}</div>`;
      grid.appendChild(itemCard(it, { chance: ch.toFixed(ch < 1 ? 3 : 2) + "%", range }));
    });
    // Карточка редкого предмета
    const rc = document.createElement("div");
    rc.className = "icard rare-card clickable";
    rc.style.setProperty("--rc", RARITY_COLOR.rare);
    rc.innerHTML = `<span class="chance">0.26%</span><div class="star">★</div>
      <div class="if">${esc(c.rareName.replace(/★/g, "").trim() || "Rare Special Item")}</div>
      <div class="ix">${c.rareGroups.length} вариантов · нажмите, чтобы посмотреть</div>`;
    rc.onclick = () => showRareList(c);
    grid.prepend(rc);

    show("case");
    updateOpenBtn();
  }

  function showRareList(c) {
    $("#rareTitle").textContent = c.rareName.replace(/★/g, "").trim() + " — " + c.name;
    const list = $("#rareList");
    list.innerHTML = "";
    const each = 0.26 / c.rareGroups.length;
    c.rareGroups.forEach((g) => {
      const it = g[0];
      const label = g.length > 1 && it.ph ? { ...it, ph: g.length + " фаз" } : it;
      list.appendChild(itemCard(label, { chance: each.toFixed(4) + "%" }));
    });
    $("#rareModal").classList.remove("hidden");
  }

  function updateOpenBtn() {
    const btn = $("#openBtn");
    if (!currentCase) return;
    const total = round2(currentCase.cost * state.settings.qty);
    btn.textContent = `Открыть ${state.settings.qty > 1 ? state.settings.qty + " шт. " : ""}за ${money(total)}`;
    btn.disabled = spinning;
    $$("#qty button").forEach((b) => b.classList.toggle("active", +b.dataset.q === state.settings.qty));
    $("#fastMode").checked = state.settings.fast;
  }

  $("#qty").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-q]");
    if (!b || spinning) return;
    state.settings.qty = +b.dataset.q;
    save();
    updateOpenBtn();
  });
  $("#fastMode").addEventListener("change", (e) => { state.settings.fast = e.target.checked; save(); });

  // ---------------------------------------------------------------------------
  // Рулетка
  // ---------------------------------------------------------------------------
  const STRIP_LEN = 64;
  const WIN_INDEX = 56;

  function rouletteCard(it) {
    const el = document.createElement("div");
    el.className = "rcard";
    if (it.r === "rare") {
      el.classList.add("rare-slot");
      el.style.setProperty("--rc", RARITY_COLOR.rare);
      el.innerHTML = '<div class="star">★</div>';
      return el;
    }
    el.style.setProperty("--rc", RARITY_COLOR[it.r]);
    el.innerHTML = `<img src="${esc(img(it.i, "192fx144f"))}" alt=""><div class="rname">${esc(it.w)} | ${esc(it.f)}</div>`;
    return el;
  }

  const easeOut = (t) => 1 - Math.pow(1 - t, 4.2);

  function spinStrip(viewport, strip, winEl, duration, onTickEnabled) {
    return new Promise((resolve) => {
      const cards = strip.children;
      const cardW = cards[0].offsetWidth;
      const step = cards[1].offsetLeft - cards[0].offsetLeft;
      const center = viewport.clientWidth / 2;
      const target = WIN_INDEX * step + cardW * (0.08 + Math.random() * 0.84) - center;
      const startX = -center + cardW / 2 + step * 2 * Math.random();
      let lastIdx = -1;
      const t0 = performance.now();
      function frame(now) {
        const t = Math.min(1, (now - t0) / duration);
        const x = startX + (target - startX) * easeOut(t);
        strip.style.transform = `translate3d(${-x}px,0,0)`;
        const idx = Math.floor((x + center) / step);
        if (idx !== lastIdx) { if (lastIdx !== -1 && onTickEnabled) tick(); lastIdx = idx; }
        if (t < 1) requestAnimationFrame(frame);
        else { winEl.classList.add("winner"); resolve(); }
      }
      requestAnimationFrame(frame);
    });
  }

  async function openCases() {
    const c = currentCase;
    if (!c || spinning) return;
    const qty = state.settings.qty;
    const total = round2(c.cost * qty);
    if (state.balance + 1e-9 < total) {
      toast("Недостаточно средств — нажмите «+ $50»");
      $("#topupBtn").animate([{ transform: "scale(1)" }, { transform: "scale(1.2)" }, { transform: "scale(1)" }], { duration: 400 });
      return;
    }
    audio(); // разблокировать AudioContext жестом пользователя

    state.balance = round2(state.balance - total);
    state.stats.spent = round2(state.stats.spent + total);
    const drops = Array.from({ length: qty }, () => rollItem(c));

    spinning = true;
    renderWallet();
    $("#rouletteIdle").classList.add("hidden");
    const stripsEl = $("#strips");
    stripsEl.innerHTML = "";
    stripsEl.classList.toggle("compact", qty > 2);

    const promises = drops.map((drop, n) => {
      const vp = document.createElement("div");
      vp.className = "strip-viewport";
      const strip = document.createElement("div");
      strip.className = "strip";
      let winEl;
      for (let i = 0; i < STRIP_LEN; i++) {
        const it = i === WIN_INDEX ? drop : fillerItem(c);
        const el = rouletteCard(it);
        if (i === WIN_INDEX) winEl = el;
        strip.appendChild(el);
      }
      vp.appendChild(strip);
      stripsEl.appendChild(vp);
      const base = state.settings.fast ? 1400 : 6500;
      return { vp, strip, winEl, duration: base + n * (state.settings.fast ? 120 : 350) + Math.random() * 300 };
    }).map((s, n) => spinStrip(s.vp, s.strip, s.winEl, s.duration, n === 0));

    await Promise.all(promises);

    drops.forEach((d) => {
      state.inventory.unshift(d);
      state.stats.opened++;
      state.stats.counts[d.r] = (state.stats.counts[d.r] || 0) + 1;
      state.stats.best.push(d);
    });
    state.stats.best.sort((a, b) => b.price - a.price);
    state.stats.best = state.stats.best.slice(0, 12);
    save();

    const top = drops.reduce((a, b) => (RARITY_ORDER[b.r] > RARITY_ORDER[a.r] ? b : a));
    revealSound(top.r);
    await new Promise((r) => setTimeout(r, state.settings.fast ? 250 : 600));
    spinning = false;
    renderWallet();
    showResult(drops);
  }
  $("#openBtn").addEventListener("click", openCases);

  // ---------------------------------------------------------------------------
  // Результат
  // ---------------------------------------------------------------------------
  let lastDrops = [];
  function showResult(drops) {
    lastDrops = drops;
    const list = $("#resultList");
    list.innerHTML = "";
    const single = drops.length === 1;
    const hasRare = drops.some((d) => d.r === "rare");
    $("#resultTitle").textContent = hasRare ? "★ НЕВЕРОЯТНО! Редкий предмет! ★" : single ? "Вы получили" : `Вы получили ${drops.length} предметов`;
    drops.forEach((d, i) => {
      const wear = d.wear >= 0 ? WEARS[d.wear] : null;
      const el = document.createElement("div");
      el.className = "result" + (single ? " single" : "") + (d.r === "rare" ? " rare-drop" : "");
      el.style.setProperty("--rc", RARITY_COLOR[d.r]);
      el.style.animationDelay = i * 80 + "ms";
      el.dataset.uid = d.uid;
      el.innerHTML = `
        <span class="tag">${esc(RARITY_NAME[d.r])}</span>
        <img src="${esc(img(d.i, "360fx270f"))}" alt="">
        <div class="rw">${d.st ? '<span style="color:#cf6a32">StatTrak™</span> ' : ""}${esc((d.k || d.g ? "★ " : "") + d.w)}</div>
        <div class="rf">${esc(d.f || "Vanilla")}${d.ph ? " · " + esc(d.ph) : ""}</div>
        <div class="rx">${wear ? `${esc(wear.name)}<br>Float: ${d.fl.toFixed(8)} · Паттерн: ${d.seed}` : `Без износа · Паттерн: ${d.seed}`}</div>
        ${wear ? `<div class="float-bar"><i style="left:${(d.fl * 100).toFixed(2)}%"></i></div>` : ""}
        <div class="rp">${money(d.price)}</div>
        <button class="btn btn-green">Продать</button>`;
      el.querySelector("button").onclick = () => {
        if (sellItems([d.uid], true)) { el.classList.add("sold"); el.querySelector("button").disabled = true; el.querySelector("button").textContent = "Продано"; }
      };
      list.appendChild(el);
    });
    $("#resultModal").classList.remove("hidden");
  }

  function closeResult() { $("#resultModal").classList.add("hidden"); }
  $("#resultKeep").onclick = closeResult;
  $("#resultSellAll").onclick = () => {
    sellItems(lastDrops.map((d) => d.uid), true);
    closeResult();
  };
  $("#resultAgain").onclick = () => { closeResult(); openCases(); };
  $$(".modal").forEach((m) => m.addEventListener("click", (e) => {
    if (e.target === m || e.target.closest("[data-close]")) m.classList.add("hidden");
  }));

  // ---------------------------------------------------------------------------
  // Продажа
  // ---------------------------------------------------------------------------
  function sellItems(uids, quiet) {
    const set = new Set(uids);
    let sum = 0, n = 0;
    state.inventory = state.inventory.filter((it) => {
      if (set.has(it.uid)) { sum += it.price; n++; return false; }
      return true;
    });
    if (!n) return false;
    sum = round2(sum);
    state.balance = round2(state.balance + sum);
    state.stats.sold = round2(state.stats.sold + sum);
    save();
    renderWallet();
    if (!$("#view-inventory").classList.contains("hidden")) renderInventory();
    tone(880, 0.12, "sine", 0.1); tone(1320, 0.18, "sine", 0.08, 0.06);
    if (!quiet || n > 1) toast(`Продано ${n} шт. за ${money(sum)}`);
    return true;
  }

  // ---------------------------------------------------------------------------
  // Инвентарь
  // ---------------------------------------------------------------------------
  function renderInventory() {
    const sort = $("#invSort").value, filter = $("#invFilter").value;
    let items = state.inventory.slice();
    if (filter !== "all") items = items.filter((it) => it.r === filter);
    if (sort === "price") items.sort((a, b) => b.price - a.price);
    else if (sort === "rarity") items.sort((a, b) => RARITY_ORDER[b.r] - RARITY_ORDER[a.r] || b.price - a.price);
    const grid = $("#invGrid");
    grid.innerHTML = "";
    const frag = document.createDocumentFragment();
    items.slice(0, 600).forEach((it) => frag.appendChild(itemCard(it, { sell: true })));
    grid.appendChild(frag);
    $("#invEmpty").classList.toggle("hidden", state.inventory.length > 0);
    const value = state.inventory.reduce((s, it) => s + it.price, 0);
    $("#invValue").textContent = `${state.inventory.length} предм. · ${money(value)}`;
  }
  $("#invSort").addEventListener("change", renderInventory);
  $("#invFilter").addEventListener("change", renderInventory);
  $("#sellAllBtn").onclick = () => {
    if (!state.inventory.length) return;
    const value = state.inventory.reduce((s, it) => s + it.price, 0);
    if (confirm(`Продать все ${state.inventory.length} предметов за ${money(value)}?`)) sellItems(state.inventory.map((i) => i.uid));
  };
  $("#sellCheapBtn").onclick = () => {
    const cheap = state.inventory.filter((i) => i.price < 1).map((i) => i.uid);
    if (!cheap.length) return toast("Нет предметов дешевле $1");
    sellItems(cheap);
  };

  // ---------------------------------------------------------------------------
  // Статистика
  // ---------------------------------------------------------------------------
  function renderStats() {
    const s = state.stats;
    const invValue = state.inventory.reduce((a, it) => a + it.price, 0);
    const profit = s.sold + invValue - s.spent;
    const cards = [
      ["Открыто кейсов", s.opened.toLocaleString("ru-RU")],
      ["Потрачено", money(s.spent)],
      ["Выручено с продаж", money(s.sold)],
      ["Стоимость инвентаря", money(invValue)],
      ["Итог (прибыль/убыток)", `<span class="${profit >= 0 ? "pos" : "neg"}">${profit >= 0 ? "+" : "−"}${money(Math.abs(profit))}</span>`],
      ["Окупаемость", s.spent ? `${(((s.sold + invValue) / s.spent) * 100).toFixed(1)}%` : "—"],
      ["Пополнено бесплатно", money(s.topups * TOPUP)],
      ["Ножей / перчаток", (s.counts.rare || 0).toString()],
    ];
    $("#statCards").innerHTML = cards.map(([l, v]) => `<div class="stat"><div class="sl">${l}</div><div class="sv">${v}</div></div>`).join("");

    const dist = $("#dist");
    dist.innerHTML = "";
    const max = Math.max(1, ...RARITIES.map((r) => s.counts[r.id] || 0));
    RARITIES.forEach((r) => {
      const n = s.counts[r.id] || 0;
      const pct = s.opened ? (n / s.opened) * 100 : 0;
      const row = document.createElement("div");
      row.className = "dist-row";
      row.style.setProperty("--rc", RARITY_COLOR[r.id]);
      row.innerHTML = `<span style="color:${RARITY_COLOR[r.id]}">${r.name}</span>
        <div class="dist-bar"><i style="width:${(n / max) * 100}%"></i></div>
        <span class="muted">${n} · ${pct.toFixed(2)}% (ожид. ${(r.chance * 100).toFixed(2)}%)</span>`;
      dist.appendChild(row);
    });

    const best = $("#bestDrops");
    best.innerHTML = "";
    if (!s.best.length) best.innerHTML = '<div class="empty">Пока пусто</div>';
    s.best.forEach((it) => best.appendChild(itemCard(it)));
  }
  $("#resetBtn").onclick = () => {
    if (!confirm("Сбросить баланс, инвентарь и статистику?")) return;
    const settings = state.settings;
    state = defaultState();
    state.settings = settings;
    prevBalance = state.balance;
    save();
    renderWallet();
    renderStats();
    toast("Прогресс сброшен");
  };

  // ---------------------------------------------------------------------------
  // Прочее
  // ---------------------------------------------------------------------------
  $("#topupBtn").onclick = () => {
    state.balance = round2(state.balance + TOPUP);
    state.stats.topups++;
    save();
    renderWallet();
    tone(660, 0.1, "sine", 0.1); tone(990, 0.15, "sine", 0.1, 0.07);
  };
  $("#soundBtn").onclick = () => { state.settings.sound = !state.settings.sound; save(); renderWallet(); };

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") $$(".modal").forEach((m) => m.classList.add("hidden"));
    if (e.code !== "Space" || e.target.matches("input, select, textarea")) return;
    if ($("#view-case").classList.contains("hidden")) return;
    e.preventDefault();
    if (!$("#resultModal").classList.contains("hidden")) closeResult();
    openCases();
  });

  function route() {
    const h = location.hash.replace(/^#/, "");
    if (h.startsWith("case/") && CASE_BY_ID[h.slice(5)]) openCasePage(h.slice(5));
    else if (h === "inventory" || h === "stats") show(h);
    else show("cases");
  }

  calibrateAll();
  renderCases();
  renderWallet();
  route();
})();
