# TODO - Observatorio de Corrupción en España

## ✅ Completado (v1.0.0)
- [x] Estructura del proyecto (React + Vite + Express + Tailwind)
- [x] 20 casos verificados fusionados
- [x] 12 organismos de control
- [x] Dashboard con KPIs calculados
- [x] Cronología por períodos
- [x] Detalle de caso completo
- [x] Mapa institucional
- [x] Terminal OSINT con Gemini
- [x] Metodología OSINT documentada
- [x] Deploy en Hetzner (PM2 + nginx + SSL)
- [x] GitHub repository
- [x] Landing page actualizado (8 servicios)

## 🔧 Mejoras Pendientes

### Prioridad Alta
- [ ] **Filtros avanzados** - Por partido, año, región, estado judicial
- [ ] **Búsqueda local** - Filtro de texto en el dashboard
- [ ] **Exportar datos** - CSV/PDF de casos y KPIs
- [ ] **Gráficas interactivas** - Evolución temporal, por partido, por región

### Prioridad Media
- [ ] **Casos nuevos** - Pipeline para agregar casos automáticamente
- [ ] **Alertas** - Notificaciones de cambios en estado judicial
- [ ] **Comparador** - Comparar dos casos lado a lado
- [ ] **Mapa geográfico** - Visualización en mapa de España

### Prioridad Baja
- [ ] **Modo oscuro/claro** - Toggle de temas
- [ ] **Idioma** - Soporte ES/EN
- [ ] **PWA** - Progressive Web App para offline
- [ ] **API pública** - Documentación OpenAPI para acceso externo

## 🐛 Conocido
- [ ] Cloudflare challenge puede aparecer en subdominios nuevos
- [ ] Gemini API requiere API key configurada en `.env`

## 📊 Métricas a Monitorear
- Uptime del servicio
- Uso de RAM por instancia
- Tiempo de respuesta de Gemini API
- Número de búsquedas OSINT

## 🔄 Próximos Pasos
1. Agregar filtros al dashboard
2. Crear gráficas con Chart.js o Recharts
3. Implementar búsqueda local
4. Agregar más casos (pipeline de datos)
