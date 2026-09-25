const SHEET_NAME = 'DATOS_TECNOVA';
const TOKEN_PROPERTY = 'TECNOVA_TOKEN';

function doPost(e) {
  try {
    requireToken_(e);
    const payload = JSON.parse(e.postData.contents || '{}');
    const sheet = getSheet_();
    ensureHeader_(sheet);
    sheet.appendRow(flattenRow_(payload));
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

function ensureHeader_(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow([
    'received_at','source','event','system','case_id','role',
    'place_or_organization','story','friction_1_5','main_difficulties','moment',
    'proposed_change','territory_lat','territory_lng','resolved','quality',
    'attention','trust','crew_technical_compliance','diagnostic','conformity',
    'ticket_id','created_at','submitted_at'
  ]);
}

function flattenRow_(p) {
  const territory = p.territory || {};
  const metrics = p.metrics || {};
  return [
    p.received_at || new Date().toISOString(),
    p.source || '',
    p.event || '',
    p.system || 'TECNOVA',
    p.case_id || '',
    p.role || '',
    p.place_or_organization || '',
    p.story || '',
    p.friction_1_5 ?? '',
    Array.isArray(p.main_difficulties) ? JSON.stringify(p.main_difficulties) : (p.main_difficulties || ''),
    p.greatest_uncertainty_or_difficulty_moment || '',
    p.proposed_change || '',
    territory.lat ?? '',
    territory.lng ?? '',
    metrics.resolved ?? '',
    metrics.quality ?? '',
    metrics.attention ?? '',
    metrics.trust ?? '',
    metrics.crew_technical_compliance ?? '',
    p.worker?.diagnostic || '',
    p.worker?.conformity || '',
    p.ticket_id || '',
    p.created_at || '',
    p.submitted_at || ''
  ];
}

function metrics_() {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return { historias_recopiladas: 0, tiempo_promedio_perdido_min: null, friccion_frecuente: null, sectores_analizados: 0 };
  const headers = values[0];
  const rows = values.slice(1).map(row => Object.fromEntries(headers.map((h, i) => [h, row[i]])));
  const cases = new Set(rows.map(r => r.case_id).filter(Boolean));
  const sectors = new Set(rows.map(r => r.place_or_organization).filter(Boolean));
  const frequency = {};
  rows.forEach(r => {
    if (!r.main_difficulties) return;
    let items = [];
    try { items = JSON.parse(r.main_difficulties); } catch (_) { items = [String(r.main_difficulties)]; }
    items.forEach(item => { frequency[item] = (frequency[item] || 0) + 1; });
  });
  const friction = Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a])[0] || null;
  return { historias_recopiladas: cases.size, tiempo_promedio_perdido_min: null, friccion_frecuente: friction, sectores_analizados: sectors.size };
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}