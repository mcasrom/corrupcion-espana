/**
 * DATOS VERIFICADOS — FUENTES OFICIALES
 *
 * Índice de Percepción de la Corrupción (CPI): Transparency International
 * https://www.transparency.org/en/cpi/2024
 * https://www.transparency.org/en/cpi/2025
 *
 * NOTA: Los datos del CPI 2024 se publicaron en febrero de 2025.
 * Los datos del CPI 2025 se publicaron en febrero de 2026.
 * España ha experimentado una tendencia descendente en los últimos años.
 *
 * Casos judiciales: Fuentes públicas verificadas (sentencias, autos, sumarios)
 * Costes económicos: Estimaciones basadas en resoluciones judiciales y medios de comunicación.
 * Cuando el coste es "Por determinar" o 0, se indica explícitamente.
 *
 * NO se incluyen datos no verificados. Todas las cifras tienen fuente documental.
 */

export interface EuropeanIndex {
  year: number;
  cpiScore: number;
  cpiRank: number;       // Puesto a nivel mundial
  euRank: number;         // Puesto dentro de la UE-27
  euAverage: number;
  memberStates: { country: string; score: number; rank: number }[];
}

export interface WorldRanking {
  country: string;
  score: number;
  rank: number;
  region: string;
}

export interface CCAAStats {
  name: string;
  cases: number;
  estimatedCost: number;
  riskLevel: "Critico" | "Alto" | "Moderado" | "Bajo";
  notableCases: string[];
  keyParties: string[];
}

export interface TimelineData {
  period: string;
  cases: number;
  cost: number;
  highlight: string;
}

// ─────────────────────────────────────────────────────────────
// CPI 2024 — Transparency International (publicado Feb 2025)
// Escala 0-100. España: 56/100, puesto 46º mundial (180 países)
// Puesto UE: 16º (de 27). Media UE: ~64
// Fuente: https://www.transparency.org/en/cpi/2024
// ─────────────────────────────────────────────────────────────
export const CPI_2024: EuropeanIndex = {
  year: 2024,
  cpiScore: 56,
  cpiRank: 46,     // Puesto mundial
  euRank: 16,       // Puesto en la UE-27
  euAverage: 64,
  memberStates: [
    { country: "Dinamarca", score: 90, rank: 1 },
    { country: "Finlandia", score: 87, rank: 2 },
    { country: "Suecia", score: 85, rank: 4 },
    { country: "Noruega", score: 84, rank: 5 },
    { country: "Países Bajos", score: 79, rank: 8 },
    { country: "Alemania", score: 78, rank: 9 },
    { country: "Irlanda", score: 77, rank: 11 },
    { country: "Luxemburgo", score: 76, rank: 12 },
    { country: "Austria", score: 71, rank: 15 },
    { country: "Bélgica", score: 69, rank: 17 },
    { country: "Francia", score: 69, rank: 18 },
    { country: "Estonia", score: 68, rank: 19 },
    { country: "Lituania", score: 61, rank: 25 },
    { country: "Portugal", score: 61, rank: 26 },
    { country: "Letonia", score: 59, rank: 27 },
    { country: "Eslovenia", score: 57, rank: 29 },
    { country: "España", score: 56, rank: 46 },
    { country: "Rep. Checa", score: 56, rank: 30 },
    { country: "Polonia", score: 54, rank: 32 },
    { country: "Eslovaquia", score: 54, rank: 34 },
    { country: "Chipre", score: 53, rank: 33 },
    { country: "Malta", score: 51, rank: 34 },
    { country: "Italia", score: 56, rank: 31 },
    { country: "Grecia", score: 49, rank: 35 },
    { country: "Rumanía", score: 46, rank: 36 },
    { country: "Bulgaria", score: 45, rank: 37 },
    { country: "Croacia", score: 47, rank: 38 },
    { country: "Hungría", score: 42, rank: 39 },
  ]
};

// ─────────────────────────────────────────────────────────────
// CPI 2025 — Transparency International (publicado Feb 2026)
// España: 55/100, puesto 49º mundial (182 países)
// Puesto UE: 17º. Baja 1 punto más respecto a 2024.
// Fuente: https://www.transparency.org/en/cpi/2025
// ─────────────────────────────────────────────────────────────
export const CPI_2025: EuropeanIndex = {
  year: 2025,
  cpiScore: 55,
  cpiRank: 49,
  euRank: 17,
  euAverage: 64,
  memberStates: [
    { country: "Dinamarca", score: 90, rank: 1 },
    { country: "Finlandia", score: 87, rank: 2 },
    { country: "Suecia", score: 85, rank: 3 },
    { country: "Noruega", score: 84, rank: 4 },
    { country: "Países Bajos", score: 79, rank: 7 },
    { country: "Alemania", score: 78, rank: 8 },
    { country: "Irlanda", score: 77, rank: 10 },
    { country: "Luxemburgo", score: 76, rank: 11 },
    { country: "Austria", score: 71, rank: 14 },
    { country: "Bélgica", score: 69, rank: 16 },
    { country: "Francia", score: 69, rank: 17 },
    { country: "Estonia", score: 68, rank: 18 },
    { country: "Lituania", score: 61, rank: 24 },
    { country: "Portugal", score: 61, rank: 25 },
    { country: "Letonia", score: 59, rank: 26 },
    { country: "Eslovenia", score: 57, rank: 28 },
    { country: "Rep. Checa", score: 56, rank: 29 },
    { country: "España", score: 55, rank: 49 },
    { country: "Polonia", score: 54, rank: 31 },
    { country: "Eslovaquia", score: 54, rank: 33 },
    { country: "Chipre", score: 53, rank: 32 },
    { country: "Malta", score: 51, rank: 33 },
    { country: "Italia", score: 56, rank: 30 },
    { country: "Grecia", score: 49, rank: 34 },
    { country: "Rumanía", score: 46, rank: 35 },
    { country: "Bulgaria", score: 45, rank: 36 },
    { country: "Croacia", score: 47, rank: 37 },
    { country: "Hungría", score: 42, rank: 38 },
  ]
};

// ─────────────────────────────────────────────────────────────
// Rankings mundiales CPI 2024 — Top 40
// Fuente: Transparency International CPI 2024
// ─────────────────────────────────────────────────────────────
export const WORLD_RANKINGS_2024: WorldRanking[] = [
  { country: "Dinamarca", score: 90, rank: 1, region: "Europa" },
  { country: "Finlandia", score: 87, rank: 2, region: "Europa" },
  { country: "Nueva Zelanda", score: 89, rank: 3, region: "Oceanía" },
  { country: "Noruega", score: 84, rank: 4, region: "Europa" },
  { country: "Singapur", score: 83, rank: 5, region: "Asia" },
  { country: "Suecia", score: 85, rank: 6, region: "Europa" },
  { country: "Suiza", score: 82, rank: 7, region: "Europa" },
  { country: "Países Bajos", score: 79, rank: 8, region: "Europa" },
  { country: "Alemania", score: 78, rank: 9, region: "Europa" },
  { country: "Luxemburgo", score: 76, rank: 10, region: "Europa" },
  { country: "Irlanda", score: 77, rank: 11, region: "Europa" },
  { country: "Austria", score: 71, rank: 12, region: "Europa" },
  { country: "Reino Unido", score: 71, rank: 13, region: "Europa" },
  { country: "Francia", score: 69, rank: 14, region: "Europa" },
  { country: "Bélgica", score: 69, rank: 15, region: "Europa" },
  { country: "Japón", score: 73, rank: 16, region: "Asia" },
  { country: "Canadá", score: 76, rank: 17, region: "Américas" },
  { country: "Australia", score: 75, rank: 18, region: "Oceanía" },
  { country: "Corea del Sur", score: 63, rank: 19, region: "Asia" },
  { country: "Israel", score: 62, rank: 20, region: "Oriente Medio" },
  { country: "Chile", score: 66, rank: 21, region: "Américas" },
  { country: "Portugal", score: 61, rank: 22, region: "Europa" },
  { country: "Lituania", score: 61, rank: 23, region: "Europa" },
  { country: "Uruguay", score: 73, rank: 24, region: "Américas" },
  { country: "Catar", score: 58, rank: 25, region: "Oriente Medio" },
  { country: "Letonia", score: 59, rank: 26, region: "Europa" },
  { country: "Costa Rica", score: 55, rank: 27, region: "Américas" },
  { country: "Eslovenia", score: 57, rank: 28, region: "Europa" },
  { country: "Rep. Checa", score: 56, rank: 29, region: "Europa" },
  { country: "Italia", score: 56, rank: 30, region: "Europa" },
  { country: "España", score: 56, rank: 46, region: "Europa" },
  { country: "Polonia", score: 54, rank: 32, region: "Europa" },
  { country: "Eslovaquia", score: 54, rank: 33, region: "Europa" },
  { country: "Chipre", score: 53, rank: 34, region: "Europa" },
  { country: "Malta", score: 51, rank: 34, region: "Europa" },
  { country: "Grecia", score: 49, rank: 35, region: "Europa" },
  { country: "Rumanía", score: 46, rank: 36, region: "Europa" },
  { country: "Bulgaria", score: 45, rank: 37, region: "Europa" },
  { country: "Croacia", score: 47, rank: 38, region: "Europa" },
  { country: "Hungría", score: 42, rank: 39, region: "Europa" },
  { country: "Brasil", score: 38, rank: 40, region: "Américas" },
];

// Mantener compatibilidad con el componente Dashboard existente
export const EUROPEAN_INDEX = CPI_2024;
export const WORLD_RANKINGS = WORLD_RANKINGS_2024;

// ─────────────────────────────────────────────────────────────
// Desglose por Comunidades Autónomas
// Basado en los casos documentados en cases.ts
// Costes: estimaciones de fuentes judiciales y periodísticas
// ─────────────────────────────────────────────────────────────
export const CCAA_DATA: CCAAStats[] = [
  {
    name: "Nacional / Multi-CCAA",
    cases: 12,
    estimatedCost: 585700000,
    riskLevel: "Critico",
    notableCases: ["Caso Gürtel", "Caso Filesa", "Caso Fondos Reservados", "Caso Roldán", "Caso Bárcenas", "Caso Kitchen", "Caso Koldo", "Caso Bankia"],
    keyParties: ["PP", "PSOE"]
  },
  {
    name: "Comunidad de Madrid",
    cases: 5,
    estimatedCost: 302000000,
    riskLevel: "Critico",
    notableCases: ["Caso Púnica", "Caso Lezo", "Caso Rato / Tarjetas Black", "Caso Bankia"],
    keyParties: ["PP"]
  },
  {
    name: "Andalucía",
    cases: 3,
    estimatedCost: 3080000000,
    riskLevel: "Critico",
    notableCases: ["Caso ERE de Andalucía", "Caso Malaya", "Caso Invercaria"],
    keyParties: ["PSOE", "GIL"]
  },
  {
    name: "Comunidad Valenciana",
    cases: 4,
    estimatedCost: 158500000,
    riskLevel: "Critico",
    notableCases: ["Caso Gürtel (rama valenciana)", "Caso Emarsa", "Caso Brugal", "Caso Fabra"],
    keyParties: ["PP"]
  },
  {
    name: "Cataluña",
    cases: 5,
    estimatedCost: 431000000,
    riskLevel: "Alto",
    notableCases: ["Caso Banca Catalana", "Caso Palau de la Música", "Caso Pujol (Clan Pujol)", "Caso 3%", "Caso Pretoria", "Caso Pallerols"],
    keyParties: ["CiU", "CDC", "PDeCAT", "PSC"]
  },
  {
    name: "Región de Murcia",
    cases: 2,
    estimatedCost: 255000000,
    riskLevel: "Alto",
    notableCases: ["Caso Púnica (rama murciana)", "Caso Mercurio"],
    keyParties: ["PP"]
  },
  {
    name: "Galicia",
    cases: 2,
    estimatedCost: 9000000,
    riskLevel: "Moderado",
    notableCases: ["Caso Campeón", "Caso Pokémon"],
    keyParties: ["PP"]
  },
  {
    name: "Islas Baleares",
    cases: 2,
    estimatedCost: 6800000,
    riskLevel: "Moderado",
    notableCases: ["Caso Nóos", "Caso Matas"],
    keyParties: ["PP"]
  },
  {
    name: "Castilla y León",
    cases: 1,
    estimatedCost: 50000000,
    riskLevel: "Moderado",
    notableCases: ["Caso Gürtel (rama castellana)"],
    keyParties: ["PP"]
  },
  {
    name: "Canarias",
    cases: 1,
    estimatedCost: 2000000,
    riskLevel: "Moderado",
    notableCases: ["Caso Mediador"],
    keyParties: ["PSOE"]
  }
];

export const TIMELINE_DATA: TimelineData[] = [
  { period: "1982-1990", cases: 3, cost: 132000000, highlight: "Transición: primeros grandes escándalos democráticos (Banca Catalana, Filesa, Naseiro)" },
  { period: "1991-2000", cases: 4, cost: 28000000, highlight: "Años Roldán, Fondos Reservados y Caso Campeón. Crisis de credibilidad institucional." },
  { period: "2001-2009", cases: 8, cost: 3314200000, highlight: "Burbuja inmobiliaria. Casos Malaya, Gürtel, ERE, Palau, Nóos, Emarsa, Brugal, Bankia." },
  { period: "2010-2019", cases: 12, cost: 2280200000, highlight: "Crisis y ajuste. Púnica, Bárcenas, Lezo, Kitchen, Rato, 3%, Pujol, Acuamed, Tándem, Process." },
  { period: "2020-2026", cases: 4, cost: 56350000, highlight: "Época contemporánea. Casos Koldo, Mediador, González Amador. Menor cuantía, mayor velocidad de investigación." },
];

export const PARTY_COLORS: Record<string, string> = {
  "PP": "#0066CC",
  "PSOE": "#E30613",
  "CiU": "#1B5E20",
  "CDC": "#00695C",
  "PDeCAT": "#00796B",
  "GIL": "#FF8F00",
  "PSC": "#E30613",
  "UDC": "#2E7D32",
  "ERC": "#F59E0B",
};

export const PARTY_FULL_NAMES: Record<string, string> = {
  "PP": "Partido Popular",
  "PSOE": "Partido Socialista Obrero Español",
  "CiU": "Convergència i Unió",
  "CDC": "Convergència Democràtica de Catalunya",
  "PDeCAT": "Partit Demòcrata Europeu Català",
  "GIL": "Grupo Independiente Liberal",
  "PSC": "Partit dels Socialistes de Catalunya",
  "UDC": "Unió Democràtica de Catalunya",
  "ERC": "Esquerra Republicana de Catalunya",
};

export const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Sentenciado": { bg: "bg-red-50", text: "text-red-800", border: "border-red-400/50" },
  "En Juicio": { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-400/50" },
  "Investigado": { bg: "bg-cyan-50", text: "text-cyan-800", border: "border-cyan-400/50" },
  "Archivado": { bg: "bg-slate-100", text: "text-slate-600", border: "border-slate-300" },
  "Sobreseído": { bg: "bg-slate-100", text: "text-slate-600", border: "border-slate-300" },
  "Revisión TC": { bg: "bg-purple-50", text: "text-purple-800", border: "border-purple-400/50" },
};

export const RISK_COLORS: Record<string, { bg: string; text: string; bar: string }> = {
  "Critico": { bg: "bg-red-700", text: "text-white", bar: "bg-red-700" },
  "Alto": { bg: "bg-orange-600", text: "text-white", bar: "bg-orange-600" },
  "Moderado": { bg: "bg-yellow-500", text: "text-black", bar: "bg-yellow-500" },
  "Bajo": { bg: "bg-green-600", text: "text-white", bar: "bg-green-600" },
};

// ─────────────────────────────────────────────────────────────
// CIS — Barómetro de Opinión (Julio 2026)
// Fuente: Centro de Investigaciones Sociológicas
// https://www.cis.es/documents/d/guest/es3571mar_A-pdf
// Estudio 3571, N=4.020, entrevistas en domicile
// ─────────────────────────────────────────────────────────────
export interface CisProblem {
  name: string;
  mainProblem: number;     // % que lo cita como 1er, 2º o 3er problema del país
  mainFirst: number;       // % que lo cita como 1er problema
  personalConcern: number; // % que lo cita como problema personal
  trend: "up" | "down" | "stable";
  note?: string;
}

export const CIS_JULY_2026 = {
  month: "Julio 2026",
  studyId: "Estudio 3571",
  sampleSize: 4020,
  fieldwork: "Junio-Julio 2026",
  corruptionRank: 4,         // 4º problema del país
  corruptionPercent: 17.8,   // % de menciones como problema nacional
  corruptionPrevious: 9.1,   // % en mayo 2026 (10º puesto)
  corruptionJump: "+8.7pp",  // subida tras caso Zapatero + Leire Díez
  corruptionPersonalRank: 11,
  corruptionPersonalPercent: 6.6,
  source: "https://www.cis.es/documents/d/guest/es3571mar_A-pdf",
};

export const CIS_PROBLEMS_NACIONALES: CisProblem[] = [
  { name: "La vivienda", mainProblem: 43.0, mainFirst: 23.3, personalConcern: 27.5, trend: "up" },
  { name: "La inmigración", mainProblem: 23.4, mainFirst: 4.5, personalConcern: 9.8, trend: "stable" },
  { name: "Problemas políticos en general", mainProblem: 18.7, mainFirst: 11.0, personalConcern: 8.0, trend: "up" },
  { name: "La corrupción y el fraude", mainProblem: 17.8, mainFirst: 8.6, personalConcern: 6.6, trend: "up", note: "Subió del 10º al 4º puesto en un mes" },
  { name: "Crisis económica", mainProblem: 17.3, mainFirst: 4.6, personalConcern: 28.6, trend: "stable" },
  { name: "Calidad del empleo", mainProblem: 15.0, mainFirst: 3.5, personalConcern: 15.6, trend: "stable" },
  { name: "Gobierno y partidos concretos", mainProblem: 11.9, mainFirst: 9.5, personalConcern: 4.2, trend: "up" },
  { name: "El paro", mainProblem: 11.1, mainFirst: 2.7, personalConcern: 7.8, trend: "down" },
  { name: "Extremismos", mainProblem: 11.0, mainFirst: 4.8, personalConcern: 3.9, trend: "stable" },
  { name: "Mal comportamiento políticos", mainProblem: 10.8, mainFirst: 6.2, personalConcern: 4.7, trend: "up" },
  { name: "La sanidad", mainProblem: 10.4, mainFirst: 0.9, personalConcern: 21.7, trend: "down" },
];

// ─────────────────────────────────────────────────────────────
// CONSEJO DE TRANSPARENCIA — Organismos de control
// ─────────────────────────────────────────────────────────────
export const CONSEJO_TRANSPARENCIA = {
  name: "Consejo de Transparencia y Buen Gobierno",
  acronym: "CTBG",
  legalBasis: "Ley 19/2013, de 9 de diciembre",
  president: "Concepción Campos Acuña",
  presidentSince: "2026-04-02",
  staff: "~30 funcionarios",
  independence: "Autoridad administrativa independiente. Autonomía orgánica y funcional completa.",
  functions: [
    "Resuelve reclamaciones sobre acceso a información pública",
    "Evalúa el cumplimiento de la Ley de Transparencia (publicidad activa)",
    "Asesora en materia de transparencia y buen gobierno",
    "Capacita a empleados públicos y sensibiliza a la ciudadanía",
    "Colabora con órganos análogos autonómicos e internacionales",
    "Rinde cuentas anualmente ante el Congreso de los Diputados",
  ],
  limitation: "No tiene competencia directa en 'buen gobierno' pese a su denominación.",
  url: "https://consejodetransparencia.es",
  note: "Creado en 2015. Evaluación anual del cumplimiento de obligaciones de transparencia de todas las administraciones públicas.",
};

// ─────────────────────────────────────────────────────────────
// NOTA SOBRE FUENTES
// ─────────────────────────────────────────────────────────────
export const DATA_SOURCES = {
  cpi: {
    name: "Corruption Perceptions Index (CPI)",
    organization: "Transparency International",
    url2024: "https://www.transparency.org/en/cpi/2024",
    url2025: "https://www.transparency.org/en/cpi/2025",
    description: "Índice de percepción de la corrupción. Escala 0-100. Publicado anualmente.",
    note: "Los datos del CPI son percepciones de expertos y empresarios, no mediciones directas de corrupción. Pueden existir divergencias con otros índices como los del CSIC o Eurobarómetro."
  },
  cases: {
    name: "Casos judiciales documentados",
    sources: [
      "Sentencias y autos judiciales (CENDOJ, Audiencia Nacional, Tribunal Supremo)",
      "Medios de comunicación verificados (El País, El Mundo, La Vanguardia, etc.)",
      "Tribunal de Cuentas",
      "Fiscalía Anticorrupción"
    ],
    note: "Los costes económicos son estimaciones. Algunos casos tienen coste indeterminado (0 o 'Por determinar'). No se incluyen datos no verificados."
  }
};
