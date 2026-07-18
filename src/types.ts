export type JudicialStatus =
  | "Sentenciado"
  | "En Juicio"
  | "Investigado"
  | "Archivado"
  | "Sobreseído"
  | "Revisión TC";

export type CorruptionType =
  | "Malversación"
  | "Cohecho"
  | "Prevaricación"
  | "Tráfico de influencias"
  | "Fraude en contratación pública"
  | "Financiación ilegal"
  | "Blanqueo de capitales"
  | "Falsedad documental"
  | "Apropiación indebida"
  | "Organización criminal"
  | "Delito fiscal"
  | "Desobediencia"
  | "Perversión de la justicia";

export interface CaseSource {
  title: string;
  entity: string;
  url?: string;
}

export interface CorruptionCase {
  id: string;
  slug?: string;
  name: string;
  year: number;
  period: string;
  description: string;
  parties: string[];
  amountEstimated: number;
  amountDisplay: string;
  regions: string[];
  status: JudicialStatus;
  keyFigures: string[];
  consequences: string;
  sources: string[];
  corruptionTypes: CorruptionType[];
  openSources: CaseSource[];
  implicatedCount: number;
}

export interface ControlOrganism {
  id: string;
  label: string;
  shortLabel: string;
  level: 1 | 2 | 3;
  type: "prevencion" | "fiscalizacion" | "judicial";
  role: string;
  legalVsFraud: string;
  trigger: string;
  example: string;
  connections: string[];
}

export interface DataSource {
  id: string;
  name: string;
  fullName: string;
  url: string;
  type: "judicial" | "administrative" | "legislative" | "european" | "police";
  description: string;
}

export interface GlobalKPIs {
  totalDesviado: number;
  totalCasos: number;
  casosSentenciados: number;
  investigacionesActivas: number;
  personasImplicadas: number;
  integridadIndex: number;
}

export interface OsintResult {
  query: string;
  timestamp: string;
  summary: string;
  integrityScore: number;
  detectedActors: string[];
  detectedParties: string[];
  keyTopics: string[];
  sources: Array<{ title: string; uri: string }>;
}

export interface CaseUpdateResult {
  caseId: string;
  caseName: string;
  timestamp: string;
  analysis: string;
  sources: Array<{ title: string; uri: string }>;
}
