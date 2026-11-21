export function getAnalytics(responses, visits, days = 7, now = new Date()) {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - days + 1);
  const selected = responses.filter((r) => new Date(r.submittedAt) >= start);
  const selectedVisits = visits.filter((v) => new Date(v.startedAt) >= start);
  const completed = selectedVisits.filter((v) => v.completed).length;
  const timed = selected.filter((r) => Number.isFinite(r.duration));
  const average = timed.length
    ? Math.round(timed.reduce((sum, r) => sum + r.duration, 0) / timed.length)
    : null;
  const bars = Array.from({ length: days }, (_, i) => {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    return {
      label: date.toLocaleDateString('en', { weekday: 'short' }),
      count: selected.filter((r) => new Date(r.submittedAt).toDateString() === date.toDateString())
        .length,
    };
  });
  return {
    responses: selected.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)),
    total: selected.length,
    visits: selectedVisits.length,
    completion: selectedVisits.length
      ? Math.round((completed / selectedVisits.length) * 100)
      : null,
    completed,
    dropped: selectedVisits.length - completed,
    average,
    bars,
  };
}
export function formatAnswer(value, empty = '—', separator = ', ') {
  if (value == null) return empty;
  if (Array.isArray(value)) return value.join(separator);
  if (typeof value === 'object') return value.name || JSON.stringify(value);
  return String(value);
}

export function responseDetails(response, form) {
  const labels = new Map(form.fields.map(({ id, label }) => [id, label]));
  for (const field of response.fieldSnapshot || []) labels.set(field.id, field.label);
  return Object.entries(response.answers).map(([id, value]) => ({
    id,
    label: labels.get(id) || id,
    value: formatAnswer(value),
  }));
}

export function exportCsv(form, responses) {
  const fields = new Map(form.fields.map((field) => [field.id, field.label]));
  responses.forEach((r) => {
    (r.fieldSnapshot || []).forEach((f) => {
      if (!fields.has(f.id)) fields.set(f.id, f.label);
    });
    Object.keys(r.answers).forEach((id) => {
      if (!fields.has(id)) fields.set(id, id);
    });
  });
  const safe = (value) => {
    const text = formatAnswer(value, '', '; ');
    return `"${(/^[=+@\-\t\r]/.test(text) ? "'" + text : text).replaceAll('"', '""')}"`;
  };
  const rows = [
    ['Submitted', 'Source', ...fields.values()],
    ...responses.map((r) => [
      r.submittedAt,
      r.fixture ? 'Example response' : 'Submitted response',
      ...[...fields.keys()].map((key) => r.answers[key]),
    ]),
  ];
  const blob = new Blob(['\uFEFF' + rows.map((row) => row.map(safe).join(',')).join('\r\n')], {
    type: 'text/csv;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${form.title.replace(/[^a-z\d -]/gi, '') || 'form'}-responses.csv`;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
