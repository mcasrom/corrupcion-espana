# Observatorio de Corrupción en España

Dashboard interactivo con datos verificados de corrupción en España utilizando metodología OSINT y fuentes públicas oficiales.

**URL Producción**: https://corrupcion.viajeinteligencia.com  
**Puerto**: 3015  
**GitHub**: https://github.com/mcasrom/corrupcion-espana

## Estado Actual (v1.0.0)

✅ **Producción activa** - Desplegado en Hetzner  
✅ **GitHub sincronizado** - Último push: 2026-07-17  
✅ **PM2 estable** - 2 instancias, 0 reinicios  
✅ **SSL/HTTPS** - Certificado Let's Encrypt activo  
✅ **Cloudflare** - DNS proxy habilitado  

## Stack Tecnológico

- **Frontend**: React 19 + Vite + TypeScript + Tailwind CSS 4
- **Backend**: Express + Node.js 22
- **AI**: Google Gemini 2.0 Flash (para búsquedas OSINT)
- **Deploy**: Hetzner + PM2 + nginx + Let's Encrypt + Cloudflare

## Funcionalidades Implementadas

### ✅ Completado
- [x] **Dashboard Principal** - KPIs calculados desde datos reales
  - Total desviado estimado
  - Casos analizados
  - Personas implicadas
  - Índice de integridad (0-100)
- [x] **20 Casos Verificados** - Fusionados de ambos prototipos
  - Período: 1982-2024
  - Fuentes: CENDOJ, BOE, TCuentas, Audiencia Nacional
  - Sin datos inventados ni placeholders
- [x] **Cronología Visual** - Organizada por períodos históricos
  - Transición (1975-1995)
  - Burbuja Inmobiliaria (1996-2007)
  - Crisis y Ajuste (2008-2018)
  - Época Contemporánea (2019-Presente)
- [x] **Detalle de Caso** - Información completa por caso
  - Descripción, impacto económico, figuras clave
  - Tipos de corrupción, fuentes abiertas
  - Estado judicial real (Sentenciado, En Juicio, Investigado)
- [x] **Mapa de Organismos de Control** - 12 instituciones
  - Nivel Nacional, Intermedio, Local
  - Tipos: Prevención, Fiscalización, Judicial
  - Disparadores y ejemplos reales
- [x] **Terminal OSINT** - Búsqueda con Gemini AI
  - Consultas en lenguaje natural
  - Análisis de integridad
  - Detección de actores y partidos
- [x] **Metodología OSINT** - Documentación completa
  - 4 fases: Recolección, Verificación, Análisis, Cuantificación
  - Principios de transparencia
  - Fuentes de datos oficiales

### 🔧 Infraestructura
- [x] PM2 cluster mode (2 instancias)
- [x] nginx reverse proxy con SSL
- [x] Cloudflare DNS + proxy
- [x] GitHub repository privado
- [x] Build automático (Vite + esbuild)

## Estructura del Proyecto

```
corrupcion-espana/
├── server.ts              # Express + Gemini API endpoints
├── src/
│   ├── types.ts           # Interfaces TypeScript
│   ├── data/
│   │   ├── cases.ts       # 20 casos verificados
│   │   ├── organisms.ts   # 12 organismos de control
│   │   └── sources.ts     # Metodología OSINT + fuentes
│   ├── components/
│   │   ├── Dashboard.tsx  # KPIs y resumen
│   │   ├── Chronology.tsx # Línea de tiempo
│   │   ├── CaseDetail.tsx # Detalle por caso
│   │   ├── ControlMap.tsx # Mapa institucional
│   │   ├── OsintTerminal.tsx # Búsqueda AI
│   │   └── Methodology.tsx   # Metodología
│   ├── utils/
│   │   └── calculators.ts # Cálculos de KPIs
│   ├── App.tsx            # Layout principal
│   ├── main.tsx           # Entry point
│   └── index.css          # Estilos Tailwind
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Endpoints API

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/search` | POST | Búsqueda OSINT con Gemini |
| `/api/case-update` | POST | Actualización de caso |

## Datos Verificados

### Casos Incluidos (20)
1. Caso Banca Catalana (1982)
2. Caso Filesa (1991)
3. Caso Naseiro (1989)
4. Caso Fondos Reservados (1994)
5. Caso Roldán (1993)
6. Caso Malaya (2006)
7. Caso Gürtel (2009)
8. Caso Palau de la Música (2009)
9. Caso Nóos (2010)
10. Caso ERE de Andalucía (2011)
11. Caso Bárcenas / Caja B (2013)
12. Caso Púnica (2014)
13. Caso 3% (2015)
14. Caso Pujol (2014)
15. Caso Lezo (2017)
16. Caso Kitchen (2018)
17. Caso Rato / Tarjetas Black (2014)
18. Caso Mediador (2023)
19. Caso Koldo / Delorme (2024)
20. Caso González Amador (2024)

### Organismos de Control (12)
- Fiscalía Anticorrupción
- UDEF
- Tribunal de Cuentas
- OLAF
- Audiencia Nacional
- Y más...

## Fuentes de Datos

- **CENDOJ**: Centro de Documentación Judicial
- **BOE**: Boletín Oficial del Estado
- **TCu**: Tribunal de Cuentas
- **Fiscalía Anticorrupción**
- **UDEF**: Unidad de Delincuencia Económica
- **OLAF**: Oficina Antifraude Europea
- **Parlamentos autonómicos**

## Próximos Pasos (Roadmap)

Ver [TODO.md](./TODO.md) para el plan de desarrollo completo.

## Licencia

Proyecto privado - Viaje Inteligencia
