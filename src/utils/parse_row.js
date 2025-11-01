/**
 * Преобразует строковый объект row (как из CSV) в документ для Data.
 * - сохраняет "None" как строку
 * - для числовых полей пытается привести к Number (если возможно)
 */
const NUMERIC_FIELDS = new Set(['X', 'Y', 'Z', 'Time', 'TrackNum']);

export function normalizeValue(key, value) {
  if (value === undefined || value === null || value === '') {
    return key === 'Time' || NUMERIC_FIELDS.has(key) ? 0 : 'None';
  }

  const s = String(value).trim();

  if (s.toLowerCase() === 'none') return 'None';

  if (NUMERIC_FIELDS.has(key)) {
    const n = Number(s);
    return Number.isFinite(n) ? n : 0;
  }

  if (['X', 'Y', 'Z'].includes(key)) {
    const n = Number(s);
    return Number.isFinite(n) ? n : 0;
  }

  return s;
}

/**
 * Конвертирует строковый row в объект для сохранения в Data.
 * row — объект ключ: значение (все строки из csv-parser).
 */
export function mapRowToDataDoc(row, id_source) {
  const out = { id_source };

  const keys = [
    'CVpositive',
    'CVstable',
    'CApositive',
    'CAstable',
    'CTpositive',
    'CTstable',
    'X',
    'Y',
    'Z',
    'Kde',
    'KdeWeighted',
    'Gaussian',
    'GaussianWeighted',
    'EvaluationNum',
    'IMMconsistentValue',
    'probability',
    'TrackConsistent',
    'VelocityConsistent',
    'IMMconsistent',
    'IMMpositive',
    'velocityOK',
    'speed',
    'TrackNum',
    'Time',
  ];

  for (const k of keys) {
    const val = row[k] ?? row[k.toLowerCase()] ?? row[k.toUpperCase()] ?? '';
    out[k] = normalizeValue(k, val);
  }

  return out;
}
