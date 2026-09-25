# Integración de datos TECNOVA

## Propósito

IFC y Nexo Cívico son instrumentos distintos de investigación, pero sus resultados deben poder llegar a una fuente central para análisis común.

Drive/Sheets actúa como repositorio de investigación y capa de intercambio. Studio y Atlas consumen posteriormente esos datos.

## Flujo

IFC nativo → /api/investigacion → GOOGLE_APPS_SCRIPT_URL → Drive / Sheets

Nexo Cívico → Supabase (operación propia) → /api/tecnova/drive → GOOGLE_APPS_SCRIPT_URL → Drive / Sheets

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