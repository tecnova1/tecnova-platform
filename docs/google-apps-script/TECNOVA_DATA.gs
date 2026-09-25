const SHEET_NAME = 'Encuesta de Experiencia Organizacional';
const TOKEN_PROPERTY = 'TECNOVA_TOKEN';

/**
 * Reservorio central de investigación TECNOVA.
 *
 * Regla: no se reemplazan ni reordenan columnas históricas.
 * Si la planilla ya existe, se agregan solamente las columnas que falten.
 * El origen de cada respuesta queda registrado explícitamente.
 */
const CENTRAL_HEADERS = [
  'ID_Respuesta',
  'ID_Caso',
  'Fuente',
  'Origen',
  'Tipo_Investigacion',
  'Sistema',
  'Perspectiva',
  'Version_Encuesta',
  'Fecha_Respuesta',
  'Consentimiento',
  'Anonimo',
  'Organizacion_Territorio',
  'Comuna',
  'Region',
  'Servicio_Proceso',
  'Canal',
  'Fecha_Inicio_Caso',
  'Fecha_Cierre_Caso',
  'Tiempo_Resolucion_Real',
  'Tiempo_Resolucion_Declarado',
  'Experiencia_Vivida',
  'Friccion_1_5',
  'Principales_Dificultades',
  'Momento_Mayor_Dificultad',
  'Cambio_Propuesto',
  'Dimension_Atlas',
  'Subdimension_Atlas',
  'Actor_Atlas',
  'Severidad_Atlas',
  'Emocion_Friccion',
  'Emocion_Resolucion',
  'Tipo_Friccion',
  'Observacion_Atlas',

  // Nexo Cívico: variables de investigación derivadas de la operación.
  'Nexo_Ticket_ID',
  'Nexo_Tipo_Reporte',
  'Nexo_Estado_Final',
  'Nexo_Tiempo_Resolucion',
  'Nexo_Tiempo_Declarado',
  'Nexo_Ciudadano_Resuelto',
  'Nexo_Ciudadano_Calidad',
  'Nexo_Ciudadano_Atencion',
  'Nexo_Ciudadano_Confianza',
  'Nexo_Ciudadano_Promedio',
  'Nexo_Cuadrilla_Normativa',
  'Nexo_Cuadrilla_Diagnostico',
  'Nexo_Cuadrilla_Conformidad',
  'Nexo_Evidencia'
];

function doPost(e) {
  try {
    requireToken_(e);
    const payload = JSON.parse(e.postData.contents || '{}');
    const sheet = getSheet_();
    ensureHeader_(sheet);
    appendResearchRow_(sheet, payload);
    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error.message || error) });
  }
}

function doGet(e) {
  try {
    requireToken_(e);
    if ((e.parameter.action || '') === 'metrics') return json_(metrics_());
    return json_({ ok: true, service: 'TECNOVA_DATA' });
  } catch (error) {
    return json_({ ok: false, error: String(error.message || error) });
  }
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error('Vincula este proyecto de Apps Script a la planilla central TECNOVA.');
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function requireToken_(e) {
  const expected = PropertiesService.getScriptProperties().getProperty(TOKEN_PROPERTY);
  if (!expected) return;
  if ((e.parameter.token || '') !== expected) throw new Error('Unauthorized');
}

/**
 * Agrega las columnas nuevas al final de la estructura existente.
 * Nunca borra, renombra ni reordena columnas históricas.
 */
function ensureHeader_(sheet) {
  const lastColumn = sheet.getLastColumn();
  const existing = lastColumn > 0
    ? sheet.getRange(1, 1, 1, lastColumn).getValues()[0].map(String)
    : [];

  if (existing.length === 0) {
    sheet.getRange(1, 1, 1, CENTRAL_HEADERS.length).setValues([CENTRAL_HEADERS]);
    return;
  }

  const missing = CENTRAL_HEADERS.filter(header => !existing.includes(header));
  if (missing.length > 0) {
    sheet.getRange(1, existing.length + 1, 1, missing.length).setValues([missing]);
  }
}

function appendResearchRow_(sheet, p) {
  const lastColumn = sheet.getLastColumn();
  const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0].map(String);
  const values = Object.fromEntries(headers.map(header => [header, '']));

  const metrics = p.metrics || {};
  const territory = p.territory || {};
  const worker = p.worker || {};

  const caseId = p.case_id || '';
  const receivedAt = p.received_at || new Date().toISOString();

  const data = {
    'ID_Respuesta': p.response_id || caseId,
    'ID_Caso': caseId,
    'Fuente': p.source || '',
    'Origen': p.origin || p.source || '',
    'Tipo_Investigacion': p.research_type || 'Experiencia Organizacional',
    'Sistema': p.system || 'TECNOVA',
    'Perspectiva': p.perspective || p.role || '',
    'Version_Encuesta': p.survey_version || '',
    'Fecha_Respuesta': p.submitted_at || receivedAt,
    'Consentimiento': p.consent ?? '',
    'Anonimo': p.anonymous ?? '',
    'Organizacion_Territorio': p.place_or_organization || '',
    'Comuna': p.comuna || '',
    'Region': p.region || '',
    'Servicio_Proceso': p.service_process || '',
    'Canal': p.channel || '',
    'Fecha_Inicio_Caso': p.case_started_at || '',
    'Fecha_Cierre_Caso': p.case_closed_at || '',
    'Tiempo_Resolucion_Real': p.real_resolution_time || '',
    'Tiempo_Resolucion_Declarado': p.declared_resolution_time || '',
    'Experiencia_Vivida': p.story || '',
    'Friccion_1_5': p.friction_1_5 ?? '',
    'Principales_Dificultades': serialize_(p.main_difficulties),
    'Momento_Mayor_Dificultad': p.greatest_uncertainty_or_difficulty_moment || '',
    'Cambio_Propuesto': p.proposed_change || '',
    'Dimension_Atlas': p.atlas?.dimension || '',
    'Subdimension_Atlas': p.atlas?.subdimension || '',
    'Actor_Atlas': p.atlas?.actor || p.role || '',
    'Severidad_Atlas': p.atlas?.severity || '',
    'Emocion_Friccion': p.atlas?.friction_emotion || '',
    'Emocion_Resolucion': p.atlas?.resolution_emotion || '',
    'Tipo_Friccion': p.atlas?.friction_type || '',
    'Observacion_Atlas': p.atlas?.observation || '',

    'Nexo_Ticket_ID': p.ticket_id || '',
    'Nexo_Tipo_Reporte': p.nexo?.report_type || '',
    'Nexo_Estado_Final': p.nexo?.final_status || '',
    'Nexo_Tiempo_Resolucion': p.nexo?.real_resolution_time || '',
    'Nexo_Tiempo_Declarado': p.nexo?.declared_resolution_time || '',
    'Nexo_Ciudadano_Resuelto': metrics.resolved ?? p.nexo?.resolved ?? '',
    'Nexo_Ciudadano_Calidad': metrics.quality ?? p.nexo?.quality ?? '',
    'Nexo_Ciudadano_Atencion': metrics.attention ?? p.nexo?.attention ?? '',
    'Nexo_Ciudadano_Confianza': metrics.trust ?? p.nexo?.trust ?? '',
    'Nexo_Ciudadano_Promedio': metrics.average ?? p.nexo?.average ?? '',
    'Nexo_Cuadrilla_Normativa': worker.normativa ?? p.nexo?.crew?.normativa ?? '',
    'Nexo_Cuadrilla_Diagnostico': worker.diagnostic ?? p.nexo?.crew?.diagnostic ?? '',
    'Nexo_Cuadrilla_Conformidad': worker.conformity ?? p.nexo?.crew?.conformity ?? '',
    'Nexo_Evidencia': p.nexo?.evidence_url || p.foto_final_url || ''
  };

  Object.keys(data).forEach(key => {
    if (Object.prototype.hasOwnProperty.call(values, key)) values[key] = data[key];
  });

  sheet.appendRow(headers.map(header => values[header]));
}

function serialize_(value) {
  if (Array.isArray(value)) return JSON.stringify(value);
  return value ?? '';
}

function metrics_() {
  const sheet = getSheet_();
  ensureHeader_(sheet);
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) {
    return {
      historias_recopiladas: 0,
      tiempo_promedio_perdido_min: null,
      friccion_frecuente: null,
      sectores_analizados: 0
    };
  }

  const headers = values[0].map(String);
  const rows = values.slice(1).map(row =>
    Object.fromEntries(headers.map((header, index) => [header, row[index]]))
  );

  const cases = new Set(
    rows.map(row => row.ID_Caso || row.case_id).filter(Boolean)
  );
  const sectors = new Set(
    rows.map(row => row.Organizacion_Territorio || row.place_or_organization).filter(Boolean)
  );

  const frequency = {};
  rows.forEach(row => {
    const raw = row.Principales_Dificultades || row.main_difficulties;
    if (!raw) return;

    let items = [];
    try {
      items = JSON.parse(raw);
      if (!Array.isArray(items)) items = [String(raw)];
    } catch (_) {
      items = [String(raw)];
    }

    items.forEach(item => {
      frequency[item] = (frequency[item] || 0) + 1;
    });
  });

  const friction =
    Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a])[0] || null;

  return {
    historias_recopiladas: cases.size,
    // No se infiere tiempo perdido desde la escala de fricción.
    tiempo_promedio_perdido_min: null,
    friccion_frecuente: friction,
    sectores_analizados: sectors.size
  };
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
