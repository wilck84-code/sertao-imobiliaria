// Servidor do app Sertão Imobiliária (Netlify Functions + Netlify Blobs)
// Rotas públicas:  GET /api/imoveis · POST /api/evento · GET /api/foto/<id>
// Rotas do administrador (cabeçalho x-senha = variável ADMIN_SENHA):
//   GET /api/admin · POST /api/admin/imovel · DELETE /api/admin/imovel?id=
//   POST /api/admin/config · POST /api/admin/foto
import { getStore } from "@netlify/blobs";

export const config = { path: "/api/*" };

const SEED = {
 "config": {
  "nome": "Sertão Imobiliária",
  "whatsapp": "5588999999999",
  "logo": "/logo.png",
  "mostrarNome": false
 },
 "imoveis": [
  {
   "id": "CC-101",
   "gps": "-7.2131, -39.3153",
   "modo": "aluguel",
   "tipo": "Casa",
   "titulo": "Casa com quintal e varanda",
   "bairro": "Centro",
   "preco": 1200,
   "q": 2,
   "b": 1,
   "v": 1,
   "area": 90,
   "cor": [
    "#E9D8B4",
    "#8B4A3A"
   ],
   "extras": [
    "Quintal",
    "Varanda",
    "Perto do comércio"
   ],
   "desc": "Casa térrea arejada, sala ampla, cozinha com bancada e quintal nos fundos. Rua calçada e tranquila.",
   "fotos": [],
   "status": "disponivel",
   "exemplo": true
  },
  {
   "id": "CC-102",
   "gps": "-7.2245, -39.3301",
   "modo": "aluguel",
   "tipo": "Apartamento",
   "titulo": "Apartamento térreo mobiliado",
   "bairro": "Jardim Primavera",
   "preco": 950,
   "q": 1,
   "b": 1,
   "v": 1,
   "area": 52,
   "cor": [
    "#CFE0E8",
    "#3E5C6E"
   ],
   "extras": [
    "Mobiliado",
    "Água inclusa"
   ],
   "desc": "Apartamento pronto para morar, com armários, cama e geladeira. Ideal para casal ou estudante.",
   "fotos": [],
   "status": "disponivel",
   "exemplo": true
  },
  {
   "id": "CC-103",
   "gps": "-7.2398, -39.3047",
   "modo": "aluguel",
   "tipo": "Casa",
   "titulo": "Casa duplex com 3 suítes",
   "bairro": "Bairro Novo",
   "preco": 2300,
   "q": 3,
   "b": 3,
   "v": 2,
   "area": 160,
   "cor": [
    "#F2F0EA",
    "#4E6B5A"
   ],
   "extras": [
    "3 suítes",
    "Garagem coberta",
    "Área gourmet"
   ],
   "desc": "Casa nova em dois pavimentos, suítes com ventilação cruzada e área gourmet com churrasqueira.",
   "fotos": [],
   "status": "disponivel",
   "exemplo": true
  },
  {
   "id": "CC-104",
   "gps": "-7.2017, -39.3228",
   "modo": "aluguel",
   "tipo": "Casa",
   "titulo": "Casa simples perto da escola",
   "bairro": "São Francisco",
   "preco": 700,
   "q": 2,
   "b": 1,
   "v": 0,
   "area": 68,
   "cor": [
    "#F4E1A6",
    "#5B6B3A"
   ],
   "extras": [
    "Perto de escola",
    "Aceita pet"
   ],
   "desc": "Casa reformada, piso cerâmico novo e pintura recente. A duas quadras da escola e do posto de saúde.",
   "fotos": [],
   "status": "disponivel",
   "exemplo": true
  },
  {
   "id": "CC-201",
   "gps": "-7.2412, -39.2989",
   "modo": "venda",
   "tipo": "Casa",
   "titulo": "Casa ampla com piscina",
   "bairro": "Bairro Novo",
   "preco": 420000,
   "q": 3,
   "b": 2,
   "v": 2,
   "area": 210,
   "cor": [
    "#EDEDE6",
    "#2F5D73"
   ],
   "extras": [
    "Piscina",
    "Terreno 12x30",
    "Escritura ok"
   ],
   "desc": "Casa espaçosa em terreno grande, piscina, área de lazer e garagem para dois carros. Documentação em dia.",
   "fotos": [],
   "status": "disponivel",
   "exemplo": true
  },
  {
   "id": "CC-202",
   "gps": "-7.2109, -39.3127",
   "modo": "venda",
   "tipo": "Casa",
   "titulo": "Casa térrea pronta para morar",
   "bairro": "Centro",
   "preco": 235000,
   "q": 2,
   "b": 2,
   "v": 1,
   "area": 110,
   "cor": [
    "#E7C9A8",
    "#6E3B2E"
   ],
   "extras": [
    "Aceita financiamento",
    "Reformada"
   ],
   "desc": "Casa no centro, reformada em 2025, com suíte, sala de estar e jantar integradas e quintal.",
   "fotos": [],
   "status": "disponivel",
   "exemplo": true
  },
  {
   "id": "CC-203",
   "gps": "-7.2689, -39.3512",
   "modo": "venda",
   "tipo": "Chácara",
   "titulo": "Chácara com casa e pomar",
   "bairro": "Zona Rural",
   "preco": 310000,
   "q": 3,
   "b": 2,
   "v": 3,
   "area": 2000,
   "cor": [
    "#F0E6CF",
    "#7A5233"
   ],
   "extras": [
    "2.000 m²",
    "Poço",
    "Pomar"
   ],
   "desc": "Chácara a 6 km do centro, casa sede com alpendre, pomar formado, poço e energia elétrica.",
   "fotos": [],
   "status": "disponivel",
   "exemplo": true
  },
  {
   "id": "CC-204",
   "gps": "-7.2261, -39.3288",
   "modo": "venda",
   "tipo": "Apartamento",
   "titulo": "Apartamento 2 quartos com sacada",
   "bairro": "Jardim Primavera",
   "preco": 185000,
   "q": 2,
   "b": 1,
   "v": 1,
   "area": 64,
   "cor": [
    "#D9E4EC",
    "#3B4F63"
   ],
   "extras": [
    "Sacada",
    "Condomínio baixo"
   ],
   "desc": "Apartamento no 2º andar, sol da manhã, sacada e vaga demarcada. Condomínio de R$ 180.",
   "fotos": [],
   "status": "disponivel",
   "exemplo": true
  }
 ]
};
const EVENTOS = ["site", "casa", "visita"];
const STATUS = ["disponivel", "alugado", "vendido", "pausado"];
const MAX_FOTO = 5 * 1024 * 1024;

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
const erro = (msg, status = 400) => json({ erro: msg }, status);
const hoje = () => new Date(Date.now() - 3 * 3600e3).toISOString().slice(0, 10); // horário de Brasília

const loja = () => getStore({ name: "sertao", consistency: "strong" });

async function lerDados(store) {
  const d = await store.get("dados", { type: "json" });
  if (d && d.config && Array.isArray(d.imoveis)) return d;
  const novo = JSON.parse(JSON.stringify(SEED));
  await store.setJSON("dados", novo);
  return novo;
}
const statusDe = (im) => (STATUS.includes(im.status) ? im.status : "disponivel");
const publico = (im) => {
  const { exemplo, ...resto } = im;
  return resto;
};

function limparImovel(b, idExistente) {
  const n = (v) => Math.max(0, Math.round(Number(String(v ?? "").replace(/[^\d.]/g, "")) || 0));
  const t = (v, max) => String(v ?? "").trim().slice(0, max);
  const im = {
    id: idExistente,
    status: STATUS.includes(b.status) ? b.status : "disponivel",
    statusEm: t(b.statusEm, 10),
    modo: b.modo === "venda" ? "venda" : "aluguel",
    tipo: t(b.tipo, 40) || "Casa",
    titulo: t(b.titulo, 90),
    bairro: t(b.bairro, 60),
    preco: n(b.preco),
    q: n(b.q), b: n(b.b), v: n(b.v), area: n(b.area),
    desc: t(b.desc, 3000),
    extras: (Array.isArray(b.extras) ? b.extras : []).map((x) => t(x, 40)).filter(Boolean).slice(0, 20),
    gps: t(b.gps, 60),
    fotos: (Array.isArray(b.fotos) ? b.fotos : [])
      .filter((f) => f && typeof f.src === "string" && /^\/api\/foto\/[\w.-]+$/.test(f.src))
      .slice(0, 40)
      .map((f) => ({ src: f.src, nome: t(f.nome, 40) })),
  };
  if (Array.isArray(b.cor)) im.cor = b.cor.slice(0, 2).map((c) => t(c, 9));
  if (b.exemplo) im.exemplo = true;
  return im;
}
function novoId(imoveis) {
  const nums = imoveis.map((i) => parseInt(String(i.id).replace(/\D/g, ""), 10) || 0);
  return "ST-" + (Math.max(100, ...nums) + 1);
}

async function registrarEvento(store, tipo, id) {
  const key = "stats/" + id;
  const s = (await store.get(key, { type: "json" })) || { total: {}, dias: {} };
  const d = hoje();
  s.total[tipo] = (s.total[tipo] || 0) + 1;
  s.dias[d] = s.dias[d] || {};
  s.dias[d][tipo] = (s.dias[d][tipo] || 0) + 1;
  const dias = Object.keys(s.dias).sort();
  while (dias.length > 400) delete s.dias[dias.shift()];
  await store.setJSON(key, s);
}
async function lerStats(store) {
  const { blobs } = await store.list({ prefix: "stats/" });
  const out = {};
  await Promise.all(
    blobs.map(async ({ key }) => {
      out[key.slice(6)] = await store.get(key, { type: "json" });
    })
  );
  return out;
}

export default async (req) => {
  const url = new URL(req.url);
  const rota = url.pathname.replace(/^\/api\/?/, "").replace(/\/+$/, "");
  const m = req.method;
  try {
    const store = loja();

    if (rota === "imoveis" && m === "GET") {
      const d = await lerDados(store);
      return json({ config: d.config, imoveis: d.imoveis.filter((i) => statusDe(i) === "disponivel").map(publico) });
    }

    if (rota === "evento" && m === "POST") {
      const b = await req.json().catch(() => ({}));
      if (!EVENTOS.includes(b.tipo)) return erro("Evento inválido.");
      let id = "_site";
      if (b.tipo !== "site") {
        const d = await lerDados(store);
        if (!d.imoveis.some((i) => i.id === b.id)) return erro("Imóvel não encontrado.", 404);
        id = b.id;
      }
      await registrarEvento(store, b.tipo, id);
      return json({ ok: true });
    }

    if (rota.startsWith("foto/") && m === "GET") {
      const id = rota.slice(5);
      if (!/^[\w.-]+$/.test(id)) return new Response("", { status: 404 });
      const r = await store.getWithMetadata("fotos/" + id, { type: "arrayBuffer" });
      if (!r) return new Response("Foto não encontrada", { status: 404 });
      return new Response(r.data, {
        headers: { "content-type": r.metadata?.tipo || "image/jpeg", "cache-control": "public, max-age=31536000, immutable" },
      });
    }

    if (rota === "admin" || rota.startsWith("admin/")) {
      const senha = process.env.ADMIN_SENHA;
      if (!senha) return erro("A senha do administrador ainda não foi configurada no Netlify (variável ADMIN_SENHA).", 503);
      if (req.headers.get("x-senha") !== senha) return erro("Senha incorreta.", 401);
      const d = await lerDados(store);

      if (rota === "admin" && m === "GET") {
        return json({ config: d.config, imoveis: d.imoveis, stats: await lerStats(store), hoje: hoje() });
      }

      if (rota === "admin/imovel" && m === "POST") {
        const b = await req.json().catch(() => null);
        if (!b) return erro("Dados do imóvel inválidos.");
        const idx = d.imoveis.findIndex((i) => i.id === b.id);
        const im = limparImovel(b, idx >= 0 ? d.imoveis[idx].id : novoId(d.imoveis));
        if (!im.titulo || !im.bairro || !im.preco) return erro("Preencha título, bairro e preço.");
        if (idx >= 0) d.imoveis[idx] = im;
        else d.imoveis.unshift(im);
        await store.setJSON("dados", d);
        return json({ ok: true, imovel: im });
      }

      if (rota === "admin/imovel" && m === "DELETE") {
        const id = url.searchParams.get("id");
        const im = d.imoveis.find((i) => i.id === id);
        if (!im) return erro("Imóvel não encontrado.", 404);
        d.imoveis = d.imoveis.filter((i) => i.id !== id);
        await store.setJSON("dados", d);
        await Promise.all([
          ...(im.fotos || []).map((f) => store.delete("fotos/" + f.src.split("/").pop())),
          store.delete("stats/" + id),
        ]);
        return json({ ok: true });
      }

      if (rota === "admin/config" && m === "POST") {
        const b = await req.json().catch(() => ({}));
        const wa = String(b.whatsapp || "").replace(/\D/g, "");
        if (wa.length < 12) return erro("Número de WhatsApp inválido. Use DDD + número.");
        const logo = typeof b.logo === "string" && (/^\/api\/foto\/[\w.-]+$/.test(b.logo) || b.logo === "/logo.png") ? b.logo : "";
        d.config = { nome: String(b.nome || "").trim().slice(0, 60) || "Sertão Imobiliária", whatsapp: wa, logo, mostrarNome: !!b.mostrarNome };
        await store.setJSON("dados", d);
        return json({ ok: true, config: d.config });
      }

      if (rota === "admin/foto" && m === "POST") {
        const tipo = (req.headers.get("content-type") || "").split(";")[0];
        if (!/^image\/(jpeg|png|webp)$/.test(tipo)) return erro("Envie a foto em JPG, PNG ou WEBP.");
        const buf = await req.arrayBuffer();
        if (!buf.byteLength) return erro("Foto vazia.");
        if (buf.byteLength > MAX_FOTO) return erro("Foto grande demais (máximo 5 MB).");
        const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8) + (tipo === "image/png" ? ".png" : tipo === "image/webp" ? ".webp" : ".jpg");
        await store.set("fotos/" + id, buf, { metadata: { tipo } });
        return json({ ok: true, url: "/api/foto/" + id });
      }
    }

    return erro("Rota não encontrada.", 404);
  } catch (e) {
    console.error(e);
    return erro("Erro no servidor. Tente de novo em instantes.", 500);
  }
};
