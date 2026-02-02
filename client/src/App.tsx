import { useState, useEffect } from "react";

/* ================= CONFIG ================= */
const CATEGORIAS = [
  { id: "emergencia", nombre: "Teléfonos de emergencia", icono: "📞" },
  { id: "recomendados", nombre: "Recomendados", icono: "⭐" },
  { id: "comer", nombre: "Comer", icono: "🍽️" },
  { id: "comprar", nombre: "Comprar", icono: "🛍️" },
  { id: "moverte", nombre: "Moverte", icono: "🚗" },
  { id: "vida-bienestar", nombre: "Vida & Bienestar", icono: "🌿" },
  { id: "avec-trip", nombre: "Avec Trip", icono: "🧭" },
  { id: "deportes", nombre: "Deportes", icono: "🏄" },
  { id: "arte-cultura", nombre: "Arte & Cultura", icono: "🎭" },
  { id: "educacion", nombre: "Educación", icono: "🎓" },
  { id: "estadia", nombre: "Estadía", icono: "🏨" },
  { id: "inmobiliaria", nombre: "Inmobiliaria", icono: "🏠" },
  { id: "mascotas", nombre: "Mascotas", icono: "🐾" },
  { id: "eventos", nombre: "Eventos", icono: "🎉" },
  { id: "servicios", nombre: "Servicios", icono: "🛠️" },
  { id: "salud", nombre: "Salud", icono: "🏥" },
  { id: "comunidades", nombre: "Comunidades", icono: "👥" },
  { id: "gubernamental", nombre: "Gubernamental", icono: "🏛️" },
  { id: "normas", nombre: "Normas Comunitarias", icono: "📜" },
  { id: "nosotros", nombre: "Nosotros", icono: "ℹ️" },
];

const LOGO_PATH = "/logo.png";
const SHEET_ID = "16aIYKOln_dO1paNar8dGPEPVtkGxeb_TxGboxPD0JJs";

const SHEET_CSV_URL =
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

const PROMOS_CSV_URL =
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=151034078`;

const RECOMENDADOS_CSV_URL =
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=2047539037`;

const NORMAS_CSV_URL =
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=675792916`;


/* ================= UTILS ================= */
function normalizarTexto(texto: string) {
  if (!texto) return "";
  return texto
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/* ================= APP ================= */
export default function App() {
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [datos, setDatos] = useState<any[]>([]);
  const [promos, setPromos] = useState<any[]>([]);
  const [recomendados, setRecomendados] = useState<any[]>([]);
  const [normas, setNormas] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [idioma, setIdioma] = useState<"es" | "en">("es");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [resNegocios, resPromos, resRecs, resNormas] = await Promise.all([
          fetch(SHEET_CSV_URL).then(r => r.text()),
          fetch(PROMOS_CSV_URL).then(r => r.text()),
          fetch(RECOMENDADOS_CSV_URL).then(r => r.text()),
          fetch(NORMAS_CSV_URL).then(r => r.text())
        ]);
        
        setDatos(parseCSV(resNegocios));
        setPromos(parseCSV(resPromos));
        setRecomendados(parseCSV(resRecs));
        setNormas(parseCSV(resNormas));
      } catch (err) {
        console.error("Error cargando datos:", err);
      } finally {
        setCargando(false);
      }
    };
    loadData();
  }, []);

  function parseCSV(text: string) {
    if (!text || text.includes("<!DOCTYPE html>")) return [];
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l);
    if (lines.length < 1) return [];

    const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
    const rows = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      const row: any = {};
      headers.forEach((h, idx) => (row[h] = values[idx] || ""));
      // También mapeamos por columnas para facilitar acceso si los headers cambian
      values.forEach((v, idx) => row[`col_${idx}`] = v);
      rows.push(row);
    }
    return rows;
  }

  function parseCSVLine(line: string) {
    const result = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') inQuotes = !inQuotes;
      else if (char === "," && !inQuotes) {
        result.push(current.trim().replace(/^"|"$/g, ""));
        current = "";
      } else current += char;
    }
    result.push(current.trim().replace(/^"|"$/g, ""));
    return result;
  }

  const getDatosPorCategoria = () => {
    if (!categoriaActiva) return [];
    const catId = CATEGORIAS.find(c => c.nombre === categoriaActiva)?.id;
    
    if (catId === "recomendados") return recomendados;
    if (catId === "normas") return normas;
    
    return datos.filter((row) => {
      const catFiltro = normalizarTexto(categoriaActiva);
      const rowCat = normalizarTexto(row.Categoria);
      const isPromoCat = catFiltro === normalizarTexto("Promociones Especiales");
      
      return (
        rowCat === catFiltro || 
        (catFiltro === "comunidades" && rowCat === "comunidad") ||
        (isPromoCat && rowCat === normalizarTexto("Promociones Especiales"))
      );
    });
  };

  const datosFiltrados = busqueda 
    ? datos.filter((row) => {
        const query = normalizarTexto(busqueda);
        const searchableFields = [
          row["Nombre del negocio"], row.Dirección, row.Categoria, row.Subcategoria,
          row["Sub-Subcategoria"], row.Tags, row.Keywords, row.Name
        ];
        return searchableFields.some(field => normalizarTexto(field || "").includes(query));
      })
    : getDatosPorCategoria();

  const t = {
    es: {
      searchPlaceholder: "¿Qué estás buscando en Punta Hermosa?",
      backHome: "Volver al Inicio",
      promos: "Promociones Especiales",
      resultsFor: "Resultados para",
      noResults: "No encontramos lo que buscas.",
      loading: "Cargando datos...",
      call: "Llamar",
      whatsapp: "WhatsApp",
      viewMap: "Ver mapa",
      schedule: "Horario",
      goToLink: "Ir a enlace",
    },
    en: {
      searchPlaceholder: "What are you looking for in Punta Hermosa?",
      backHome: "Back to Home",
      promos: "Special Promotions",
      resultsFor: "Results for",
      noResults: "We couldn't find what you're looking for.",
      loading: "Loading data...",
      call: "Call",
      whatsapp: "WhatsApp",
      viewMap: "View map",
      schedule: "Schedule",
      goToLink: "Go to link",
    }
  }[idioma];

  const todasLasPromociones = [
    ...promos,
    ...datos.filter(d => normalizarTexto(d.Categoria) === normalizarTexto("Promociones Especiales"))
  ];

  const renderNormas = () => {
    // Agrupar normas por la columna "Categoria" de su propia pestaña
    const categoriasNormas = Array.from(new Set(normas.map(n => n.Categoria || n.categoria || n.col_0).filter(Boolean)));
    
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {categoriasNormas.map(cat => (
          <div key={cat}>
            <h2 style={{ fontSize: 20, color: "#0056b3", borderBottom: "3px solid #0056b3", display: "inline-block", paddingBottom: 4, marginBottom: 15, fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.5px" }}>{cat}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {normas.filter(n => (n.Categoria || n.categoria || n.col_0) === cat).map((norma, idx) => (
                <NormaCard key={idx} norma={norma} t={t} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Roboto, sans-serif", background: "#f0f2f5", minHeight: "100vh" }}>
      <div style={{ position: "fixed", top: "15px", right: "15px", zIndex: 1100 }}>
        <button onClick={() => setIdioma(idioma === "es" ? "en" : "es")} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "20px", padding: "5px 12px", fontSize: "12px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: "5px" }}>
          {idioma === "es" ? "🇪🇸 ES" : "🇺🇸 EN"}
        </button>
      </div>

      <header style={{ background: "#fff", padding: "15px 20px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", position: "sticky", top: 0, zIndex: 1000 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <img src={LOGO_PATH} alt="Logo" style={{ width: (categoriaActiva || busqueda) ? 50 : 100, transition: "width 0.3s ease", display: "block" }} />
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: "#333", margin: 0, textTransform: "uppercase" }}>Punta Hermosa</h1>
            <p style={{ fontSize: 22, fontWeight: 900, color: "#0056b3", margin: 0, letterSpacing: "1px", textTransform: "uppercase", marginTop: -2 }}>CONNECT</p>
          </div>
        </div>
      </header>

      {(busqueda || categoriaActiva) && (
        <div style={{ position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)", zIndex: 1100, padding: "0 16px", width: "100%", maxWidth: "400px", display: "flex", justifyContent: "center" }}>
          <button onClick={() => { setCategoriaActiva(null); setBusqueda(""); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ background: "#0056b3", border: "none", padding: "12px 24px", borderRadius: "30px", color: "#fff", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 15px rgba(0,86,179,0.4)", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span>🏠</span> {t.backHome}
          </button>
        </div>
      )}

      <div style={{ padding: "15px 16px", maxWidth: 600, margin: "0 auto" }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <span style={{ position: "absolute", left: "12px", color: "#888", fontSize: "16px", pointerEvents: "none" }}>🔍</span>
          <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder={t.searchPlaceholder} style={{ width: "100%", padding: "12px 16px 12px 38px", borderRadius: "12px", border: "1px solid #e0e0e0", fontSize: "14px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", outline: "none", background: "#fff" }} />
          {busqueda && <button onClick={() => setBusqueda("")} style={{ position: "absolute", right: "12px", border: "none", background: "none", color: "#888", fontSize: "18px", cursor: "pointer" }}>×</button>}
        </div>
      </div>

      {!busqueda && !categoriaActiva && (
        <>
          <section style={{ maxWidth: 600, margin: "0 auto 15px", padding: "0 16px" }}>
            <div style={{ background: "linear-gradient(45deg, #0056b3, #00a8ff)", color: "#fff", padding: "12px", borderRadius: "12px", textAlign: "center", boxShadow: "0 4px 12px rgba(0,86,179,0.15)", overflow: "hidden" }}>
              <div 
                style={{ cursor: "pointer" }} 
                onClick={() => setCategoriaActiva("Promociones Especiales")}
              >
                <h2 style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 700 }}>{t.promos}</h2>
              </div>
              <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "10px" }}>
                {todasLasPromociones.length > 0 ? (
                  todasLasPromociones.map((promo, idx) => {
                    const imgUrl = (promo.Imagen || promo.imagen || promo["Imagen del negocio"] || promo.col_0 || "").toString().trim();
                    const titulo = (idioma === "es" ? (promo.Titulo || promo.titulo || promo["Nombre del negocio"] || promo.col_1) : (promo.Title || promo.title || promo.Name || promo.col_1 || promo.Titulo || promo.titulo)) || "Promoción";
                    
                    const phone = (promo.Teléfono || "").toString().replace(/\D/g,'');
                    const link = phone ? `https://wa.me/51${phone}` : (promo.Link || promo.link || promo.col_2 || "#").toString().trim();
                    
                    if (!imgUrl.startsWith("http")) return null;
                    return (
                      <a key={idx} href={link} target="_blank" rel="noopener noreferrer" style={{ flex: "0 0 auto", width: "160px", background: "rgba(255,255,255,0.2)", borderRadius: "8px", padding: "10px", textDecoration: "none", color: "#fff", fontSize: "11px", display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                        <img src={imgUrl} alt={titulo.toString()} style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "4px", background: "#fff" }} />
                        <span style={{ fontWeight: "600", textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{titulo}</span>
                      </a>
                    );
                  })
                ) : <div style={{ width: "100%", fontSize: "12px", opacity: 0.8, padding: "20px" }}>{t.loading}</div>}
              </div>
            </div>
          </section>

          <main style={{ padding: "0 16px 80px", maxWidth: 800, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {CATEGORIAS.map((c) => (
                <button key={c.id} onClick={() => { setCategoriaActiva(c.nombre); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ background: "#fff", border: "none", borderRadius: "12px", padding: "10px 4px", cursor: "pointer", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                  <div style={{ fontSize: 20 }}>{c.icono}</div>
                  <div style={{ fontSize: 9, fontWeight: 600, marginTop: 4, color: "#444", lineHeight: "1.1" }}>{c.nombre}</div>
                </button>
              ))}
            </div>
          </main>
        </>
      )}

      {(busqueda || categoriaActiva) && (
        <main style={{ padding: "0 16px 100px", maxWidth: 700, margin: "0 auto" }}>
          <div style={{ marginBottom: "25px" }}>
            {categoriaActiva && !busqueda && <h1 style={{ fontSize: 22, fontWeight: 900, color: "#333", margin: 0, textTransform: "uppercase", letterSpacing: "1px" }}>{categoriaActiva}</h1>}
            {busqueda && <h1 style={{ fontSize: 16, fontWeight: 600, color: "#666", margin: 0 }}>{t.resultsFor}: "{busqueda}"</h1>}
          </div>
          {cargando ? <div style={{ textAlign: "center", padding: 20 }}>{t.loading}</div> : datosFiltrados.length === 0 ? <div style={{ textAlign: "center", padding: 40, color: "#666" }}>🏖️ {t.noResults}</div> : (
            categoriaActiva === "Normas Comunitarias" && !busqueda ? renderNormas() : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {busqueda && !categoriaActiva ? datosFiltrados.map((row, i) => <BusinessCard key={i} row={row} t={t} />) : (
                  Array.from(new Set(datosFiltrados.map(r => r.Subcategoria).filter(Boolean))).length > 0 ? (
                    Array.from(new Set(datosFiltrados.map(r => r.Subcategoria))).map(sub => (
                      <div key={sub || 'general'} style={{ marginBottom: 20 }}>
                        {sub && <h2 style={{ fontSize: 18, color: "#0056b3", borderBottom: "2px solid #0056b3", display: "inline-block", paddingBottom: 2, marginBottom: 15, fontWeight: "bold" }}>{sub}</h2>}
                        {Array.from(new Set(datosFiltrados.filter(r => r.Subcategoria === sub).map(r => r["Sub-Subcategoria"]))).map(subSub => (
                          <div key={subSub || 'general'} style={{ marginBottom: 15, paddingLeft: sub ? "10px" : "0" }}>
                            {subSub && subSub !== sub && <h3 style={{ fontSize: 14, color: "#555", fontWeight: "700", textTransform: "uppercase", marginBottom: "10px" }}>• {subSub}</h3>}
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                              {datosFiltrados.filter(r => r.Subcategoria === sub && r["Sub-Subcategoria"] === subSub).map((row, i) => <BusinessCard key={i} row={row} t={t} />)}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    datosFiltrados.map((row, i) => <BusinessCard key={i} row={row} t={t} />)
                  )
                )}
              </div>
            )
          )}
        </main>
      )}
    </div>
  );
}

function NormaCard({ norma, t }: { norma: any, t: any }) {
  const formatLink = (link: string) => {
    if (!link) return "#";
    const l = link.toString().trim();
    if (!l) return "#";
    return l.startsWith("http") ? l : `https://${l}`;
  };

  const link = formatLink(norma.enlace || norma.Enlace || norma.col_3 || "");
  const titulo = norma.titulos || norma.Titulos || norma.titulo || norma.Titulo || norma.col_2 || "";
  const fecha = norma.fecha || norma.Fecha || norma.col_1 || "";

  return (
    <div style={{ background: "#fff", padding: "18px", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.06)", border: "1px solid #eef2f7" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "8px" }}>
        {fecha && <span style={{ fontSize: "12px", background: "#f0f7ff", color: "#0056b3", padding: "4px 10px", borderRadius: "20px", fontWeight: "700" }}>{fecha}</span>}
      </div>
      <p style={{ fontSize: "15px", color: "#333", lineHeight: "1.6", margin: "0 0 16px 0", whiteSpace: "pre-wrap", fontWeight: "500" }}>
        {titulo}
      </p>
      {link !== "#" && (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#0056b3", color: "#fff", padding: "10px 18px", borderRadius: "10px", textDecoration: "none", fontSize: "14px", fontWeight: "bold", boxShadow: "0 4px 10px rgba(0,86,179,0.2)", transition: "transform 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
        >
          <span>🔗</span> {t.goToLink}
        </a>
      )}
    </div>
  );
}

function SocialLinks({ row }: { row: any }) {
  // Buscamos en todos los posibles nombres de columna
  const ig = (row.IG || row.ig || row.Instagram || row.instagram || row.col_11 || "").toString().trim();
  const fb = (row.fb || row.FB || row.Facebook || row.facebook || row.col_12 || "").toString().trim();
  const tiktok = (row.Tiktok || row.tiktok || row.TikTok || "").toString().trim();
  const web = (row.Web || row.web || "").toString().trim();

  if (!ig && !fb && !tiktok && !web) return null;

const formatLink = (link: string, platform: string) => {
  if (!link) return "#";

  let clean = link.toString().trim();

  // si ya es URL completa
  if (clean.startsWith("http://") || clean.startsWith("https://")) {
    return clean;
  }

  // quitar @ si lo hay
  clean = clean.replace(/^@/, "");

  switch (platform) {
    case "ig":
      return `https://www.instagram.com/${clean}`;
    case "fb":
      return `https://www.facebook.com/${clean}`;
    case "tiktok":
      return `https://www.tiktok.com/@${clean}`;
    default:
      // web
      if (clean.startsWith("www.")) {
        return `https://${clean}`;
      }
      return `https://${clean}`;
  }
};

return (
  <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: "8px" }}>
    {ig && (
      <button
        onClick={() => window.open(formatLink(ig, "ig"), "_blank", "noopener,noreferrer")}
        style={socialBtn("#C13584", "#fef2f2")}
      >
        📸 {ig.startsWith("@") ? ig : `@${ig}`}
      </button>
    )}

    {fb && (
      <button
        onClick={() => window.open(formatLink(fb, "fb"), "_blank", "noopener,noreferrer")}
        style={socialBtn("#1877F2", "#f0f7ff")}
      >
        🔵 {fb}
      </button>
    )}

    {tiktok && !/^\d+$/.test(tiktok) && (
      <button
        onClick={() => window.open(formatLink(tiktok, "tiktok"), "_blank", "noopener,noreferrer")}
        style={socialBtn("#000", "#f3f4f6")}
      >
        🎵 {tiktok.startsWith("@") ? tiktok : `@${tiktok}`}
      </button>
    )}

    {web && (
      <button
        onClick={() =>
          window.open(
            web.startsWith("http") ? web : `https://${web}`,
            "_blank",
            "noopener,noreferrer"
          )
        }
        style={{ ...socialBtn("#0056b3", "#f0f7ff"), width: "100%" }}
      >
        🌐 {web}
      </button>
    )}
  </div>
);
}

function BusinessCard({ row, t }: { row: any, t: any }) {
const formatLink = (link: string) => {
  if (!link) return "#";

  let clean = link.toString().trim();

  if (clean.startsWith("http://") || clean.startsWith("https://")) {
    return clean;
  }

  clean = clean.replace(/^@/, "");

  if (clean.includes("instagram.com")) {
    return clean.startsWith("http")
      ? clean
      : `https://www.instagram.com/${clean.split("/").pop()}`;
  }

  if (clean.includes("facebook.com")) {
    return clean.startsWith("http")
      ? clean
      : `https://www.facebook.com/${clean.split("/").pop()}`;
  }

  if (clean.includes("tiktok.com")) {
    return clean.startsWith("http")
      ? clean
      : `https://www.tiktok.com/@${clean.split("/").pop()}`;
  }

  if (clean.startsWith("www.")) {
    return `https://${clean}`;
  }

  return `https://${clean}`;
};

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none';
  };

  const isPromo = normalizarTexto(row.Categoria) === normalizarTexto("Promociones Especiales");
  const phone = (row.Teléfono || "").toString().replace(/\D/g,'');
  const whatsappUrl = phone ? `https://wa.me/51${phone}` : "#";
  const titleText = (row["Nombre del negocio"] || row.Titulo || "").toString();
  const hasTitleLink = titleText.startsWith("http");
  const titleLink = hasTitleLink ? formatLink(titleText) : "#";

  return (
    <div style={{ background: "#fff", padding: 14, borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", border: "1px solid #f0f0f0" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "start" }}>
        {(row["Imagen del negocio"] || row.Imagen) && (
          isPromo ? (
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", flexShrink: 0 }}>
              <img 
                src={(row["Imagen del negocio"] || row.Imagen).toString()} 
                alt="" 
                style={{ width: 85, height: 85, borderRadius: "10px", objectFit: "cover", backgroundColor: "#f9f9f9" }} 
                onError={handleImageError}
              />
            </a>
          ) : (
            <img 
              src={(row["Imagen del negocio"] || row.Imagen).toString()} 
              alt="" 
              style={{ width: 65, height: 65, borderRadius: "10px", objectFit: "cover", flexShrink: 0, backgroundColor: "#f9f9f9" }} 
              onError={handleImageError}
            />
          )
        )}
        <div style={{ flex: 1 }}>
          {hasTitleLink ? (
            <a href={titleLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <p style={{ fontSize: 16, fontWeight: "bold", margin: "0 0 4px", color: "#0056b3", textDecoration: "underline", wordBreak: "break-all" }}>{titleText}</p>
            </a>
          ) : (
            <p style={{ fontSize: 16, fontWeight: "bold", margin: "0 0 4px", color: "#222" }}>{titleText}</p>
          )}
          
          {row.Dirección && <p style={{ fontSize: 13, color: "#666", margin: "2px 0" }}>📍 {row.Dirección}</p>}
          
          {row.Horario && (
            <p style={{ fontSize: 12, color: "#555", margin: "4px 0", display: "flex", alignItems: "center", gap: "4px" }}>
              🕒 <strong>{t.schedule}:</strong> {row.Horario}
            </p>
          )}

          {row["Google Maps"] && (
            <a 
              href={formatLink(row["Google Maps"])} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ fontSize: 12, color: "#0056b3", fontWeight: "bold", display: "inline-flex", alignItems: "center", gap: "4px", marginTop: "4px", textDecoration: "none" }}
            >
              🗺️ {t.viewMap}
            </a>
          )}

          <SocialLinks row={row} />
        </div>
      </div>
      <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
        {phone && (
          <>
            <a href={`tel:+51${phone}`} style={{ flex: 1, textDecoration: "none", background: "#0056b3", color: "#fff", padding: "10px", borderRadius: "8px", textAlign: "center", fontWeight: "bold", fontSize: 13 }}>{t.call}</a>
            <a href={whatsappUrl} style={{ flex: 1, textDecoration: "none", background: "#25D366", color: "#fff", padding: "10px", borderRadius: "8px", textAlign: "center", fontWeight: "bold", fontSize: 13 }}>{t.whatsapp}</a>
          </>
        )}
      </div>
    </div>
  );
}
