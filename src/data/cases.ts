import { CorruptionCase } from "../types";

export const CASES: CorruptionCase[] = [
  {
    id: "banca-catalana",
    name: "Caso Banca Catalana",
    year: 1982,
    period: "Transición (1975-1995)",
    description: "Escándalo financiero de la España democrática. Se acusó a los directivos de Banca Catalana, entre ellos al presidente de la Generalitat Jordi Pujol, de crear una caja B y repartir dividendos falsos que descapitalizaron la entidad, provocando su intervención por el Banco de España con coste para el contribuyente.",
    parties: ["CiU"],
    amountEstimated: 120000000,
    amountDisplay: "120M€ (pasivo ficticio)",
    regions: ["Cataluña"],
    status: "Sobreseído",
    keyFigures: ["Jordi Pujol i Soley", "Francesc Cabana"],
    consequences: "Sobreseimiento de Jordi Pujol por la Audiencia de Barcelona en 1986 en un pleno de magistrados (33 a favor, 8 en contra). Marcó el debate geopolítico catalán sobre la investigación como 'ataque centralista'.",
    sources: ["Audiencia de Barcelona", "Banco de España"],
    corruptionTypes: ["Malversación", "Falsedad documental", "Blanqueo de capitales"],
    openSources: [
      { title: "El sumario histórico de Banca Catalana", entity: "El País" },
      { title: "Intervención de Banca Catalana por el Banco de España", entity: "Archivo del Banco de España" }
    ],
    implicatedCount: 18
  },
  {
    id: "filesa",
    name: "Caso Filesa",
    year: 1991,
    period: "Transición (1975-1995)",
    description: "Trama de financiación ilegal del PSOE a través de empresas pantalla (Filesa, Malesa, Time-Export) que cobraban informes inexistentes a bancos y multinacionales para sufragar campañas electorales.",
    parties: ["PSOE"],
    amountEstimated: 7200000,
    amountDisplay: "7.2M€",
    regions: ["Nacional"],
    status: "Sentenciado",
    keyFigures: ["Guillermo Galeote", "Carlos Navarro", "Josep Maria Sala"],
    consequences: "Primera condena del Tribunal Supremo (1997) que acreditó judicialmente la financiación ilegal de un partido político en democracia. Condenas de prisión a 8 encausados.",
    sources: ["Tribunal Supremo", "Congreso de los Diputados"],
    corruptionTypes: ["Financiación ilegal", "Falsedad documental"],
    openSources: [
      { title: "Sentencia del Tribunal Supremo: Caso Filesa", entity: "CENDOJ (Poder Judicial)", url: "https://www.poderjudicial.es" },
      { title: "Informe parlamentario sobre financiación de partidos", entity: "Congreso de los Diputados", url: "https://www.congreso.es" }
    ],
    implicatedCount: 12
  },
  {
    id: "naseiro",
    name: "Caso Naseiro",
    year: 1989,
    period: "Transición (1975-1995)",
    description: "Investigación sobre presunta financiación ilegal del PP y cobro de comisiones a cambio de adjudicaciones de obras municipales. Las grabaciones telefónicas fueron anuladas por defectos de procedimiento.",
    parties: ["PP"],
    amountEstimated: 0,
    amountDisplay: "Desconocido",
    regions: ["Comunidad Valenciana", "Nacional"],
    status: "Archivado",
    keyFigures: ["Rosendo Naseiro", "Salvador Palop"],
    consequences: "Archivo del caso por el Tribunal Supremo en 1992 al considerar que las grabaciones telefónicas principales se obtuvieron sin la motivación judicial adecuada.",
    sources: ["Tribunal Supremo"],
    corruptionTypes: ["Financiación ilegal", "Cohecho"],
    openSources: [
      { title: "Auto del Tribunal Supremo de 1992", entity: "Archivo histórico parlamentario" }
    ],
    implicatedCount: 4
  },
  {
    id: "fondos-reservados",
    name: "Caso Fondos Reservados",
    year: 1994,
    period: "Transición (1975-1995)",
    description: "Desvío sistemático de fondos reservados del Ministerio del Interior destinados a la lucha antiterrorista e inteligencia para el enriquecimiento personal de altos cargos y el pago de sobresueldos.",
    parties: ["PSOE"],
    amountEstimated: 5000000,
    amountDisplay: "5M€",
    regions: ["Nacional"],
    status: "Sentenciado",
    keyFigures: ["José Barrionuevo", "Rafael Vera", "José María Rodríguez Colorado"],
    consequences: "Condena de prisión para el exministro José Barrionuevo y el exsecretario de Seguridad Rafael Vera en 2001.",
    sources: ["Tribunal Supremo", "Diario de Sesiones del Congreso"],
    corruptionTypes: ["Malversación", "Cohecho"],
    openSources: [
      { title: "Sentencia del Tribunal Supremo", entity: "Tribunal Supremo" },
      { title: "Diario de Sesiones del Congreso", entity: "Congreso de los Diputados" }
    ],
    implicatedCount: 5
  },
  {
    id: "roldan",
    name: "Caso Roldán",
    year: 1993,
    period: "Transición (1975-1995)",
    description: "Malversación de fondos públicos, cohecho y fraude fiscal por Luis Roldán, Director General de la Guardia Civil. Se apropió de fondos reservados y cobró comisiones de obras de cuarteles, dándose a la fuga.",
    parties: ["PSOE"],
    amountEstimated: 10000000,
    amountDisplay: "10M€",
    regions: ["Nacional"],
    status: "Sentenciado",
    keyFigures: ["Luis Roldán", "Francisco Paesa", "Antonio Asunción"],
    consequences: "Capturado en Laos en 1995. Condenado a 31 años de prisión por malversación, cohecho, estafa y fraude fiscal. Dimisión del ministro del Interior Antonio Asunción.",
    sources: ["Tribunal Supremo", "Audiencia de Madrid"],
    corruptionTypes: ["Malversación", "Cohecho", "Blanqueo de capitales", "Falsedad documental"],
    openSources: [
      { title: "Sentencia del Caso Roldán", entity: "Tribunal Supremo" },
      { title: "El rastro de los fondos reservados en Suiza", entity: "Fiscalía de Ginebra" }
    ],
    implicatedCount: 6
  },
  {
    id: "malaya",
    name: "Caso Malaya",
    year: 2006,
    period: "Burbuja Inmobiliaria (1996-2007)",
    description: "La mayor trama de corrupción urbanística de España. Centrada en el Ayuntamiento de Marbella, el asesor de urbanismo Juan Antonio Roca controlaba la corporación mediante sobornos masivos para modificar planos de ordenación urbana.",
    parties: ["GIL"],
    amountEstimated: 2400000000,
    amountDisplay: "2.400M€ (estimado en fraude y patrimonio confiscado)",
    regions: ["Andalucía"],
    status: "Sentenciado",
    keyFigures: ["Juan Antonio Roca", "Marisol Yagüe", "Julián Muñoz", "Isabel Pantoja"],
    consequences: "Disolución histórica del Ayuntamiento de Marbella por el Consejo de Ministros (medida inédita en democracia). Condenas de hasta 11 años de prisión a Juan Antonio Roca.",
    sources: ["Audiencia de Málaga", "Tribunal Supremo", "BOE"],
    corruptionTypes: ["Cohecho", "Prevaricación", "Blanqueo de capitales", "Fraude en contratación pública"],
    openSources: [
      { title: "Disolución del Ayuntamiento de Marbella", entity: "Boletín Oficial del Estado", url: "https://www.boe.es" },
      { title: "Sentencia Caso Malaya", entity: "Tribunal Superior de Justicia de Andalucía" }
    ],
    implicatedCount: 95
  },
  {
    id: "gurtel",
    name: "Caso Gürtel",
    year: 2009,
    period: "Burbuja Inmobiliaria (1996-2007)",
    description: "La estructura de corrupción más ramificada de la historia de España. Francisco Correa vertebró una red de empresas que obtenían adjudicaciones públicas a cambio de sobornos y financiación irregular del PP.",
    parties: ["PP"],
    amountEstimated: 123500000,
    amountDisplay: "123.5M€ (impacto fiscal y malversaciones)",
    regions: ["Nacional", "Comunidad de Madrid", "Comunidad Valenciana", "Castilla y León"],
    status: "Sentenciado",
    keyFigures: ["Francisco Correa", "Luis Bárcenas", "Pablo Crespo", "Álvaro Pérez 'El Bigotes'"],
    consequences: "Condenas de hasta 51 años a Francisco Correa y 33 a Luis Bárcenas. Responsabilidad civil del PP. Primera moción de censura victoriosa en la historia de España (junio 2018).",
    sources: ["Audiencia Nacional", "Tribunal Supremo"],
    corruptionTypes: ["Cohecho", "Malversación", "Blanqueo de capitales", "Fraude en contratación pública", "Financiación ilegal"],
    openSources: [
      { title: "Sentencia Época I Caso Gürtel", entity: "Audiencia Nacional - Sala de lo Penal" },
      { title: "Diario de sesiones de la moción de censura de 2018", entity: "Congreso de los Diputados" }
    ],
    implicatedCount: 180
  },
  {
    id: "palau",
    name: "Caso Palau de la Música",
    year: 2009,
    period: "Burbuja Inmobiliaria (1996-2007)",
    description: "Saqueo de las cuentas del Palau de la Música Catalana por sus gestores. Se utilizaba como puente para canalizar comisiones del 4% de Ferrovial hacia CDC a cambio de adjudicaciones de obra civil.",
    parties: ["CDC"],
    amountEstimated: 26000000,
    amountDisplay: "26M€ (saqueados + comisiones)",
    regions: ["Cataluña"],
    status: "Sentenciado",
    keyFigures: ["Félix Millet", "Jordi Montull", "Daniel Osàcar (Tesorero CDC)"],
    consequences: "Sentencia del Tribunal Supremo de 2020: decomiso de 6.6 millones de euros a CDC. Prisión para Félix Millet y el extesorero Daniel Osàcar.",
    sources: ["Tribunal Supremo", "Sindicatura de Comptes"],
    corruptionTypes: ["Malversación", "Financiación ilegal", "Blanqueo de capitales", "Cohecho"],
    openSources: [
      { title: "Sentencia firme de decomiso a CDC", entity: "Tribunal Supremo" },
      { title: "Libro de cuentas intervenido del Palau de la Música", entity: "Sindicatura de Comptes" }
    ],
    implicatedCount: 15
  },
  {
    id: "noos",
    name: "Caso Nóos",
    year: 2010,
    period: "Burbuja Inmobiliaria (1996-2007)",
    description: "Desvío de fondos públicos de Baleares y la Comunidad Valenciana hacia el Instituto Nóos, presidido por Iñaki Urdangarin (yerno del Rey Juan Carlos I), que cobraba tarifas desorbitadas por congresos deportivos ficticios o inflados.",
    parties: ["PP"],
    amountEstimated: 6200000,
    amountDisplay: "6.2M€",
    regions: ["Islas Baleares", "Comunidad Valenciana", "Madrid"],
    status: "Sentenciado",
    keyFigures: ["Iñaki Urdangarin", "Diego Torres", "Infanta Cristina", "Jaume Matas"],
    consequences: "Condena a prisión para Urdangarin (5 años y 10 meses) y Diego Torres. La Infanta Cristina absuelta penalmente pero obligada a pagar responsabilidad civil.",
    sources: ["Audiencia de Palma", "Tribunal Supremo"],
    corruptionTypes: ["Malversación", "Cohecho", "Fraude en contratación pública", "Tráfico de influencias"],
    openSources: [
      { title: "Sentencia Audiencia de Palma 2017", entity: "Tribunal Superior de Justicia de Baleares" },
      { title: "Sentencia confirmatoria del Tribunal Supremo 2018", entity: "Tribunal Supremo" }
    ],
    implicatedCount: 8
  },
  {
    id: "ere-andalucia",
    name: "Caso ERE de Andalucía",
    year: 2011,
    period: "Burbuja Inmobiliaria (1996-2007)",
    description: "Sistema de ayudas sociolaborales paralelo y opaco ('fondo de reptiles') de la Junta de Andalucía. Se concedieron ayudas de manera directa y discrecional, eludiendo controles de fiscalización, beneficiando a intrusos.",
    parties: ["PSOE"],
    amountEstimated: 680000000,
    amountDisplay: "680M€ (fondo afectado)",
    regions: ["Andalucía"],
    status: "Sentenciado",
    keyFigures: ["Manuel Chaves", "José Antonio Griñán", "Magdalena Álvarez"],
    consequences: "Condena de Griñán por malversación (prisión) y Chaves por prevaricación (inhabilitación). El Tribunal Constitucional anuló parcialmente las condenas en 2024 por falta de motivación suficiente.",
    sources: ["Audiencia de Sevilla", "Tribunal Supremo", "Tribunal Constitucional"],
    corruptionTypes: ["Malversación", "Prevaricación", "Falsedad documental", "Fraude en contratación pública"],
    openSources: [
      { title: "Sentencia pieza política ERE autonómicos", entity: "Tribunal Supremo" },
      { title: "Informes de fiscalización del Tribunal de Cuentas de Andalucía", entity: "Cámara de Cuentas de Andalucía" }
    ],
    implicatedCount: 22
  },
  {
    id: "barcenas",
    name: "Caso Bárcenas / Caja B",
    year: 2013,
    period: "Burbuja Inmobiliaria (1996-2007)",
    description: "Emanado del Caso Gürtel. Se constató una contabilidad extracontable ('los papeles de Bárcenas') con donaciones clandestinas de empresas adjudicatarias destinadas a sobresueldos a líderes del partido y reforma de sedes.",
    parties: ["PP"],
    amountEstimated: 8400000,
    amountDisplay: "8.4M€ (contabilidad paralela constatada)",
    regions: ["Nacional"],
    status: "Sentenciado",
    keyFigures: ["Luis Bárcenas", "Álvaro Lapuerta", "Ángel Acebes"],
    consequences: "Sentencia de la Audiencia Nacional (2021): PP dispuso de caja B con aportaciones opacas. Bárcenas condenado a 2 años adicionales de prisión.",
    sources: ["Audiencia Nacional", "El País (Especial Documental)"],
    corruptionTypes: ["Financiación ilegal", "Cohecho", "Falsedad documental", "Tráfico de influencias"],
    openSources: [
      { title: "La contabilidad paralela manuscrita ('Papeles de Bárcenas')", entity: "El País" },
      { title: "Dictamen sobre la reforma de la sede de Génova", entity: "Audiencia Nacional" }
    ],
    implicatedCount: 10
  },
  {
    id: "punica",
    name: "Caso Púnica",
    year: 2014,
    period: "Crisis y Ajuste (2008-2018)",
    description: "Trama clientelar radicada en municipios de Madrid, Murcia y Valencia. Amañaban concesiones de suelo público, planes de vivienda y contratos marco de eficiencia energética a cambio de comisiones del 3% ocultas en Suiza.",
    parties: ["PP"],
    amountEstimated: 250000000,
    amountDisplay: "250M€ (contratos bajo sospecha)",
    regions: ["Comunidad de Madrid", "Región de Murcia", "Comunidad Valenciana"],
    status: "En Juicio",
    keyFigures: ["Francisco Granados", "David Marjaliza"],
    consequences: "Encarcelamiento preventivo de Francisco Granados (exconsejero de Presidencia de Madrid). Dimisiones de alcaldes y altos cargos regionales.",
    sources: ["Audiencia Nacional - Juzgado Central Nº6", "Oficina Federal de Justicia de Suiza"],
    corruptionTypes: ["Cohecho", "Tráfico de influencias", "Blanqueo de capitales", "Fraude en contratación pública"],
    openSources: [
      { title: "Autos de procesamiento del Caso Púnica", entity: "Juzgado Central de Instrucción Nº6 (Audiencia Nacional)" },
      { title: "Cuentas bancarias de Suiza bloqueadas por blanqueo", entity: "Oficina Federal de Justicia Helvética" }
    ],
    implicatedCount: 60
  },
  {
    id: "tres-por-ciento",
    name: "Caso 3%",
    year: 2015,
    period: "Crisis y Ajuste (2008-2018)",
    description: "Investigación sobre el cobro sistemático de comisiones del 3% por parte de CDC a constructoras a cambio de la adjudicación de grandes obras de infraestructura de la Generalitat de Cataluña.",
    parties: ["CDC", "PDeCAT"],
    amountEstimated: 15000000,
    amountDisplay: "15M€",
    regions: ["Cataluña"],
    status: "En Juicio",
    keyFigures: ["Andreu Viloca", "Germà Gordó"],
    consequences: "Embargo de sedes partidistas. Desaparición formal de la marca CDC y refundación del espacio político independentista liberal.",
    sources: ["Audiencia Nacional", "UDEF"],
    corruptionTypes: ["Cohecho", "Fraude en contratación pública", "Financiación ilegal"],
    openSources: [
      { title: "Instrucción Juzgado Central Audiencia Nacional", entity: "Audiencia Nacional" },
      { title: "Informes UDEF", entity: "Unidad de Delincuencia Económica y Fiscal" }
    ],
    implicatedCount: 8
  },
  {
    id: "pujol",
    name: "Caso Pujol (Clan Pujol)",
    year: 2014,
    period: "Crisis y Ajuste (2008-2018)",
    description: "Investigación sobre el origen de la fortuna millonaria oculta en el extranjero (Andorra, Suiza, Liechtenstein) por la familia del expresidente catalán Jordi Pujol. Apunta al cobro sistemático de comisiones ilícitas por adjudicaciones públicas durante décadas.",
    parties: ["CDC"],
    amountEstimated: 290000000,
    amountDisplay: "290M€ (bajo sospecha fiduciaria)",
    regions: ["Cataluña", "Andorra"],
    status: "En Juicio",
    keyFigures: ["Jordi Pujol i Soley", "Marta Ferrusola", "Jordi Pujol Ferrusola"],
    consequences: "Confesión pública del fraude en julio de 2014. Retirada del trato protocolario de expresidente. Procesamiento de toda la familia por organización criminal, blanqueo y delito fiscal.",
    sources: ["Audiencia Nacional - Juzgado Central Nº5", "UDEF", "Parlament de Catalunya"],
    corruptionTypes: ["Organización criminal", "Blanqueo de capitales", "Delito fiscal", "Cohecho"],
    openSources: [
      { title: "Instrucción Juzgado Central de Instrucción Nº5", entity: "Audiencia Nacional" },
      { title: "Informes UDEF", entity: "Unidad de Delincuencia Económica y Fiscal" },
      { title: "Comisión de Investigación sobre el Fraude", entity: "Parlament de Catalunya" }
    ],
    implicatedCount: 12
  },
  {
    id: "lezo",
    name: "Caso Lezo",
    year: 2017,
    period: "Crisis y Ajuste (2008-2018)",
    description: "Desvío de fondos de la empresa pública madrileña de aguas Canal de Isabel II mediante la compra fraudulenta de filiales en Sudamérica con sobrecostes desorbitados que terminaban en paraísos fiscales.",
    parties: ["PP"],
    amountEstimated: 23000000,
    amountDisplay: "23M€ (desviados)",
    regions: ["Comunidad de Madrid", "Internacional"],
    status: "Sentenciado",
    keyFigures: ["Ignacio González", "Edmundo Rodríguez Sobrino"],
    consequences: "Detención e ingreso en prisión preventiva del expresidente de la Comunidad de Madrid Ignacio González.",
    sources: ["Audiencia Nacional - Juzgado de Instrucción 6"],
    corruptionTypes: ["Malversación", "Blanqueo de capitales", "Organización criminal"],
    openSources: [
      { title: "Sumario Caso Lezo", entity: "Audiencia Nacional" }
    ],
    implicatedCount: 8
  },
  {
    id: "kitchen",
    name: "Caso Kitchen",
    year: 2018,
    period: "Crisis y Ajuste (2008-2018)",
    description: "Utilización ilegal de fondos reservados e infraestructura del Ministerio del Interior ('Policía Patriótica') sin control judicial para espiar al extesorero del PP Luis Bárcenas, sustrayéndole documentación comprometedora.",
    parties: ["PP"],
    amountEstimated: 1200000,
    amountDisplay: "1.2M€ (fondos policiales)",
    regions: ["Nacional"],
    status: "En Juicio",
    keyFigures: ["Jorge Fernández Díaz", "Francisco Martínez", "José Manuel Villarejo"],
    consequences: "Procesamiento del exministro del Interior Jorge Fernández Díaz, su secretario de Estado y la cúpula policial por obstrucción a la justicia y desvío de fondos.",
    sources: ["Audiencia Nacional", "Congreso de los Diputados"],
    corruptionTypes: ["Malversación", "Tráfico de influencias", "Organización criminal"],
    openSources: [
      { title: "Auto de apertura de juicio oral", entity: "Audiencia Nacional" },
      { title: "Informes del Congreso de los Diputados", entity: "Congreso de los Diputados" }
    ],
    implicatedCount: 6
  },
  {
    id: "rato-tarjetas",
    name: "Caso Rato / Tarjetas Black",
    year: 2014,
    period: "Crisis y Ajuste (2008-2018)",
    description: "Uso sistemático de tarjetas de crédito corporativas opacas ('tarjetas black') para gastos personales por parte de consejeros y directivos de Caja Madrid y Bankia. Procesamiento de Rodrigo Rato por delitos fiscales y blanqueo.",
    parties: ["PP"],
    amountEstimated: 12500000,
    amountDisplay: "12.5M€ (tarjetas black)",
    regions: ["Comunidad de Madrid", "Nacional"],
    status: "Sentenciado",
    keyFigures: ["Rodrigo Rato", "Miguel Blesa"],
    consequences: "Condena firme del Tribunal Supremo en 2018: 4 años y 6 meses de prisión para Rodrigo Rato por apropiación indebida. Ingresó en prisión de Soto del Real.",
    sources: ["Tribunal Supremo", "Banco de España"],
    corruptionTypes: ["Apropiación indebida", "Delito fiscal", "Blanqueo de capitales"],
    openSources: [
      { title: "Sentencia del Tribunal Supremo 2018", entity: "Tribunal Supremo" },
      { title: "Informes del Banco de España", entity: "Banco de España" }
    ],
    implicatedCount: 65
  },
  {
    id: "mediador",
    name: "Caso Mediador",
    year: 2023,
    period: "Época Contemporánea (2019-Presente)",
    description: "Red criminal liderada por un mediador, un general de la Guardia Civil y un diputado socialista de Canarias que exigía mordidas a empresarios de ganadería a cambio de evitar inspecciones sanitarias o agilizar subvenciones europeas.",
    parties: ["PSOE"],
    amountEstimated: 2000000,
    amountDisplay: "2M€ (bajo sospecha)",
    regions: ["Canarias", "Nacional"],
    status: "Investigado",
    keyFigures: ["Juan Bernardo Fuentes Curbelo 'Tito Berni'", "Marco Antonio Navarro Tacoronte", "Francisco Espinosa Navas"],
    consequences: "Expulsión fulminante del diputado Fuentes Curbelo. Detención del General de División retirado Espinosa Navas. Agitación de las campañas electorales de 2023.",
    sources: ["Juzgado de Instrucción Nº4 de Santa Cruz de Tenerife", "OLAF"],
    corruptionTypes: ["Cohecho", "Tráfico de influencias", "Fraude en contratación pública", "Blanqueo de capitales"],
    openSources: [
      { title: "Dossier del sumario judicial", entity: "Tribunal Superior de Justicia de Canarias" },
      { title: "Informes de control de ayudas europeas agrícolas", entity: "Oficina Antifraude Europea (OLAF)" }
    ],
    implicatedCount: 12
  },
  {
    id: "koldo",
    name: "Caso Koldo / Delorme",
    year: 2024,
    period: "Época Contemporánea (2019-Presente)",
    description: "Trama nacida al amparo de la compra de emergencia sanitaria por COVID-19. Se investiga si Koldo García, mano derecha del exministro José Luis Ábalos, influyó para adjudicar contratos masivos de material de protección a cambio de sobornos ocultos en sociedades interpuestas.",
    parties: ["PSOE"],
    amountEstimated: 54000000,
    amountDisplay: "54M€ (licitaciones obtenidas)",
    regions: ["Nacional", "Islas Baleares", "Canarias"],
    status: "Investigado",
    keyFigures: ["Koldo García Izaguirre", "José Luis Ábalos", "Víctor de Aldama"],
    consequences: "Expulsión del exministro Ábalos del grupo parlamentario socialista. Comisiones de investigación parlamentarias en Congreso y Senado. Instrucción activa en Audiencia Nacional.",
    sources: ["Audiencia Nacional - Juzgado de Instrucción 2", "Fiscalía Anticorrupción"],
    corruptionTypes: ["Cohecho", "Tráfico de influencias", "Blanqueo de capitales", "Fraude en contratación pública"],
    openSources: [
      { title: "Diligencias previas Caso Delorme", entity: "Audiencia Nacional" },
      { title: "Auditoría interna de adjudicaciones sanitarias", entity: "Ministerio de Transportes" }
    ],
    implicatedCount: 15
  },
  {
    id: "gonzalez-amador",
    name: "Caso González Amador",
    year: 2024,
    period: "Época Contemporánea (2019-Presente)",
    description: "Investigación por presunto fraude tributario y falsedad en facturas del novio de la presidenta de la Comunidad de Madrid, Ignacio González Amador. Se investiga la estructura societaria utilizada para ocultar ingresos.",
    parties: ["PP"],
    amountEstimated: 350000,
    amountDisplay: "350.000€ (fraude tributario)",
    regions: ["Comunidad de Madrid"],
    status: "Investigado",
    keyFigures: ["Ignacio González Amador"],
    consequences: "Investigación abierta por el Juzgado de Badajoz. Requerimiento de informes fiscales sobre residencia e ingresos.",
    sources: ["Juzgado de Badajoz"],
    corruptionTypes: ["Delito fiscal", "Falsedad documental"],
    openSources: [
      { title: "Investigación fraude tributario", entity: "El Mundo" }
    ],
    implicatedCount: 1
  }
];
