# WAYAHEAD - Corrupcion Espana (frontend editorial)

Frontend editorial de la plataforma de seguimiento de corrupcion en Espana.
Consume la API real del backend observatorio-ciudadano (/api/ detras de nginx).

## Estado actual (sesion 2026-07-17)

### Hecho
- Diseno editorial (estilo periodico: serif titulares, acentos rojo/negro, fondo crema).
- Datos reales: dashboard alimentado por GET /api/cases (52 casos) via src/data/apiCases.ts.
- Derivaciones: groupByCCAA (riskLevel Alto/Moderado/Bajo) y groupByPeriodTimeline
  en src/utils/calculators.ts (cronologia desde la Transicion).
- Tabs: Resumen, Partidos, Analisis (placeholder), Cronologia, En vivo / Hoy, Caso.
- Tab "En vivo / Hoy": feed cronologico LiveFeed.tsx + panel de editor AddUpdateForm.tsx
  (solo admin, POST /api/admin/case-updates con credentials include).
- Login sin friccion: boton "Acceder" en header -> AuthModal.tsx (magic-link via Resend).
- Fix crash de RISK_COLORS: claves Alto/Moderado/Bajo.
- Repo GitHub: https://github.com/mcasrom/corrupcion-espana (main).

### Arquitectura de despliegue
- PM2 puerto 3015 -> nginx / -> 3015 ; /api/ -> 3016 (backend).
- Rebuild: npm run build (dist/server.cjs) ; pm2 restart corrupcion.

## Sprints pendientes

### S3 - UI de moderacion / comentarios
- Anadir seccion de comentarios por caso consumiendo API del backend.
- Mostrar estado de moderacion (Groq) una vez implementado en backend.

### S5 - SEO/rendimiento
- robots.txt + sitemap.xml generados desde los 52 casos (slugs).
- Metadatos por caso en tab Caso (og:title, description, canonical).
- Lazy-load del dashboard para reducir peso inicial.

### Pulido editorial
- Tab Analisis real (hoy placeholder) con visualizaciones de tendencias.
- Buscador/filtro por CCAA, partido y periodo en el dashboard.
- Botones de compartir (X, WhatsApp, copiar enlace) por caso y por hecho.
- Badge de Editor fundador para mcasrom@gmail.com en la UI.

### Integracion
- Unificar a futuro en un solo repo con el backend (deploy unico).

## Notas
- No commitear secretos. El frontend no guarda credenciales, solo usa cookies de session.
- El usuario queda logueado tras clic en magic-link (backend redirige a APP_URL).
