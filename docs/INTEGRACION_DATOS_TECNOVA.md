# Integración de datos TECNOVA

## Propósito

IFC y Nexo Cívico son instrumentos distintos de investigación, pero sus resultados convergen en un único corazón de investigación: **Encuesta de Experiencia Organizacional**.

La planilla es el reservorio central de investigación de TECNOVA. Cada respuesta conserva su origen, instrumento, perspectiva, caso y versión. Nexo mantiene además su base operacional propia en Supabase; solo sus variables de investigación pasan al reservorio central.

Drive/Sheets actúa como repositorio de investigación y capa de intercambio. Studio y Atlas consumen posteriormente esos datos.

## Flujo

IFC nativo → /api/investigacion → GOOGLE_APPS_SCRIPT_URL → Encuesta de Experiencia Organizacional

Nexo Cívico → Supabase (operación propia) → /api/tecnova/drive → GOOGLE_APPS_SCRIPT_URL → Encuesta de Experiencia Organizacional

## Eventos Nexo

- NEXO_CIVICO_REPORT_CREATED
- NEXO_CIVICO_SATISFACTION_CLOSED
- NEXO_CIVICO_CREW_CLOSED

## Campos comunes mínimos

- source: IFC | NEXO_CIVICO
- system: TECNOVA
- case_id
- received_at / submitted_at
- role cuando corresponda
- age_range cuando corresponda
- territory cuando exista
- story cuando exista
- friction_1_5 cuando exista
- main_difficulties cuando exista
- metrics cuando corresponda

## Contrato de lectura para Observatorio

El endpoint configurado por GOOGLE_APPS_SCRIPT_URL debe responder a GET ?action=metrics con JSON:

{
  "historias_recopiladas": 0,
  "tiempo_promedio_perdido_min": null,
  "friccion_frecuente": null,
  "sectores_analizados": 0
}

El tiempo promedio permanece null mientras la investigación no recoja una medición de tiempo válida. No se debe inferir ese indicador desde la escala de fricción.

## Configuración

Los dos proyectos deben usar el mismo valor de GOOGLE_APPS_SCRIPT_URL.

No se deben guardar credenciales de Google, tokens ni secretos en el repositorio.
## Puesta en marcha sin costo

1. Crear una Google Sheet central de investigación en Drive.
2. Abrir Extensiones → Apps Script desde esa planilla.
3. Copiar `docs/google-apps-script/TECNOVA_DATA.gs` al proyecto Apps Script.
4. Opcional: definir la propiedad `TECNOVA_TOKEN` en Project Settings → Script Properties.
5. Desplegar como Web App con acceso para quien deba enviar/consultar datos.
6. Configurar en TECNOVA y Nexo las variables `GOOGLE_APPS_SCRIPT_URL` y, si se usa, `GOOGLE_APPS_SCRIPT_TOKEN` con los mismos valores.
7. Probar primero con datos de prueba; luego habilitar la recolección pública.


## Regla del reservorio central

No se crea un reservorio de investigación separado para cada instrumento. Toda respuesta debe poder conservar como mínimo:

- fuente/origen
- tipo de investigación
- ID de respuesta
- ID de caso
- perspectiva
- versión del instrumento
- fecha de respuesta
- variables de experiencia y fricción
- variables Atlas cuando hayan sido medidas o clasificadas
- variables Nexo cuando el caso provenga de Nexo Cívico

Las columnas históricas de la planilla central no se borran ni se reordenan. El Apps Script agrega nuevas columnas al final cuando son necesarias.

El Atlas no debe inferir emociones o severidad como hechos si no fueron declaradas o medidas; esos campos quedan disponibles para clasificación posterior.
