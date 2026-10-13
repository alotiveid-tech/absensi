import { getStore } from "@netlify/blobs";

const DEFAULT_DB = {
  settings: { jamMasuk: "08:00", jamPulang: "17:00", bobot: 60, threshold: 78 },
  objects: [
    { id: "korek", name: "Korek Cricket", loc: "Meja resepsionis", active: true, refs: ["assets/obj-korek.png"] },
    { id: "buku", name: "Buku Dzikir", loc: "Ruang kerja lt. 2", active: true, refs: ["assets/obj-buku.png"] }
  ],
  records: {}
};

const norm = (db) => {
  const d = structuredClone(DEFAULT_DB);
  if (!db) return d;
  return { settings: { ...d.settings, ...(db.settings || {}) }, objects: Array.isArray(db.objects) ? db.objects : d.objects, records: db.records || {} };
};

const applyOp = (db, o) => {
  if (o.type === "checkin") { const r = (db.records[o.user] = db.records[o.user] || {}); if (!r[o.date]) r[o.date] = { in: o.min, obj: o.obj, jm: o.jm }; }
  else if (o.type === "checkout") { const r = (db.records[o.user] || {})[o.date]; if (r && r.out == null) { r.out = o.min; r.jp = o.jp; } }
  else if (o.type === "settings") db.settings = { ...db.settings, ...o.settings };
  else if (o.type === "addObject") db.objects.push(o.object);
  else if (o.type === "delObject") db.objects = db.objects.filter((x) => x.id !== o.id);
  else if (o.type === "toggleObject") db.objects = db.objects.map((x) => (x.id === o.id ? { ...x, active: x.active === false } : x));
  return db;
};

export default async (req) => {
  const store = getStore({ name: "alotive", consistency: "strong" });
  let db = norm(await store.get("db", { type: "json" }));
  if (req.method === "POST") {
    const op = await req.json();
    db = applyOp(db, op);
    await store.setJSON("db", db);
  }
  return Response.json(db, { headers: { "cache-control": "no-store" } });
};

export const config = { path: "/api/state" };
