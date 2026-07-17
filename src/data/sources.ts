import { DataSource } from "../types";

export const DATA_SOURCES: DataSource[] = [
  {
    id: "cendoj",
    name: "CENDOJ",
    fullName: "Centro de Documentación Judicial del Consejo General del Poder Judicial",
    url: "https://www.poderjudicial.es",
    type: "judicial",
    description: "Repositorio oficial de sentencias y resoluciones judiciales españolas."
  },
  {
    id: "boe",
    name: "BOE",
    fullName: "Boletín Oficial del Estado",
    url: "https://www.boe.es",
    type: "legislative",
    description: "Publicación oficial de leyes, decretos, nombramientos y actos públicos."
  },
  {
    id: "tcu",
    name: "TCu",
    fullName: "Tribunal de Cuentas",
    url: "https://www.tcu.es",
    type: "administrative",
    description: "Control externo y censura de la actividad económica del Estado."
  },
  {
    id: "udef",
    name: "UDEF",
    fullName: "Unidad de Delincuencia Económica y Fiscal",
    url: "#",
    type: "police",
    description: "Unidad policial especializada en investigación de delitos económicos."
  },
  {
    id: "congreso",
    name: "Congreso de los Diputados",
    fullName: "Congreso de los Diputados",
    url: "https://www.congreso.es",
    type: "legislative",
    description: "Cámara baja del Parlamento español. Registra debates, informes y comisiones."
  },
  {
    id: "senado",
    name: "Senado",
    fullName: "Senado de España",
    url: "https://www.senado.es",
    type: "legislative",
    description: "Cámara alta del Parlamento español. Recibe información de comisiones investigadoras."
  },
  {
    id: "olaf",
    name: "OLAF",
    fullName: "Oficina Antifraude Europea",
    url: "https://anti-fraud.europa.eu",
    type: "european",
    description: "Investiga fraude contra el presupuesto europeo y corrupción que afecta a la UE."
  },
  {
    id: "fiscalia-anticorrupcion",
    name: "Fiscalía Anticorrupción",
    fullName: "Fiscalía Anticorrupción",
    url: "#",
    type: "judicial",
    description: "Fiscalía especializada en investigación y acusación de delitos de corrupción."
  },
  {
    id: "audiencia-nacional",
    name: "Audiencia Nacional",
    fullName: "Audiencia Nacional",
    url: "#",
    type: "judicial",
    description: "Tribunal especializado en delitos de terrorismo, narcotráfico y crimen organizado."
  },
  {
    id: "parlament-catalunya",
    name: "Parlament de Catalunya",
    fullName: "Parlament de Catalunya",
    url: "https://www.parlament.cat",
    type: "legislative",
    description: "Parlamento autonómico de Cataluña. Registro de comisiones investigadoras."
  },
  {
    id: "sindicatura-comptes",
    name: "Sindicatura de Comptes",
    fullName: "Sindicatura de Comptes de Catalunya",
    url: "https://www.sindicatura.comptes.cat",
    type: "administrative",
    description: "Órgano de control externo de la Generalitat y sus entes instrumentales."
  },
  {
    id: "banco-de-espana",
    name: "Banco de España",
    fullName: "Banco de España",
    url: "https://www.bde.es",
    type: "administrative",
    description: "Banco central. Supervisa la estabilidad financiera y emite informes."
  }
];

export const OSINT_METHODOLOGY = {
  title: "Metodología OSINT aplicada a la investigación de corrupción",
  description: "Open Source Intelligence para la transparencia y rendición de cuentas en España",
  phases: [
    {
      name: "Recolección",
      description: "Recopilación de documentos públicos de entidades oficiales (CENDOJ, BOE, Informes del TCu, Audiencia Nacional, Fiscalía Anticorrupción)."
    },
    {
      name: "Verificación",
      description: "Cotejo cruzado de al menos tres fuentes independientes: sentencia + informe parlamentario + hemeroteca."
    },
    {
      name: "Análisis",
      description: "Análisis cronológico y de red de implicados. Relación entre partidos políticos, fechas de contratación y adjudicaciones."
    },
    {
      name: "Cuantificación",
      description: "Estimación de impacto económico basada en montantes sentenciados o demandados."
    }
  ],
  principles: [
    "No hay datos inventados. Todos los casos incluyen fuentes primarias o secundarias verificables.",
    "No se realizan valoraciones políticas. Se describe la conducta investigada y los hechos probados.",
    "Se prioriza el estado judicial real (Archivado, Sentenciado, En Juicio, Investigado, Revisión TC).",
    "Se evitan titulares sensacionalistas; se opta por lenguaje técnico-periodístico neutral."
  ]
};
