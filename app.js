
const P = [
  {
    id: 1,
    n: "Wireless Headphone",
    c: "Gadget",
    p: 3490,
    o: 4990,
    e: "🎧",
    g: ["#7c3aed", "#06b6d4"],
    d: "Noise-cancelling, 30 ghonta battery.",
  },
  {
    id: 2,
    n: "Smart Watch Pro",
    c: "Gadget",
    p: 5200,
    o: 6500,
    e: "⌚",
    g: ["#06b6d4", "#16a34a"],
    d: "Heart rate, GPS ar water resistant.",
  },
  {
    id: 3,
    n: "Running Sneaker",
    c: "Fashion",
    p: 2890,
    o: 3600,
    e: "👟",
    g: ["#f43f5e", "#f59e0b"],
    d: "Halka, ariam-dayak daurer jute.",
  },
  {
    id: 4,
    n: "Leather Backpack",
    c: "Fashion",
    p: 2450,
    o: 2450,
    e: "🎒",
    g: ["#2563eb", "#06b6d4"],
    d: "Laptop pocket-shoho mojbut bag.",
  },
  {
    id: 5,
    n: "Ceramic Mug Set",
    c: "Home",
    p: 790,
    o: 990,
    e: "☕",
    g: ["#f97316", "#f43f5e"],
    d: "Ek set-e 4 ti rongin mug.",
  },
  {
    id: 6,
    n: "Desk Lamp LED",
    c: "Home",
    p: 1350,
    o: 1800,
    e: "💡",
    g: ["#f59e0b", "#84cc16"],
    d: "3 rokom alo, touch control.",
  },
  {
    id: 7,
    n: "Bluetooth Speaker",
    c: "Gadget",
    p: 2150,
    o: 2990,
    e: "🔊",
    g: ["#7c3aed", "#db2777"],
    d: "Deep bass, 12 ghonta chole.",
  },
  {
    id: 8,
    n: "Sunglasses UV400",
    c: "Fashion",
    p: 950,
    o: 1400,
    e: "🕶️",
    g: ["#db2777", "#f59e0b"],
    d: "UV400 protection, stylish frame.",
  },
];
const CK = {
  All: "#7c3aed",
  Gadget: "#0891b2",
  Fashion: "#e11d48",
  Home: "#d97706",
};
const $ = (s) => document.querySelector(s),
  tk = (n) => "৳" + n.toLocaleString("en-IN");
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const st = {
  get(k, d) {
    try {
      const v = localStorage.getItem("yb_" + k);
      return v ? JSON.parse(v) : d;
    } catch (e) {
      return d;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem("yb_" + k, JSON.stringify(v));
    } catch (e) {}
  },
};
async function hash(s) {
  try {
    const b = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode("yb:" + s),
    );
    return [...new Uint8Array(b)]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");
  } catch (e) {
    return btoa(s);
  }
}
let users = st.get("users", {}),
  me = st.get("me", null),
  orders = st.get("orders", []),
  cart = {},
  cat = "All",
  disc = 0,
  term = "",
  after = null,
  curP = 0,
  rate = 0;
let reviews = st.get("reviews", {
  1: [
    {
      u: "seed",
      n: "Rahim",
      r: 5,
      t: "Sound khub bhalo, battery-o dirghosthayi.",
      d: "2026-09-02",
    },
  ],
  3: [
    {
      u: "seed",
      n: "Nusrat",
      r: 4,
      t: "Aramdayak, size thik chilo.",
      d: "2026-09-10",
    },
  ],
  5: [
    {
      u: "seed",
      n: "Tania",
      r: 5,
      t: "Rong ar quality dutoi sundor!",
      d: "2026-09-21",
    },
  ],
});
const avg = (id) => {
  const l = reviews[id] || [];
  return l.length ? l.reduce((a, b) => a + b.r, 0) / l.length : 0;
};
const stars = (n) => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));
let tt;
function toast(m) {
  const t = $("#toast");
  t.textContent = m;
  t.classList.add("on");
  clearTimeout(tt);
  tt = setTimeout(() => t.classList.remove("on"), 2000);
}
function closeAll() {
  $("#drawer").classList.remove("open");
  document.querySelectorAll(".modal").forEach((m) => m.classList.remove("on"));
  $("#shade").classList.remove("on");
}
function show(id) {
  closeAll();
  const e = $("#" + id);
  e.classList.add(id == "drawer" ? "open" : "on");
  $("#shade").classList.add("on");
}
$("#shade").onclick = closeAll;
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-x]")) closeAll();
});
addEventListener("keydown", (e) => {
  if (e.key == "Escape") closeAll();
});

/* theme */
const root = document.documentElement;
root.dataset.theme = st.get(
  "theme",
  matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light",
);
$("#theme").onclick = () => {
  const t = root.dataset.theme == "dark" ? "light" : "dark";
  root.dataset.theme = t;
  st.set("theme", t);
};

/* shop */
function render() {
  let l = P.filter(
    (x) => (cat == "All" || x.c == cat) && x.n.toLowerCase().includes(term),
  );
  const s = $("#sort").value;
  if (s == "lo") l.sort((a, b) => a.p - b.p);
  if (s == "hi") l.sort((a, b) => b.p - a.p);
  if (s == "off") l.sort((a, b) => (b.o - b.p) / b.o - (a.o - a.p) / a.o);
  if (s == "rt") l.sort((a, b) => avg(b.id) - avg(a.id));
  $("#grid").innerHTML =
    l
      .map((x) => {
        const d = Math.round(((x.o - x.p) / x.o) * 100),
          a = avg(x.id),
          n = (reviews[x.id] || []).length;
        return `<article class="card" style="--c1:${x.g[0]};--c2:${x.g[1]}"><button class="pic" data-v="${x.id}" aria-label="${x.n} details">${x.e}</button><h3 data-v="${x.id}">${x.n}</h3><div class="meta">${x.c} · <span class="star">${a ? stars(a) : "☆☆☆☆☆"}</span> (${n})</div><div class="price">${tk(x.p)} ${d ? `<s>${tk(x.o)}</s><span class="off">-${d}%</span>` : ""}</div><button class="btn" data-id="${x.id}">Cart-e rakhun</button></article>`;
      })
      .join("") ||
    '<p class="meta">Kono product pawa jayni. Onno naam diye khujun.</p>';
}
$("#chips").innerHTML = Object.keys(CK)
  .map(
    (c) =>
      `<button class="chip" style="--k:${CK[c]}" aria-pressed="${c == "All"}" data-c="${c}">${c}</button>`,
  )
  .join("");
$("#chips").onclick = (e) => {
  const c = e.target.dataset.c;
  if (!c) return;
  cat = c;
  document
    .querySelectorAll(".chip")
    .forEach((b) => b.setAttribute("aria-pressed", b.dataset.c == c));
  render();
};
$("#sort").onchange = render;
$("#q").oninput = (e) => {
  term = e.target.value.toLowerCase();
  render();
};
$("#grid").onclick = (e) => {
  const id = e.target.dataset.id,
    v = e.target.closest("[data-v]");
  if (id) {
    add(id);
  } else if (v) openP(+v.dataset.v);
};
$("#grid").onmousemove = (e) => {
  const c = e.target.closest(".card");
  if (!c) return;
  const r = c.getBoundingClientRect();
  c.style.setProperty(
    "--ry",
    ((e.clientX - r.left) / r.width - 0.5) * 12 + "deg",
  );
  c.style.setProperty(
    "--rx",
    (0.5 - (e.clientY - r.top) / r.height) * 12 + "deg",
  );
};
$("#grid").onmouseout = (e) => {
  const c = e.target.closest(".card");
  if (c) {
    c.style.setProperty("--rx", "0deg");
    c.style.setProperty("--ry", "0deg");
  }
};
function add(id) {
  cart[id] = (cart[id] || 0) + 1;
  upd();
  toast("Cart-e jog hoyeche");
}

/* cart */
function totals() {
  let sub = 0,
    n = 0;
  for (const id in cart) {
    sub += P.find((x) => x.id == id).p * cart[id];
    n += cart[id];
  }
  const d = Math.round(sub * disc),
    ship = !sub || sub >= 3000 ? 0 : 60;
  return { sub, n, d, ship, tot: sub - d + ship };
}
function upd() {
  const t = totals();
  $("#cc").textContent = t.n;
  $("#items").innerHTML =
    Object.keys(cart)
      .map((id) => {
        const x = P.find((p) => p.id == id);
        return `<div class="row"><span class="t">${x.e}</span><span class="n">${x.n}<br><span class="meta">${tk(x.p)}</span></span><span class="q"><button data-m="${id}" aria-label="Kom">−</button> ${cart[id]} <button data-a="${id}" aria-label="Beshi">+</button></span></div>`;
      })
      .join("") || '<p class="meta">Cart khali. Product jog korun.</p>';
  $("#sum").innerHTML =
    `<div><span>Subtotal</span><span>${tk(t.sub)}</span></div><div><span>Discount</span><span>−${tk(t.d)}</span></div><div><span>Delivery</span><span>${t.ship ? tk(t.ship) : "Free"}</span></div><div style="font-weight:800;font-size:1.15rem"><span>Total</span><span>${tk(t.tot)}</span></div>`;
}
$("#items").onclick = (e) => {
  const m = e.target.dataset.m,
    a = e.target.dataset.a;
  if (a) cart[a]++;
  if (m && --cart[m] < 1) delete cart[m];
  upd();
};
$("#apply").onclick = () => {
  if ($("#cp").value.trim().toUpperCase() == "SAVE10") {
    disc = 0.1;
    toast("10% discount lagano hoyeche");
  } else {
    disc = 0;
    toast("Coupon code sothik noy");
  }
  upd();
};
$("#cartBtn").onclick = () => show("drawer");
$("#copy").onclick = () => {
  try {
    navigator.clipboard.writeText("SAVE10");
  } catch (e) {}
  toast("SAVE10 copy hoyeche");
};

/* auth */
let mode = "login";
function setMode(m) {
  mode = m;
  const s = m == "signup";
  $("#an").style.display = s ? "" : "none";
  $("#at").textContent = s ? "Sign up" : "Login";
  $("#asub").textContent = s ? "Account khulun" : "Login";
  $("#aq").textContent = s ? "Account ache?" : "Notun user?";
  $("#asw").textContent = s ? "Login korun" : "Sign up korun";
  $("#ap").autocomplete = s ? "new-password" : "current-password";
  $("#aerr").textContent = "";
}
$("#asw").onclick = () => setMode(mode == "login" ? "signup" : "login");
function needLogin(cb) {
  after = cb;
  setMode("login");
  show("auth");
}
$("#asub").onclick = async () => {
  const em = $("#ae").value.trim().toLowerCase(),
    pw = $("#ap").value,
    nm = $("#an").value.trim(),
    er = $("#aerr");
  if (!/^\S+@\S+\.\S+$/.test(em))
    return (er.textContent = "Shothik email din.");
  if (pw.length < 6)
    return (er.textContent = "Password kom pokkhe 6 okkhor hote hobe.");
  const h = await hash(em + pw);
  if (mode == "signup") {
    if (!nm) return (er.textContent = "Apnar naam din.");
    if (users[em])
      return (er.textContent = "Ei email diye account ache. Login korun.");
    users[em] = { name: nm, email: em, h, joined: new Date().toISOString() };
    st.set("users", users);
  } else if (!users[em] || users[em].h !== h)
    return (er.textContent = "Email ba password thik noy.");
  me = em;
  st.set("me", me);
  $("#ap").value = "";
  setUser();
  toast("Swagatom, " + users[em].name + "!");
  const f = after;
  after = null;
  if (f) f();
  else closeAll();
};
function setUser() {
  $("#userBtn").textContent = me ? users[me].name.split(" ")[0] : "Login";
}
$("#userBtn").onclick = () => (me ? openProfile() : needLogin(null));

/* profile */
function openProfile() {
  const u = users[me],
    my = orders.filter((o) => o.e == me),
    spent = my.reduce((a, o) => a + o.tot, 0),
    rc = Object.values(reviews)
      .flat()
      .filter((r) => r.u == me).length;
  $("#pbody").innerHTML =
    `<div class="who"><div class="av">${esc(u.name[0].toUpperCase())}</div><div><b style="font-size:1.2rem">${esc(u.name)}</b><div class="meta">${esc(u.email)} · Member since ${u.joined.slice(0, 10)}</div></div></div>
 <div class="stats"><div>${tk(spent)}<small>Mot kena-kata</small></div><div>${my.length}<small>Order</small></div><div>${rc}<small>Review</small></div></div>
 <h3>Order history</h3>${
   my.length
     ? my
         .slice()
         .reverse()
         .map(
           (o) =>
             `<div class="ord"><div class="top"><span>#${o.id} · ${o.d.slice(0, 10)}</span><span>${tk(o.tot)}</span></div><div class="meta">${o.it.map((i) => `${P.find((p) => p.id == i.id).e} ${esc(P.find((p) => p.id == i.id).n)} ×${i.q}`).join(", ")}</div><div class="meta">Payment: ${esc(o.pm)} · Status: ${esc(o.s)}</div></div>`,
         )
         .join("")
     : '<p class="meta">Ekhono kono order nei. Shopping shuru korun!</p>'
 }
 <button class="btn alt" id="lo" style="margin-top:16px">Logout</button>`;
  $("#lo").onclick = () => {
    me = null;
    st.set("me", null);
    setUser();
    closeAll();
    toast("Logout hoyeche");
  };
  show("prof");
}

/* product + reviews */
function openP(id) {
  curP = id;
  rate = 0;
  const x = P.find((p) => p.id == id),
    l = reviews[id] || [],
    a = avg(id);
  const bought =
    me && orders.some((o) => o.e == me && o.it.some((i) => i.id == id));
  $("#pdb").innerHTML =
    `<div class="hd"><h2>${x.n}</h2><button class="ic" data-x>✕</button></div>
 <div class="pdtop" style="--c1:${x.g[0]};--c2:${x.g[1]}"><div class="pic">${x.e}</div><div style="flex:1;min-width:200px"><div class="price">${tk(x.p)} ${x.o > x.p ? `<s>${tk(x.o)}</s>` : ""}</div><p class="meta">${x.d}</p><p><span class="star">${a ? stars(a) : "☆☆☆☆☆"}</span> <span class="meta">${a ? a.toFixed(1) : "Notun"} (${l.length} review)</span></p><button class="btn" id="pdadd" style="margin-top:12px">Cart-e rakhun</button></div></div>
 <h3>Customer review</h3>${
   l.length
     ? l
         .slice()
         .reverse()
         .map(
           (r) =>
             `<div class="rv"><b>${esc(r.n)}</b>${r.v ? '<span class="vb">Verified buyer</span>' : ""} <span class="star">${stars(r.r)}</span> <span class="meta">${r.d}</span><p>${esc(r.t)}</p></div>`,
         )
         .join("")
     : '<p class="meta">Ekhono kono review nei. Prothom review apni din!</p>'
 }
 <h3 style="margin-top:14px">Apnar review likhun</h3>
 ${me ? `<div class="stars" id="stars">${[1, 2, 3, 4, 5].map((n) => `<button data-s="${n}" aria-label="${n} star">★</button>`).join("")}</div><div class="f"><textarea id="rt" rows="3" maxlength="400" placeholder="Product ta kemon laglo?"></textarea></div><p class="err" id="rerr"></p><button class="btn" id="rsub">Review joma din${bought ? " (Verified buyer)" : ""}</button>` : '<button class="btn alt" id="rlog">Review likhte login korun</button>'}`;
  show("pd");
  $("#pdadd").onclick = () => add(id);
  if (me) {
    $("#stars").onclick = (e) => {
      const s = +e.target.dataset.s;
      if (!s) return;
      rate = s;
      document
        .querySelectorAll("#stars button")
        .forEach((b) => b.classList.toggle("on", +b.dataset.s <= s));
    };
    $("#rsub").onclick = () => {
      const t = $("#rt").value.trim();
      if (!rate) return ($("#rerr").textContent = "Star rating din.");
      if (t.length < 5)
        return ($("#rerr").textContent = "Kichu likhun (kom pokkhe 5 okkhor).");
      (reviews[id] = reviews[id] || []).push({
        u: me,
        n: users[me].name,
        r: rate,
        t,
        d: new Date().toISOString().slice(0, 10),
        v: bought,
      });
      st.set("reviews", reviews);
      render();
      toast("Review jog hoyeche, dhonnobad!");
      openP(id);
    };
  } else $("#rlog").onclick = () => needLogin(() => openP(id));
}

/* checkout */
$("#go").onclick = () => {
  if (!totals().n) return toast("Age product jog korun");
  if (!me) return needLogin(openCo);
  openCo();
};
function openCo() {
  $("#nm").value = users[me].name;
  show("co");
}
$("#place").onclick = () => {
  const nm = $("#nm").value.trim(),
    ph = $("#ph").value.trim(),
    ad = $("#ad").value.trim();
  if (!nm || !/^01\d{9}$/.test(ph) || ad.length < 8)
    return ($("#err").textContent =
      "Naam, shothik 11 digit mobile number ar puro thikana din.");
  $("#err").textContent = "";
  const t = totals(),
    pm = document.querySelector("[name=p]:checked").value,
    id = "YB" + Math.floor(1e5 + Math.random() * 9e5);
  orders.push({
    id,
    e: me,
    d: new Date().toISOString(),
    it: Object.keys(cart).map((k) => ({ id: +k, q: cart[k] })),
    tot: t.tot,
    pm,
    s: "Processing",
  });
  st.set("orders", orders);
  $("#okt").textContent =
    `Dhonnobad, ${nm}! Order #${id} · ${tk(t.tot)} · ${pm}. Order-ti apnar profile-e save hoyeche.`;
  cart = {};
  disc = 0;
  upd();
  show("ok");
};
$("#seeP").onclick = openProfile;

/* countdown */
const end = Date.now() + 8 * 36e5;
setInterval(() => {
  let s = (Math.max(0, end - Date.now()) / 1e3) | 0;
  const f = (n, id) =>
    ($(id).firstChild.nodeValue = String(n).padStart(2, "0"));
  f((s / 3600) | 0, "#h");
  f(((s % 3600) / 60) | 0, "#m");
  f(s % 60, "#s");
}, 1000);
setMode("login");
setUser();
render();
upd();

/* 3D hero */
try {
  const el = $("#stage"),
    R = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  R.setPixelRatio(Math.min(devicePixelRatio, 2));
  el.appendChild(R.domElement);
  const S = new THREE.Scene(),
    C = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  C.position.set(0, 0.6, 7);
  S.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dl = new THREE.DirectionalLight(0xffffff, 1);
  dl.position.set(4, 6, 5);
  S.add(dl);
  const p1 = new THREE.PointLight(0x22d3ee, 1.4, 20);
  p1.position.set(-4, -1, 3);
  S.add(p1);
  const p2 = new THREE.PointLight(0xf43f5e, 1.2, 20);
  p2.position.set(4, -2, 2);
  S.add(p2);
  const G = new THREE.Group();
  S.add(G);
  const M = (c, m = 0.3, r = 0.3) =>
    new THREE.MeshPhysicalMaterial({
      color: c,
      metalness: m,
      roughness: r,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
  G.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      [0x7c3aed, 0x06b6d4, 0xf43f5e, 0xf59e0b, 0x22c55e, 0xdb2777].map((c) =>
        M(c, 0.5, 0.2),
      ),
    ),
  );
  const lid = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 0.4, 2.2),
    M(0xffffff, 0.8, 0.1),
  );
  lid.position.y = 1.2;
  G.add(lid);
  const gold = M(0xffc93c, 0.8, 0.2);
  [
    [2.05, 2.45, 0.4],
    [0.4, 2.45, 2.05],
  ].forEach((a) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(...a), gold);
    b.position.y = 0.1;
    G.add(b);
  });
  [1, -1].forEach((s) => {
    const k = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.1, 12, 32), gold);
    k.position.set(s * 0.4, 1.62, 0);
    k.rotation.set(Math.PI / 2.3, 0, s * 0.7);
    G.add(k);
  });
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.7, 0.04, 8, 100),
    M(0x22d3ee, 0.9, 0.1),
  );
  ring.rotation.x = 1.2;
  S.add(ring);
  const orb = [];
  for (let i = 0; i < 16; i++) {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(0.12 + Math.random() * 0.1, 20, 20),
      M([0xf43f5e, 0xfbbf24, 0x22d3ee, 0xa78bfa, 0x4ade80][i % 5], 0.8, 0.1),
    );
    m.userData = {
      a: (i / 16) * 6.28,
      r: 2.6 + Math.random() * 0.8,
      y: (Math.random() - 0.5) * 2.4,
      s: 0.3 + Math.random() * 0.4,
    };
    S.add(m);
    orb.push(m);
  }
  let tx = 0,
    ty = 0,
    rx = 0,
    ry = 0,
    drag = 0,
    lx = 0,
    ly = 0;
  el.onpointerdown = (e) => {
    drag = 1;
    lx = e.clientX;
    ly = e.clientY;
    el.style.cursor = "grabbing";
  };
  addEventListener("pointerup", () => {
    drag = 0;
    el.style.cursor = "grab";
  });
  addEventListener("pointermove", (e) => {
    if (drag) {
      ty += (e.clientX - lx) * 0.01;
      tx += (e.clientY - ly) * 0.01;
      lx = e.clientX;
      ly = e.clientY;
    }
  });
  function fit() {
    const w = el.clientWidth,
      h = el.clientHeight;
    R.setSize(w, h);
    C.aspect = w / h;
    C.updateProjectionMatrix();
  }
  addEventListener("resize", fit);
  fit();
  const still = matchMedia("(prefers-reduced-motion:reduce)").matches;
  (function loop(t) {
    requestAnimationFrame(loop);
    const s = t / 1000;
    if (!drag && !still) ty += 0.006;
    ry += (ty - ry) * 0.1;
    rx += (tx - rx) * 0.1;
    G.rotation.set(rx * 0.6 + Math.sin(s) * 0.08, ry, 0);
    G.position.y = still ? 0 : Math.sin(s * 1.4) * 0.15;
    ring.rotation.z = s * 0.3;
    orb.forEach((o) => {
      const d = o.userData,
        a = d.a + (still ? 0 : s * d.s);
      o.position.set(
        Math.cos(a) * d.r,
        d.y + Math.sin(s + d.a) * 0.2,
        Math.sin(a) * d.r,
      );
    });
    R.render(S, C);
  })(0);
} catch (e) {
  $("#stage").innerHTML =
    '<p class="meta" style="padding:40px">3D dekhate WebGL dorkar.</p>';
}
