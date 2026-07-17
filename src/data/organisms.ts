import { ControlOrganism } from "../types";

export const ORGANISMS: ControlOrganism[] = [
  {
    id: "fiscalia-anticorrupcion",
    label: "Fiscalía Anticorrupción",
    shortLabel: "Fiscalía",
    level: 1,
    type: "judicial",
    role: "Policía judicial que dirige la investigación y acusa a los presuntos responsables.",
    legalVsFraud: "100%",
    trigger: "Denuncia, aviso policial o descubrimiento directo en un proceso judicial.",
    example: "Actuó en el Caso Púnica tras las escuchas policiales a Francisco Granados.",
    connections: ["tsj", "ciex", "ucdef"]
  },
  {
    id: "fiscalia-ue",
    label: "Fiscalía contra la Delincuencia Organizada y el Terrorismo (Fiscalía UE)",
    shortLabel: "Fiscalía UE",
    level: 1,
    type: "judicial",
    role: "Investiga crímenes transnacionales y cooperación con la Fiscalía Europea.",
    legalVsFraud: "70%",
    trigger: "Coordinación con autoridades de la UE o delitos con ramificaciones internacionales.",
    example: "Coordinó la investigación del Caso Roldán sobre cuentas en Ginebra.",
    connections: ["fiscalia-anticorrupcion", "olaf"]
  },
  {
    id: "ciex",
    label: "Centro de Inteligencia contra el Crimen Organizado (CICO)",
    shortLabel: "CICO",
    level: 1,
    type: "judicial",
    role: "Análisis de patrones de corrupción y detección temprana.",
    legalVsFraud: "40%",
    trigger: "Análisis estratégico y cooperación internacional.",
    example: "Señaló la trama de Púnica en 2013 mediante análisis de flujos financieros.",
    connections: ["ucdef", "fiscalia-anticorrupcion"]
  },
  {
    id: "ucdef",
    label: "Unidad de Delincuencia Económica y Fiscal (UDEF)",
    shortLabel: "UDEF",
    level: 2,
    type: "judicial",
    role: "Unidad policial especializada en delitos económicos y blanqueo de capitales.",
    legalVsFraud: "20%",
    trigger: "Orden judicial o alerta de operación sospechosa.",
    example: "Dirigió los registros en las sedes del Caso Lezo en la Comunidad de Madrid.",
    connections: ["fiscalia-anticorrupcion", "banco-de-españa"]
  },
  {
    id: "tsj",
    label: "Tribunal Superior de Justicia (TSJ)",
    shortLabel: "TSJ",
    level: 3,
    type: "judicial",
    role: "Tribunal que juzga delitos cometidos por autoridades autonómicas.",
    legalVsFraud: "100%",
    trigger: "Elevación del caso desde un juzgado de instrucción local.",
    example: "Juzgó el Caso Nóos en Palma de Mallorca.",
    connections: ["fiscalia-anticorrupcion", "auditoria-general-del-estado"]
  },
  {
    id: "auditoria-general-del-estate",
    label: "Auditoría General del Estado (AGE)",
    shortLabel: "AGE",
    level: 2,
    type: "fiscalizacion",
    role: "Verifica el cumplimiento legal y económico en la gestión de fondos públicos.",
    legalVsFraud: "30%",
    trigger: "Evaluación anual, petición parlamentaria o denuncia administrativa.",
    example: "Evaluó las partidas de los Fondos Reservados en el Ministerio del Interior.",
    connections: ["ciex", "tsj"]
  },
  {
    id: "tribunal-cuentas",
    label: "Tribunal de Cuentas",
    shortLabel: "TCuentas",
    level: 2,
    type: "fiscalizacion",
    role: "Control externo y censura de la actividad económica del Estado.",
    legalVsFraud: "50%",
    trigger: "Evaluación anual, petición parlamentaria o denuncia.",
    example: "Emitió informe sobre la contratación directa en los ERE de Andalucía.",
    connections: ["auditoria-general-del-estate", "fiscalia-anticorrupcion"]
  },
  {
    id: "olaf",
    label: "Oficina Antifraude Europea (OLAF)",
    shortLabel: "OLAF",
    level: 2,
    type: "fiscalizacion",
    role: "Investiga fraude contra el presupuesto europeo.",
    legalVsFraud: "60%",
    trigger: "Denuncia de autoridad nacional, auditoría o alerta institucional.",
    example: "Abrió investigación por irregularidades en ayudas agrarias del Caso Mediador.",
    connections: ["fiscalia-ue", "fiscalia-anticorrupcion"]
  },
  {
    id: "sindicatura-comptes",
    label: "Sindicatura de Comptes de Cataluña",
    shortLabel: "S. Comptes",
    level: 2,
    type: "fiscalizacion",
    role: "Control de la gestión económica de la Generalitat y sus entes instrumentales.",
    legalVsFraud: "35%",
    trigger: "Evaluación anual, denuncia o alerta de auditoría.",
    example: "Auditó las cuentas del Palau de la Música en 2008.",
    connections: ["tribunal-cuentas", "fiscalia-anticorrupcion"]
  },
  {
    id: "ciex-autonomico",
    label: "CIEX Autonómico (ej. UDEF Andalucía)",
    shortLabel: "CIEX Autonómico",
    level: 3,
    type: "prevencion",
    role: "Análisis preventivo y coordinación dentro de un territorio.",
    legalVsFraud: "25%",
    trigger: "Estrategia autonómica o cooperación interdepartamental.",
    example: "Detectó patrones de corrupción en contratos de saneamiento en Andalucía.",
    connections: ["ciex", "fiscalia-anticorrupcion"]
  },
  {
    id: "fiscalia-autonomica",
    label: "Fiscalía Autonómica (ej. Fiscalía de Andalucía)",
    shortLabel: "Fiscalía Autonómica",
    level: 3,
    type: "judicial",
    role: "Instrucción y acusación en delitos cometidos por autoridades regionales.",
    legalVsFraud: "80%",
    trigger: "Denuncia, aviso policial o descubrimiento directo.",
    example: "Coordinó la acusación en la pieza de los ERE autonómicos de Andalucía.",
    connections: ["fiscalia-anticorrupcion", "tsj"]
  },
  {
    id: "inspeccion-de-trabajo",
    label: "Inspección de Trabajo y Seguridad Social",
    shortLabel: "Inspección Trabajo",
    level: 3,
    type: "prevencion",
    role: "Vigilancia del cumplimiento de la normativa laboral y de la seguridad social.",
    legalVsFraud: "15%",
    trigger: "Inspección aleatoria, denuncia o coordinación con UDEF.",
    example: "Detectó contratos falsos en sociedades pantalla del Caso Mediator.",
    connections: ["fiscalia-anticorrupcion", "ucdef"]
  }
];
